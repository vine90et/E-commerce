const Order = require('../model/orderModel.js');
const User = require('../model/user.model.js')
const sendMail = require('../utils/send.email.js');

const createOrder = async(req, res)=>{
    try {
        const {items, totalAmount, address, paymentId} = req.body;
        
        if(!items || items.length === 0) return res.status(400).json({messsage: 'Invalid order data'});
        

        const order = new Order({
            user: req.user._id,
            items: items,
            totalAmount: totalAmount,
            address: address,
            paymentId: paymentId
        })
        await order.save();

        const message = `Hello ${req.user.name},

            Your order has been placed successfully.

            Order ID: ${order._id}
            Total Amount: ₹${totalAmount}

            Shipping Address:
            ${address}

            Thank you for shopping with us!

            Best Regards,
            Your Store Team
        `;
        await sendMail(req.user.email, 'Order Created, Your Order has been created Successfylly', message )

        return res.status(201).json({message: 'Order Created Successfully', order})
    } catch (error) {
        console.log('error in create Order', error);
        return res.status(500).json({message: 'interal server Error'})
    }
}

const getOrders = async(req, res)=>{
    try {
        const orders = await Order.find({}).populate('user', 'name _id');
        return res.json(orders)
    } catch (error) {
        return res.status(500).json({message: 'Internal Server error', error});
    }
}

const getOrderbyid = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        }).populate('items.productId', 'name price');
        console.log("Logged in user:", req.user._id);
        console.log("Orders:", orders);

        if (orders.length === 0) {
            return res.status(404).json({
                message: 'No orders found'
            });
        }

        return res.status(200).json(orders);

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
};

const updateOrderStatus = async(req, res)=>{
    try {
        console.log(req.body)
        const {status} = req.body;
        const {id} = req.params;

        const UpdatedOrder = await Order.findByIdAndUpdate(id,
            {status: status},
            {new: true }
        );

        if(!UpdatedOrder) return res.status(404).json({message: 'Order not found'});
        return res.status(201).json({message: 'Order Updated Successfully', UpdatedOrder})

    } catch (error) {
        console.error("error in update order route:", error);
        return res.status(500).json({messgae: 'Internal server error', stack: error.stack})
    }
}

module.exports = {createOrder, getOrders, getOrderbyid, updateOrderStatus};
