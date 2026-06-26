const express = require("express");
const { protect } = require("../middleware/auth.middleware.js");
const { admin } = require("../middleware/admin.middleware.js");
const { getAdminStats } = require("../controller/analyticsController.js");

const router = express.Router();

router.get("/", protect, admin, getAdminStats);

module.exports = router;