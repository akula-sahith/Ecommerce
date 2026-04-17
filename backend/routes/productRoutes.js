const express = require("express")
const router = express.Router()
const Product = require("../models/Product")
const User = require("../models/User")
const upload = require("../middleware/imageMiddleware")
const authMiddleware = require("../middleware/authMiddleware")
router.post("/add",authMiddleware, upload, async (req, res) => {
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

        console.log("👉 user.vendor:", user.isVendor);

        if (!user.isVendor) {
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

router.get("/all", async (req, res) => {
    return res.status(200).json({ message: "Products fetched successfully", products: await Product.find() })
})

router.get("/vendorStats", authMiddleware,async (req,res)=>{
    try{

        const userId = req.userId;

        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({"message" : "User not Found!"})
        }

        if(!user.isVendor){
            return res.status(401).json({"message" : "User is not a vendor"})
        }

        const products = await Product.find({ vendor: user._id });

        return res.status(200).json({"message" : "Stats Fetched Successfully","products" : products})

    }catch(err){
        return res.status(500).json({"message" : "Internal Server Error"})
    }
})

router.post("/addToCart",authMiddleware,async (req,res)=>{
    try{
        const userId = req.userId;
        const productId = req.body.productId
        await User.findByIdAndUpdate(userId,{$push:{cart:productId}})
        return res.status(200).json({"message" : "Product added successfully to the cart"})
    }catch(err){
        return res.status(500).json({"message" : "Internal Server Error"})
    }
})

router.get("/cartItems",authMiddleware,async (req,res)=>{
    try{
       const userId = req.userId
       const cartItems = await User.findById(userId).populate("cart")
       console.log(cartItems.cart)
       return res.status(200).json({"message" : "Cart items fetched successfully","cartItems" : cartItems.cart})
    }catch(err){
        return res.status(500).json({"message" : "Internal Server Error"})
    }
})
module.exports = router