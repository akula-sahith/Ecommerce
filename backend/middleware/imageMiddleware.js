const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

console.log("🚀 Cloudinary middleware initialized");

// 🌩️ Cloudinary Storage Config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    console.log("📁 Incoming file:", file);

    return {
      folder: "products",
      resource_type: "image",
      format: file.mimetype.split("/")[1], // auto detect format
      public_id: Date.now() + "-" + file.originalname,
    };
  },
});

// 🧠 Multer Config with Debug
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log("🔍 File filter check:", file.mimetype);

    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      console.log("✅ File accepted");
      cb(null, true);
    } else {
      console.log("❌ File rejected");
      cb(new Error("Only JPG, PNG allowed"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// 🎯 Wrapper to catch multer errors
module.exports = (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    console.log("📦 --- MULTER START ---");

    if (err) {
      console.log("🔥 MULTER ERROR:", err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log("✅ Multer Success");
    console.log("👉 req.file after upload:", req.file);

    console.log("📦 --- MULTER END ---");

    next();
  });
};