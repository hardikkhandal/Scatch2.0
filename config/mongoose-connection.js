//kabab case im using for config files
//set DEBUG=development:*
const mongoose = require("mongoose");
const debug = require("debug")("development:mongoose");
const config = require("config");

mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  // agar development h env variable toh yha se value uthaenga else production se uthagenga so it is super dope
  // .connect(
  //   "mongodb+srv://hardik:hardik@cluster.iznlmik.mongodb.net/?retryWrites=true&w=majority&appName=cluster"
  // )

  .then(function () {
    debug("connected");
    console.log("Connected to Database");
  })
  .catch(function (err) {
    debug(err);
    console.log(err);
  });

mongoose.exports = mongoose.connection;
