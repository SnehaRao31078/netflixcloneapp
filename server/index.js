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
const heroModel = require("./models/banners");
const planModel = require("./models/plans");

const app = express();
app.use(express.json());
app.use(cors());


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


//let otpStore = {};

app.post("/signin", async (req, res) => {
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


/*app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!otpStore[email]) return res.json({ status: "Invalid OTP" });

  const stored = otpStore[email];
  

  if (stored.otp.toString() === otp.toString()) {
    delete otpStore[email];
    return res.json({ status: "Success" });
  } else {
    return res.json({ status: "Invalid OTP" });
  }
});*/

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

/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});
const upload = multer({ storage });*/



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

/*app.delete("/products/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (product.file) {
      const filePath = path.join(imagesDir, product.file);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    if (product.video) {
      const videoPath = path.join(imagesDir, product.video);
      if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    }

    await productModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});*/

app.delete("/products/:id", async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/banners", async (req, res) => {
  try {
    const hero = await heroModel.create(req.body);
    res.json(hero);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/banners", async (req, res) => {
  try {
    const heroes = await heroModel.find();
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch banners" });
  }
});

app.get("/banners/:id", async (req, res) => {
  try {
    const hero = await heroModel.findById(req.params.id);
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch banner" });
  }
});

app.put("/banners/:id", async (req, res) => {
  try {
    await heroModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Updated Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/banners/:id", async (req, res) => {
  try {
    await heroModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json(err);
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
