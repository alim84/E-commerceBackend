const { default: mongoose, Schema } = require("mongoose");

let userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: [true, "Already used email address"],
    },
    password: {
      type: String,
      require: true,
    },
    otp: {
      type: Number,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ecommerceuser", userSchema);
