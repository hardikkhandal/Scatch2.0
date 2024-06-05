//kabab case im using for config files

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://hardik:hardik@cluster.iznlmik.mongodb.net/?retryWrites=true&w=majority&appName=cluster"
  )
  .then(function () {
    console.log("connected");
  })
  .catch(function (err) {
    console.log(err);
  });

mongoose.exports = mongoose.connection;
