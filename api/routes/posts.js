const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const { authCheck } = require('../../utils/utils');

router.post('/', authCheck, postsController.createPost);

router.get('/', postsController.getAllPosts);

router.get('/:slug', postsController.getPostById);

router.post('/like/:postId', authCheck, postsController.likePost);

router.post('/dislike/:postId', authCheck, postsController.dislikePost);

module.exports = router;
