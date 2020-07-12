const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users');
const { authCheck } = require('../../utils/utils');
require('../../passport/google-strategy');

router.get(
  '/signinwithgoogle',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/googleOauth',
  passport.authenticate('google', {
    successRedirect: '/api/users/loginSuccess',
  })
);

router.get('/loginSuccess', (req, res) => {
  res.redirect('http://localhost:3000');
});

//TODO PRIVATE USER ROUTES
router.get('/islogged', authCheck, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
