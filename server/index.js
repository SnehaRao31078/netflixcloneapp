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
app.use("/Images", express.static("public/Images"));

/*const resend = new Resend(process.env.RESEND_API_KEY);*/

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




/*const upload = multer({ storage: storage });

app.post("/products", upload.single("image"), (req, res) => {
  const movieObject = {
    title: req.body.title,
    description: req.body.description,
    language: req.body.language,
    category: req.body.category,
    file: req.file.filename,
    videoLink: req.body.videoLink,
    plan: req.body.plan
  };
  productModel.create(movieObject)
    .then((movie) => res.json(movie))
    .catch((err) => res.json(err));
});

app.get("/products", (req, res) => {
  productModel.find()
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

app.get("/products/:id", (req, res) => {
  productModel.findById(req.params.id)
    .then((movie) => res.json(movie))
    .catch((err) => res.json(err));
});

app.put("/products/:id", upload.single("image"), (req, res) => {
  let updateData = {
    title: req.body.title,
    description: req.body.description,
    language: req.body.language,
    category: req.body.category,
    videoLink: req.body.videoLink,
    plan: req.body.plan
  };
  if (req.file) updateData.file = req.file.filename;
  productModel.findByIdAndUpdate(req.params.id, updateData)
    .then(() => res.json("Updated Successfully"))
    .catch((err) => res.json(err));
});

app.delete("/products/:id", async (req, res) => {
  try {
    const movie = await productModel.findById(req.params.id);
    if (movie.file) fs.unlinkSync("./public/Images/" + movie.file);
    await productModel.findByIdAndDelete(req.params.id);
    res.json("Deleted Successfully");
  } catch (err) {
    res.json(err);
  }
});*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Images");
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
  (req, res) => {
    const movieObject = {
      title: req.body.title,
      description: req.body.description,
      language: req.body.language,
      category: req.body.category,

      file: req.files.file && req.files.file[0].filename,
      video: req.files.video && req.files.video[0].filename,

      plan: req.body.plan,
    };

    productModel
      .create(movieObject)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
);
app.get("/products", (req, res) => {
  productModel
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.get("/products/:id", (req, res) => {
  productModel
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.put(
  "/products/:id",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  (req, res) => {
    let updateData = { ...req.body };

    if (req.files.file) {
      updateData.file = req.files.file[0].filename;
    }

    if (req.files.video) {
      updateData.video = req.files.video[0].filename;
    }

    productModel
      .findByIdAndUpdate(req.params.id, updateData)
      .then(() => res.json("Updated Successfully"))
      .catch((err) => res.json(err));
  },
);

app.delete("/products/:id", async (req, res) => {
  try {
    const movie = await productModel.findById(req.params.id);

    if (movie.file) {
      const filePath = "./public/Images/" + movie.file;

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await productModel.findByIdAndDelete(req.params.id);

    res.json("Deleted Successfully");
  } catch (err) {
    res.json(err);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});