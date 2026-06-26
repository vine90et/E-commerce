const mongoose = require("mongoose");

const productmodel = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
    },
    description:{
        type: String,
        required: true,
        maxlength: 500
    },
    price:{
        type: Number,
        min: 0,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
        min: 0
    },
    imageUrl:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    numReviews:{
        type: Number,
        default: 0,
    },
},{timestamps: true})

const Product = mongoose.model("Product", productmodel)

module.exports = Product;