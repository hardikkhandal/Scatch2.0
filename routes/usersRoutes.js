const express = require("express");
const router = express.Router();

router.get("/", function (res, res) {
  res.send("Hey");
});

module.exports = router;
