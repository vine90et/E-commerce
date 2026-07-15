const express = require("express");
const {registerUser, loginUser, getUser} = require("../controller/authController.js")
const {protect} = require("../middleware/auth.middleware.js");
const {admin} = require("../middleware/admin.middleware.js")
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users",protect , admin, getUser);

module.exports =  router; 