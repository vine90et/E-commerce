const express = require('express');
const {createOrder, verifyOrder} = require("../controller/paymentController.js")

const router = express.Router();

router.post("/order", createOrder);
router.post("/verify", verifyOrder);

module.exports = router;