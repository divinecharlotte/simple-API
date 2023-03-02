const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const { User } = require("./models");
const GOOGLE_CLIENT_ID = "520999183618-dk5drjr37h8q70hqf2grqg20kgf8t552.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
const JWT_SECRET = "secret_key";

const express = require("express")
const app = express();

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
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
