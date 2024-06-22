const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "you need to login first");
    return res.redirect("/");
  }

  try {
    let decod = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({
        email: decod.email,
      })
      .select("-password");
    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "something is wrong");
    res.redirect("/");
  }
};
