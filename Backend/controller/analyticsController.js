const User = require("../model/user.model.js");
const Product = require("../model/productModel.js");
const Order = require("../model/orderModel.js");

const getAdminStats = async(req, res)=>{
    try {
        const totalUser = await User.countDocuments({role: "user"});
        const totalProduct = await Product.countDocuments({});
        const totalOrder = await Order.countDocuments({});

        const orders = await Order.find({});
        const totalRevenueData = orders.reduce((acc, order)=> acc + order.totalAmount, 0);

        return res.json({
            totalUser,
            totalProduct,
            totalOrder,
            totalRevenue: totalRevenueData
        })
    } catch (error) {
        console.log("error in getAdminStats", error)
        return res.status(500).json({messsage: "Internal server error"})
    }
}

module.exports = {getAdminStats};