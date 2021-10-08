import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import categoryRoute from "./routes/category.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
// import paymentBRoute from "./routes/paymentBRoute.js";
import stripePayment from "./routes/stripePayment.js";

dotenv.config();

//middleware
const app = express();
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors());

//db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log(error);
  });
//routes
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);
// app.use("/api", paymentBRoute);

app.use("/api", stripePayment);

app.get("/api", (req, res) => {
  res.send("welcome to the shopping api");
});

//port
const PORT = process.env.PORT || 5000;

//server started
app.listen(PORT, () => {
  console.log(`server start on port ${PORT} `);
});
