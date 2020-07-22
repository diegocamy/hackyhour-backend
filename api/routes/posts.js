const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const { authCheck } = require('../../utils/utils');

router.post('/', authCheck, postsController.createPost);

router.get('/:slug', postsController.getPostById);

module.exports = router;
