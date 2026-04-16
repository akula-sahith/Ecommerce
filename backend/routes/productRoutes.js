const express = require("express")
const router = express.Router()
const Product = require("../models/Product")
const User = require("../models/User")
const upload = require("../middleware/imageMiddleware")
router.post("/add", upload, async (req, res) => {
    try {
        console.log("🔵 --- REQUEST START ---");

        // 🔐 AUTH DEBUG
        console.log("👉 req.userId:", req.userId);
        console.log("👉 headers.authorization:", req.headers.authorization);

        // 📦 BODY DEBUG
        console.log("👉 req.body:", req.body);
        console.log("👉 name:", req.body.name);
        console.log("👉 desc:", req.body.desc);
        console.log("👉 price:", req.body.price);

        // 🖼️ FILE DEBUG (VERY IMPORTANT)
        console.log("👉 req.file:", req.file);

        if (!req.userId) {
            console.log("❌ userId missing");
            return res.status(401).json({ message: "No userId found (auth failed)" });
        }

        const user = await User.findById(req.userId);

        console.log("👉 User from DB:", user);

        if (!user) {
            console.log("❌ User not found in DB");
            return res.status(401).json({ message: "User not found" });
        }

        console.log("👉 user.vendor:", user.vendor);

        if (!user.vendor) {
            console.log("❌ Not a vendor");
            return res.status(403).json({ message: "Only vendors can add products" });
        }

        if (!req.file) {
            console.log("❌ File missing (multer issue)");
            return res.status(400).json({ message: "Image is required" });
        }

        const { name, desc, price } = req.body;

        console.log("👉 Creating product...");

        const product = await Product.create({
            name,
            desc,
            price,
            image: req.file.path,
            vendor: req.userId
        });

        console.log("✅ Product created:", product);

        console.log("🟢 --- REQUEST SUCCESS ---");

        return res.status(201).json({
            message: "Product added successfully",
            product
        });

    } catch (err) {
        console.log("🔥 --- ERROR OCCURRED ---");
        console.log("👉 Error name:", err.name);
        console.log("👉 Error message:", err.message);
        console.log("👉 Full error:", err);
        console.log("🔴 --- REQUEST FAILED ---");

        return res.status(500).json({ message: err.message });
    }
});
module.exports = router