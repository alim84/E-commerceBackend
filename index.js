const express = require("express");
require("dotenv").config();
const router = require("./routers");
const cors = require('cors')
const dbConnect = require("./config/dbConfig");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
app.use(router);
app.use(cors())

app.listen(process.env.SERVER_PORT || 8080, () => {
  console.log("Server is running");
});
