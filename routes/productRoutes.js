const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/productModel");

router.post("/create", upload.single("image"), async function (req, res) {
  let { name, discount, price, bgcolor, textcolor, panelcolor } = req.body;

  try {
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      discount,
      price,
      bgcolor,
      textcolor,
      panelcolor,
    });
    req.flash("success", "Product Created");
    res.redirect("/owners/admin");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
