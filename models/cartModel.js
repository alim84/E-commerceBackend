const { default: mongoose, Schema } = require("mongoose");

let cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Userbd",
    },

    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    quntity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
