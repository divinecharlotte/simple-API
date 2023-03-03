require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
passport.use(
  new GoogleStrategy(
    {
      // options
      callbackURL: "/users/auth/google/callback",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleId = profile.id;
      const firstName = profile.displayName;
      const email = profile.emails[0].value;
      let user;
      try {
        user = await User.findOne({ where: { googleId: profile.id } });
        if (!user) {
          user = await User.create({
            googleId,
            firstName,
            email,
          });
          const token = jwt.sign(
            { googleId, firstName, email },
            process.env.JWT_SECRET
          );
          console.log(token);
          return done(null, { id: user.id, token });
        } else {
          const token = jwt.sign(
            { googleId, firstName, email },
            process.env.JWT_SECRET
          );
          return done(null, { id: user.id, token });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  });
});
