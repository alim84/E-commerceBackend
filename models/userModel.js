const { default: mongoose, Schema } = require("mongoose");

let userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      minLength: 4,
      maxLength: 20,
    },
    email: {
      type: String,
      require: [true, "Name is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
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
    isVerify: {
      type: Boolean,
      default:false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Userbd", userSchema);
