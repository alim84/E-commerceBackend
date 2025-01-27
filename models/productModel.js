const { default: mongoose, Schema } = require("mongoose");

let productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
    },

    image: {
      type: [],
      require: true,
    },

    categroy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    stock: {
      type: Number,
    },
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    rating: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
    sellingprice: {
      type: Number,
      require: true,
    },
    discountprice: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
