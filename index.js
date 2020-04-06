// index.js

// import required libaries and files
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const searchRoutes = require("./routes/searchRoutes");
const adminRoutes = require("./routes/adminRoutes");
const isAdmin = require("./middlewares/isAdmin");

// connect to database
mongoose.connect(config.DB, { useNewUrlParser: true, ssl: false }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Can not connect to the database" + err);
  }
);

const app = express();

// initialize middleware for authentication and body pasring
app.use(passport.initialize());
require("./middlewares/passport")(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// attach CORS headers *Development ONLY - remove for production*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});

// use api routes in the App
app.use("/v1/auth", authRoutes);
app.use("/v1/search", searchRoutes);
app.use(
  "/v1/admin",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  adminRoutes
);
app.use(
  "/v1/user",
  passport.authenticate("jwt", { session: false }),
  userRoutes
);

// debug route for testing API
app.get("/", function (req, res) {
  res.send("hello");
});

// set app port
const PORT = process.env.PORT || 5000;

// start http server and listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
