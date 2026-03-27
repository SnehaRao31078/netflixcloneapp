const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const userModel = require("./models/user");
const productModel = require("./models/products");
const heroModel = require("./models/banners");
const planModel = require("./models/plans");

const app = express();
app.use(express.json());
app.use(cors());


app.use("/Images", express.static("public/Images"));


const uploadPath = "./public/Images";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));



app.post("/signup", async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.json({ status: "SUCCESS", user });
  } catch (err) {
    res.status(500).json({ status: "ERROR", error: err.message });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email, password });
  if (!user) return res.json({ status: "User not found" });

  const userPlan = await planModel.findOne({ email });

  res.json({
    status: "SUCCESS",
    user: {
      email: user.email,
      plan: userPlan ? userPlan.plan : null,
    },
  });
});



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
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
      const movieObject = {
        title: req.body.title,
        description: req.body.description,
        language: req.body.language,
        category: req.body.category,
        file: req.files.file ? req.files.file[0].filename : null,
        video: req.files.video ? req.files.video[0].filename : null,
        plan: req.body.plan,
      };

      const data = await productModel.create(movieObject);
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);


app.get("/products", async (req, res) => {
  const data = await productModel.find();
  res.json(data);
});


app.get("/products/:id", async (req, res) => {
  const data = await productModel.findById(req.params.id);
  res.json(data);
});


app.put(
  "/products/:id",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let updateData = { ...req.body };

      if (req.files.file) {
        updateData.file = req.files.file[0].filename;
      }

      if (req.files.video) {
        updateData.video = req.files.video[0].filename;
      }

      await productModel.findByIdAndUpdate(req.params.id, updateData);
      res.json("Updated Successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);



app.delete("/products/:id", async (req, res) => {
  try {
    const movie = await productModel.findById(req.params.id);

    
    if (movie.file) {
      const filePath = uploadPath + "/" + movie.file;
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    
    if (movie.video) {
      const videoPath = uploadPath + "/" + movie.video;
      if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    }

    await productModel.findByIdAndDelete(req.params.id);

    res.json("Deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});



app.post("/banners", async (req, res) => {
  const hero = await heroModel.create(req.body);
  res.json(hero);
});

app.get("/banners", async (req, res) => {
  const heroes = await heroModel.find();
  res.json(heroes);
});



app.post("/plans", async (req, res) => {
  try {
    const data = await planModel.create(req.body);
    res.json({ success: true, data });
  } catch {
    res.json({ success: false });
  }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});