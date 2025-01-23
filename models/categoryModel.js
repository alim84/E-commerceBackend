const { default: mongoose, Schema } = require("mongoose");

let categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
   
    },
    description: {
      type: String   
    },
 
    image: {
      type: String,
      require: true,    
    },
 
    product: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ]
 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
