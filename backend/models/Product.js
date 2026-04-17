const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required:true
    },
    price :{
        type : Number,
        required:true,
    },
    image : {
        type : String,
    },
    numberOfPurchases : {
        type : Number,
        default : 0
    },
    numberOfCarts : {
        type : Number,
        default : 0
    },
    vendor: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}
    
},{timestamps:true})

module.exports = mongoose.model("Product", productSchema);