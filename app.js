const express = require("express");
const app = express();
const mongoDB = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const http = require("http");
const socketIo = require("socket.io");

const ownerRoutes = require("./routes/ownerRoutes");
const usersRoutes = require("./routes/usersRoutes");
const productRoutes = require("./routes/productRoutes");
const index = require("./routes/index");
const flash = require("connect-flash");
const expressSession = require("express-session");
const userModel = require("./models/userModel");
const isLoggedIn = require("./middlewares/isLoggedIn");

//stripe integration

const stripe = require("stripe")(process.env.STRIPE_KEY);

//
const server = http.createServer(app);
const io = socketIo(server);

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

app.post("/create-checkout-session", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send({ error: "User ID is required" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Sample Product",
            },
            unit_amount: 2000, // $20.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      metadata: { userId },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send({ error: "Failed to create checkout session" });
  }
});

app.get("/success", (req, res) => {
  res.send("Payment Successful");
});

app.get("/cancel", (req, res) => {
  res.send("Payment Canceled");
});

app.get("/checkout", isLoggedIn, (req, res) => {
  const userId = req.user;
  res.render("checkout", { userId: userId });
});

// Routes
app.get("/chat", isLoggedIn, (req, res) => {
  let user = req.user.fullname;
  res.render("chat", { userType: "user", user: user });
});

app.get("/admin-chat", isLoggedIn, (req, res) => {
  res.render("chat", { userType: "admin" });
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("message", (msg) => {
    io.emit("message", msg); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

server.listen(3000);
