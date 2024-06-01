const mongoose = require("mongoose");

mongoose.connect("db");

const productSchema = mongoose.Schema({
  image: String,
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
