const express = require('express');
const router = express.Router();
const passport = require('passport');
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

module.exports = router;
