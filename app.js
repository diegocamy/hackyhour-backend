const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

//SERIALIZE AND DESERIALIZE USERS
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//IMPORT ROUTES
const userRoute = require('./api/routes/users');

//EXPRESS APP AND PORT
const app = express();
const PORT = process.env.PORT || 5000;

//CONNECT TO DB
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log('Connected to DB')
);

//MIDDLEWARES
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

//ROUTES
app.get('/', (req, res) => res.json({ hello: `It's working 😎😎` }));
app.get(
  '/whatever',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect('/');
  }
);
app.use('/api/users', userRoute);
app.listen(PORT, () => console.log(`Server Listening on Port:${PORT}`));
