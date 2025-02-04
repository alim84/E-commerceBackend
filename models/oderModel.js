const { default: mongoose, Schema } = require("mongoose");

let cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Userbd",
    },

    quntity: {
      type: Number,
      default: 1,
    },
    totalprice: {
      type: Number,
    },
    cartItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      },
    ],
    paymentstatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
