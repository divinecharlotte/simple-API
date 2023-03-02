const express = require("express");
const passport = require("passport");
const app = express();
const db = require("./models");
const userRoutes = require("./routes/users");

// app.get('/google',(req,res)=>{
// res.send('<a href="/users/auth/google">Authenticate with Google</a>');
// });

app.use("/users", userRoutes);
app.get('/google/callback',
passport.authenticate('google',{
  successRedirect:'/',
  failueRedirect:'/auth/failure',
})
)
app.get('/auth/failure',(req,res)=>{
  res.send('sommething wrong')
})
db.sequelize.sync().then((res) => {
  app.listen(3000, () => {
    console.log("server started");
  });
});
