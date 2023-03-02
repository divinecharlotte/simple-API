// const passport= require('passport');
// const User = require('./models/User');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
//     // Generate and sign a JWT token
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET);
//     // Pass the token to the done callback function
//     done(null, token);
  
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Redirect the user to the home page with the JWT token in the query string
//     res.redirect(`/home?token=${req.user}`);
//   });
 
//  const GOOGLE_CLIENT_ID = 269910936680-h8h3au316h4m3fblj9sjmfe4olsa49j1.apps.googleusercontent.com
//  const GOOGLE_CLIENT_SECRET = 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;
// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/google/callback",
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//       return done(err,profile);
  
//   }
// ));
// passport.serializeUser(function(user,done){
// done(null,User);
// });
// passport.deserializeUser(function(user,done){
//   done(null,User);
//   });

require('dotenv').config()
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const { User } = require("./models");

const JWT_SECRET = "secret_key";
const express = require("express")
const app = express();
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    // Find or create the user in your database
    const user = await User.findOne({ googleId: profile.id });
    if (!user) {
      const newUser = new User({
        googleId: profile.id,
        firstName: profile.name.givenName,
        email: profile.emails[0].value
      });
      await newUser.save();
    }
    // Generate and sign a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    // Pass the token to the done callback function
    done(null, token);
  }
));
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirect the user to the home page with the JWT token in the query string
    res.redirect(`/home?token=${req.user}`);
  });







