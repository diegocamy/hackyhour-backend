const Post = require('../../db/models/posts');
const User = require('../../db/models/users');
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
  getPostById: async (req, res, next) => {
    try {
      const slug = req.params.slug;
      //SEARCH FOR THE POST
      const fetchedPost = await Post.findOne({ slug });
      //IF THERE ISNT A POST FOR THE SPECIFIED SLUG, SEND A NOT FOUND RESPONSE
      if (!fetchedPost) return res.status(404).json({ message: 'not found' });

      //AFTER FINDING THE POST, FETCH THE POST AUTHOR DATA
      const postAuthor = await User.findOne({ _id: fetchedPost.author });

      //RETURN THE DATA
      res.json({ post: fetchedPost, author: postAuthor });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
