const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const passport = require('passport');
const passportConf = require('../../passport/passport');

router.get(
  '/signinwithgoogle',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/googleOauth',
  passport.authenticate('google', { successRedirect: '/api/users/secretshit' })
);

router.get('/secretShit', (req, res) => {
  res.redirect('http://localhost:3000');
});

const authCheck = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'FORBIDDEN' });
  }

  next();
};

router.get('/redirect', (req, res) => {
  res.redirect('http://localhost:3000');
});

router.get('/random', authCheck, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
