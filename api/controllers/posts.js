const Post = require('../../db/models/posts');
module.exports = {
  createPost: async (req, res, next) => {
    try {
      const {
        title,
        category,
        slug,
        description,
        featuredImage,
        post,
      } = req.body;
      const { _id: userId } = req.user;

      const newPost = new Post({
        title,
        category,
        slug,
        description,
        featuredImage,
        likes: 0,
        post,
        author: userId,
      });

      await newPost.save({});

      res.json({ post: newPost });
    } catch (error) {
      res.json({ error });
    }
  },
};
