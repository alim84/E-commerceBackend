const { default: mongoose } = require("mongoose");

async function dbConnect() {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Database is Connceted");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = dbConnect;
