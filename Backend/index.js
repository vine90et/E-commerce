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
    origin: ['http://localhost:5173', process.env.FRONTEND_URL],
    methods: ['Get', 'Post', 'Put', 'Delete'],
    allowedHeaders: ['content-type', 'Authorization']
}));

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/analytics", analyticsRoute);

app.get("/", (req,res)=>{
    console.log("app is running");
     res.send("App is running");
})

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../frontend/dist/index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("ShopNest API is running in Development mode...");
  });
}


app.listen(PORT, ()=>{
    console.log("server is running at post", PORT);
})