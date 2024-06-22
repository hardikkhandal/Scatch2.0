const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: Buffer,
  name: String,
  discount: {
    type: Number,
    default: 0,
  },
  price: Number,
  bgcolor: String,
  textcolor: String,
  panelcolor: String,
});

module.exports = mongoose.model("products", productSchema);
