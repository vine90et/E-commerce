const Product = require("../model/productModel");
const cloudinary = require("../config/cloudinary.js")

const createProduct = async(req, res)=>{
    try {
        const {name, description, price, category, stock, rating, numReviews} = req.body;

        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({message: "All credentials are required"});
        }

        let imageUrl = '';
        if (!req.file) {
            return res.status(400).json({
                message: "Product image is required"
            });
        }
        
        const result = await cloudinary.uploader.upload(req.file.path)
        imageUrl = result.secure_url

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl: imageUrl
        })

        const saveProduct = await product.save();
        return res.status(201).json(saveProduct)
    } catch (error) {
        console.log("error in createProduct controller", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const getProduct = async(req, res)=>{
    try {
        const product = await Product.find({});
        res.status(200).json({Product: product});   
    } catch (error) {
        console.log("❌ error in get Product controller", error)
        res.status(500).json({message:"Internal server error"});   
    }
}

const getProductbyId = async(req, res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if(!product) return res.status(404).json({message: "Product not found"})
        
        return res.status(200).json({product: product});
    } catch (error) {
        console.log("error in getProductbyId controller", error)
        res.status(500).json({message:"Internal server error"});
    }
}

const updateProduct = async(req, res)=>{
    try {
        const id = req.params.id
        const {name, description, price, category, stock, rating, numReviews} = req.body;

        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        let updatedImageUrl = product.imageUrl;
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path)
            updatedImageUrl = result.secure_url;
        }

        const updateProduct = await Product.findByIdAndUpdate(id,{
                name: name ?? product.name,
                description: description ?? product.description,
                price: price ?? product.price,
                category: category ?? product.category,
                stock: stock ?? product.stock,
                rating: rating ?? product.rating,
                numReviews: numReviews ?? product.numReviews,
                imageUrl: updatedImageUrl
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        
        return res.status(200).json({updateProduct});
    } catch (error) {
        console.log('error in updateProduct', error);
        return res.status(500).json({
            message: "Error updating product",
            error: error.message
        });
    }
}

const deleteProduct = async(req, res)=>{
    try {
        const id = req.params.id;
        const deleteProduct = await Product.findByIdAndDelete(id);
        if(!deleteProduct) return res.status(404).json({message: "connot delete product"})
        
        return res.status(200).json({
            message: "Product deleted successfully",
            product: deleteProduct
        });
    } catch (error) {
        console.log("error in delete product route");
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {createProduct, getProduct, getProductbyId, updateProduct, deleteProduct};