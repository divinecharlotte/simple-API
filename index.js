const express = require("express");
const app = express();
const db = require("./models");

const userRoutes = require("./routes/users");

app.use("/users", userRoutes);

db.sequelize.sync().then((res) => {
  app.listen(3000, () => {
    console.log("server started");
  });
});
