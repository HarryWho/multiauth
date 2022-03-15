const LocalStrategy = require('passport-local').Strategy
const { comparePassword } = require('../middleware/ensureAuth')
const User = require('../models/googleSchema')
const passport = require('passport')

passport.use(new LocalStrategy({ usernameField: 'email' },
  function(email, password, done) {
    try {
      User.findOne({ email: email }, async function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        await comparePassword(password, user, (pass) => {
          if (!pass) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
      });
    } catch (error) {
      console.log(error)
    }
  }
));

// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     cb(null, user);
//     // { id: user._id, displayName: user.displayName, email: user.email, image: user.image, joined: user.joinedDate }
//   });
// });

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });