const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { authCheck } = require('../../utils/utils');

router.get('/islogged', authCheck, userController.getLoggedUser);

router.post('/editProfile', authCheck, userController.editProfile);

router.get('/:id', userController.getUserProfile);

module.exports = router;
