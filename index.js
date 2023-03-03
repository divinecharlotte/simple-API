const express = require("express");
const passport = require("passport");
const app = express();
const db = require("./models");

const userRoutes = require("./routes/users");

app.use("/users", userRoutes);

app.get('/google/callback',
passport.authenticate('google',{
  successRedirect:'/',
  failureRedirect:'/auth/failure',
})
)
app.get('/auth/failure',(req,res)=>{
  res.send('something went wrong ....')
})
db.sequelize.sync().then((res) => {
  app.listen(3000, () => {
    console.log("server started");
  });
});
