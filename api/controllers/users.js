const User = require('../../db/models/users');
const Post = require('../../db/models/posts');

module.exports = {
  getUserProfile: async (req, res, next) => {
    try {
      const id = req.params.id;
      //SEARCH USER BY ID
      const foundUser = await User.findById(id);

      if (!foundUser) {
        return;
      }
      //SEARCH POSTS MADE BY THE USER
      const postsByUser = await Post.find({ author: id }).sort({
        createdAt: -1,
      });

      return res.json({ user: foundUser, posts: postsByUser });
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
