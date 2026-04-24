require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const pdf = require("html-pdf");
const invoiceTemplate = require("./invoiceTemplate");

const { v2: cloudinary } = require("cloudinary");

const userModel = require("./models/user");
const productModel = require("./models/products");

const planModel = require("./models/plans");

const app = express();
app.use(express.json());
app.use(cors());

//Mongodb connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  //Otp genaeation and email sending to the netlix user using sendgrid

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const otpStore = {};

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password });

    if (!user) {
      return res.json({ status: "User not found" });
    }
    const userPlan = await planModel.findOne({ email });

    if (userPlan && userPlan.plan) {
      return res.json({
        status: "SUCCESS",
        user: {
          email: user.email,
          plan: userPlan.plan,
        },
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    const msg = {
      to: email,
      from: "sneha8484rao@gmail.com",
      subject: "Your Netflix Clone OTP",
      html: `<h2>Your OTP is: ${otp}</h2>
      `,
    };

    sgMail.send(msg);
    res.json({ status: "OTP_SENT", email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Server Error" });
  }
});

//Verifying the Otp sent to user
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const storedData = otpStore[email];

  if (!storedData) {
    return res.json({ status: "OTP expired or not requested" });
  }

  if (Date.now() > storedData.expiresAt) {
    delete otpStore[email];
    return res.json({ status: "OTP expired" });
  }

  if (storedData.otp === otp.toString()) {
    delete otpStore[email];

    const userPlan = await planModel.findOne({ email });

    return res.json({
      status: "SUCCESS",
      user: {
        email: email,
        plan: userPlan ? userPlan.plan : null,
      },
    });
  } else {
    return res.json({ status: "Invalid OTP" });
  }
});

//Payment Integration using Razorpay
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.post("/payment/process", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await instance.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

//Generating PDF receipt and sending it to user email after successful payment
const path = require("path");

const fs = require("fs");


const sendReceipt = async (data) => {
  try {
    const filePath = path.join(__dirname, `receipt-${data.paymentId}.pdf`);

    pdf.create(invoiceTemplate(data)).toFile(filePath, async (err) => {
      if (err) {
        console.log("PDF Error:", err);
        return;
      }

      console.log(" PDF Created");

      try {
        const msg = {
          to: data.email,
          from: "sneha8484rao@gmail.com",
          subject: "Your Payment Receipt",
          text: "Receipt attached",
          attachments: [
            {
              content: fs.readFileSync(filePath).toString("base64"),
              filename: `receipt-${data.paymentId}.pdf`,
              type: "application/pdf",
              disposition: "attachment",
            },
          ],
        };

        await sgMail.send(msg);
        console.log("Email sent");

      } catch (error) {
        console.log(" Email Error:", error.response?.body || error);
      }
    });

  } catch (err) {
    console.log(" Main Error:", err);
  }
};
//Payment verification and storing the plan details in database after successful payment

app.post("/payment/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      plan,
      price,
      country,

    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

  
      if (expectedSignature === razorpay_signature) {

  const GST_RATE = 0.18;

  const total = price;
  const basePrice = price / (1 + GST_RATE);
  const gstAmount = total - basePrice;

  await planModel.create({
    email,
    plan,
    price: total,
    basePrice,
    gstAmount,
    country,
    paymentId: razorpay_payment_id,
  });
      
      
     await sendReceipt({
  email,
  plan,
  price: total,
  basePrice,
  gstAmount,
  country,
  paymentId: razorpay_payment_id
});
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

//Using cloudinary to store the images  and video for netflix
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinarystorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "netflix-clone",
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "mp4"],
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage: cloudinarystorage });


//Signup  for netflix clone
app.post("/signup", async (req, res) => {
  try {
    const user = await userModel.create(req.body);

    res.json({
      status: "SUCCESS",
      message: "Signup successful",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      message: "Signup failed",
      error: err.message,
    });
  }
});

//Add movies
app.post(
  "/products",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("REQ.BODY:", req.body);
      console.log("REQ.FILES:", req.files);

      if (!req.files || !req.files.file) {
        return res.status(400).json({ error: "Image is required" });
      }

      const newProduct = {
        title: req.body.title,
        description: req.body.description,
        language: req.body.language,
        category: req.body.category,
        plan: req.body.plan,
        file: req.files.file[0].path,
        video: req.files.video ? req.files.video[0].path : null,
      };

      const created = await productModel.create(newProduct);
      res.json(created);
    } catch (err) {
      console.error("Error creating product:", err);
      res.status(500).json({ error: err.message });
    }
  },
);

//GetMovies
app.get("/products", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get Movies By its id
app.get("/products/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Update Movies
app.put(
  "/products/:id",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const updateData = { ...req.body };

      if (req.files && req.files.file) {
        updateData.file = req.files.file[0].path;
      }
      if (req.files && req.files.video) {
        updateData.video = req.files.video[0].path;
      }

      await productModel.findByIdAndUpdate(req.params.id, updateData);
      res.json({ message: "Updated Successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

//Delete Movies
app.delete("/products/:id", async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Get plans 
app.get("/plans", async (req, res) => {
  try {
    const data = await planModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching plans" });
  }
});


//Update user information
app.put("/update-user", async (req, res) => {
  try {
    const { email, newEmail, newPassword } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ status: "User not found" });
    }

  
    if (newEmail && newEmail !== "") {
      user.email = newEmail;
    }

   
    if (newPassword && newPassword !== "") {
      user.password = newPassword; 
    }

    await user.save();

    res.json({
      status: "Success",
      message: "User updated successfully",
      user,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Error" });
  }
});

//Get user details and plan details using email
app.get("/plans/:email", async (req, res) => {
  try {
    const email = req.params.email;

    
    const user = await userModel.findOne({ email });

    
    const plan = await planModel.findOne({ email }).sort({ _id: -1 });

    res.json({
      user,
      plan,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error" });
  }
});


app.get("/dashboard-counts", async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalSubscriptions = await planModel.countDocuments(); 
    const totalMovies = await productModel.countDocuments();

    res.json({
      totalUsers,
      totalSubscriptions,
      totalMovies,
    });

  } catch (err) {
    console.log(err); 
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
