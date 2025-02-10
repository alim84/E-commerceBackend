const express = require("express");
require("dotenv").config();
const router = require("./routers");
const cors = require("cors");
const dbConnect = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
dbConnect();
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}));
app.use(router);

app.listen(process.env.SERVER_PORT || 8080, () => {
  console.log("Server is running");
});
