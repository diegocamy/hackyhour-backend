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
  passport.authenticate('google', { session: false }),
  userController.googleOauth
);

module.exports = router;
