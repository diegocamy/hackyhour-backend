const express = require('express');
const router = express.Router();
const passport = require('passport');
const { authCheck } = require('../../utils/utils');
require('../../passport/google-strategy');
require('../../passport/github-strategy');

//GOOGLE SIGN IN
router.get(
  '/signinwithgoogle',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/googleOauth',
  passport.authenticate('google', {
    successRedirect: '/api/auth/loginSuccess',
  })
);

//GITHUB SIGN IN

router.get(
  '/signinwithgithub',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/githubOauth',
  passport.authenticate('github', {
    successRedirect: '/api/auth/loginSuccess',
  })
);

//login success
router.get('/loginSuccess', (req, res) => {
  res.redirect('http://localhost:3000');
});

//check if user is logged in
router.get('/islogged', (req, res) => {
  if (req.user) {
    return res.json({ user: req.user });
  }

  return res.json({ user: null });
});

//logout
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ user: null });
});

module.exports = router;
