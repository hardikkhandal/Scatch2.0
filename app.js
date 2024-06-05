const express = require("express");
const app = express();
const mongoDB = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser");
const path = require("path");

const ownerRoutes = require("./routes/ownerRoutes");
const usersRoutes = require("./routes/usersRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("views engine", "ejs");

app.use("/owners", ownerRoutes);
app.use("/users", usersRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("hey");
});
app.listen(3000);
