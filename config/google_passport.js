const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/googleSchema')
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/auth/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {


    let user = await User.findOne({ googleId: profile.id })
    if (!user) {

      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: profile.photos[0].value
      };
      try {
        user = new User(newUser);
        user.save()
        return done(null, user)
      } catch (error) {
        return done(error, false)
      }
    } else {

      return done(null, user)
    }

  }
));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user._id, displayName: user.displayName, email: user.email, image: user.image, joined: user.joinedDate, role: user.role });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});