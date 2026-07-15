const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db.js");
const authRoute = require("./routes/authRoute.js")
const productRoute = require("./routes/productRoute.js")
const orderRoute = require("./routes/orderRoute.js")
const paymentRoute = require("./routes/paymentRoute.js")
const analyticsRoute = require("./routes/analyticsRoute.js")

dotenv.config();
connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: true,
  credentials: true,
}));

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/analytics", analyticsRoute);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}


app.listen(PORT, ()=>{
    console.log("server is running at post", PORT);
})