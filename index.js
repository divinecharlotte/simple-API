const express = require("express");
const passport = require("passport");
const session = require("express-session");
const app = express();
const db = require("./models");

const userRoutes = require("./routes/users");
app.use(
  session({
    secret: "hello",
    resave: false,
    saveUninitialized: false,
    maxSize: 100000,
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport-setup");
app.get("/", (req, res) => {
  res.send("home");
});
app.use("/users", userRoutes);

db.sequelize.sync({ force: true }).then((res) => {
  app.listen(3000, () => {
    console.log("server started");
  });
});
