const User = require("../model/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/send.email.js")


const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "7d"})
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) return res.status(400).json({ message: "All credetials are required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword, role });

        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const message = `
                Welcome to ShopNest, ${name}! Thank you for registering with us. We are excited to have you as part of our community. To complete your registration,
                please use the following One-Time Password (OTP):
                Your OTP for ShopNest registration is: ${otp}`
            await sendEmail(email, "Welcome to shopNest - Your OTP for Registration", message);

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })

        }else{
            return res.status(400).json({message: 'Invalid token generated'})
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password) return res.status(400).json({message:"All credentials are required"});

        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))){
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role:user.role,
                token: generateToken(user._id),
            })
        }else{
            return res.status(400).json({message: 'Invalid email or password'})
        }
    } catch (error) {
        console.log("error in login user controller", error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

const getUser = async(req,res)=>{
    try {
        const users = await User.find({}).select("-password");
        return res.status(200).json(users);
    } catch (error) {
        console.error("error in get user controller: ",error);
        return res.status(500).json({message:"Internal server error", error})
    }
}

module.exports = {registerUser, loginUser, getUser};