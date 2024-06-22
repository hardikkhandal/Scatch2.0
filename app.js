const express = require("express");
const app = express();
const mongoDB = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const ownerRoutes = require("./routes/ownerRoutes");
const usersRoutes = require("./routes/usersRoutes");
const productRoutes = require("./routes/productRoutes");
const index = require("./routes/index");
const flash = require("connect-flash");
const expressSession = require("express-session");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_KEY,
  })
);
app.use(flash());

app.use("/", index);
app.use("/owners", ownerRoutes);
app.use("/users", usersRoutes);
app.use("/products", productRoutes);

app.listen(3000);
