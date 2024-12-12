const express = require("express");
require("dotenv").config();
const router = require("./routers");
const app = express();

app.use(router);

app.listen(process.env.SERVER_PORT || 8080, () => {
  console.log("Server is running");
});
