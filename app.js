const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
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
const authRoute = require('./api/routes/auth');
const postRoute = require('./api/routes/posts');

//EXPRESS APP AND PORT
const app = express();
const PORT = process.env.PORT || 5000;

//CONNECT TO DB
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  console.log('Connected to DB')
);

//MIDDLEWARES
app.use(helmet());
app.use(
  cookieSession({
    name: 'hackyhour',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY],
  })
);
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

//ROUTES
app.get('/', (req, res) => res.json({ hello: `It's working 😎😎` }));
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.listen(PORT, () => console.log(`Server Listening on Port:${PORT}`));
