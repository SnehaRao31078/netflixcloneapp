const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
/*const { Resend } = require("resend");*/

const userModel = require("./models/user");
const productModel = require("./models/products");
const heroModel = require("./models/banners");
const planModel = require("./models/plans");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/Images", express.static(path.join(__dirname, "public/Images")));


const imagesDir = path.join(__dirname, "public", "Images");
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

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
      plan: userPlan ? userPlan.plan : null
    }
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});
const upload = multer({ storage });


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
        file: req.files.file[0].filename,
        video: req.files.video ? req.files.video[0].filename : null,
      };

      const created = await productModel.create(newProduct);
      res.json(created);
    } catch (err) {
      console.error("Error creating product:", err);
      res.status(500).json({ error: err.message });
    }
  }
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

      if (req.files.file) updateData.file = req.files.file[0].filename;
      if (req.files.video) updateData.video = req.files.video[0].filename;

      await productModel.findByIdAndUpdate(req.params.id, updateData);
      res.json({ message: "Updated Successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);


app.delete("/products/:id", async (req, res) => {
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

app.delete("/plans/:id", async (req, res) => {
  try {
    await planModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
