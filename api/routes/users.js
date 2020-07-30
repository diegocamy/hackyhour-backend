const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { authCheck } = require('../../utils/utils');

//TODO PRIVATE USER ROUTES
router.get('/islogged', authCheck, (req, res) => {
  res.json({ user: req.user });
});

router.get('/:id', userController.getUserProfile);

module.exports = router;
