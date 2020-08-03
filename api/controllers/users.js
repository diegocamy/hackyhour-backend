const User = require('../../db/models/users');
const Post = require('../../db/models/posts');

module.exports = {
  getLoggedUser: async (req, res, next) => {
    try {
      res.json({ user: req.user });
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
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
  editProfile: async (req, res, next) => {
    try {
      const { bio, facebook, twitter, instagram, linkedin, github } = req.body;
      const userToEdit = await User.findOne({ _id: req.user._id });
      userToEdit.bio = bio;
      userToEdit.social.facebook = facebook;
      userToEdit.social.twitter = twitter;
      userToEdit.social.instagram = instagram;
      userToEdit.social.linkedin = linkedin;
      userToEdit.social.github = github;

      await userToEdit.save();
      return res.send(userToEdit);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
