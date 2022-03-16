const express = require('express')
const config = require('dotenv')
const ejsLayouts = require('express-ejs-layouts')
const { MongoDB } = require('./config/mongo')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const app = express()

// config file
config.config({ path: './config/config.env' })

// body parser for form data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// set up ejs
app.set('layout', 'layouts/layout')
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// session
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: `${process.env.MONGO_URI}` })
}));
app.use(passport.initialize());
app.use(passport.session()); //persistent login session
app.use(flash())

// local variables set up
const { verifyRole } = require('./middleware/verifyRole');
// local functions
app.use((req, res, next) => {
  res.locals.verifyRole = verifyRole;
  res.locals.error_msg = req.flash('error_msg');
  res.locals.success_msg = req.flash('success_msg');

  next();

});

// setup auth middleware
const { ensureAuth, ensureGuest } = require('./middleware/ensureAuth')

// setup Routes
app.use('/', require('./controllers/home/home'))
app.use('/user', ensureAuth, require('./controllers/user/user'))
app.use('/google', ensureGuest, require('./controllers/google/google'))
app.use('/local', ensureGuest, require('./controllers/local/local'))



// connect MongoDB
MongoDB(process.env.MONGO_URI);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})