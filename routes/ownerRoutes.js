const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownersModel");

console.log(process.env.NODE_ENV);

// if (process.env.NODE_ENV == "development") {
router.post("/create", async function (req, res) {
  let owners = await ownerModel.find();
  let { fullname, email, password } = req.body;
  if (owners.length > 0)
    return res.status(500).send("You dont have access to create new owner");
  let createdowner = await ownerModel.create({
    fullname,
    email,
    password,
  });

  res.send(createdowner);
});
// }

router.get("/admin", function (req, res) {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

module.exports = router;
