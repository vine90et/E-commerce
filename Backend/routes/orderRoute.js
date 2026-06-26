const express = require('express');
const { protect } = require('../middleware/auth.middleware.js');
const { admin } = require('../middleware/admin.middleware.js');
const {createOrder, getOrders, getOrderbyid, updateOrderStatus} = require('../controller/orderController.js')


const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.route('/:id').get(protect, getOrderbyid);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;