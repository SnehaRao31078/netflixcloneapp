require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
/*const path = require("path");
const fs = require("fs");*/
const { v2: cloudinary } = require("cloudinary");

const userModel = require("./models/user");
const productModel = require("./models/products");

const planModel = require("./models/plans");
const sgMail = require('@sendgrid/mail');
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//let otpStore = {};

sgMail.setApiKey(process.env.SENDGRID_KEY);

/*const message={
  to: email,
  from: 'sneha8484rao@gmail.com',
  subject: 'Your OTP for Netflix Subscription',
  text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  html:`<p>Your OTP is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
}
sgMail.send(message)
.then(() => console.log("OTP sent successfully"))
.catch((error) => console.error("Error sending OTP:", error));*/

/*app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email, password });

  if (!user) {
    return res.json({ status: "User not found" });
  }

  const userPlan = await planModel.findOne({ email });

  res.json({
    status: "SUCCESS",
    user: {
      email: user.email,
      plan: userPlan ? userPlan.plan : null,
    },
  });
});
*/
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email, password });

  if (!user) {
    return res.json({ status: "User not found" });
  }

 const otp = Math.floor(100000 + Math.random() * 900000);

  // ✅ email message
  const message = {
    to: 'sneharao31078@gmail.com',
    from: 'sneha8484rao@gmail.com',
    subject: 'Your OTP',
    text: `Your OTP ${otp}`,
    html: `<strong>Your OTP is ${otp}</strong>`,
  };

  try {
  await sgMail.send(message);
  console.log("Email sent ✅");

  return res.json({
    status: "SUCCESS",
    message: "OTP sent",
  });

} catch (err) {
  console.log("SENDGRID ERROR 👉", err.response?.body || err);

  return res.json({
    status: "ERROR",
    message: "Email failed",
  });
}
});
/*Razorpay*/

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
      await planModel.create({
        email,
        plan,
        price,
        country,
        paymentId: razorpay_payment_id,
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

app.get("/products", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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


app.delete("/products/:id", async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.post("/plans", async (req, res) => {
  try {
    const data = await planModel.create(req.body);
    res.json({ success: true, message: "Payment successful", data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error" });
  }
});

app.get("/plans", async (req, res) => {
  try {
    const data = await planModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching plans" });
  }
});

app.get("/plans/:id", async (req, res) => {
  try {
    const data = await planModel.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
