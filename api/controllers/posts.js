const Post = require('../../db/models/posts');
const User = require('../../db/models/users');
const { update } = require('../../db/models/posts');
const { post } = require('../routes/auth');
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
  getAllPosts: async (req, res, next) => {
    try {
      const results = await Post.aggregate([
        {
          $match: {
            _id: { $exists: true },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'author_info',
          },
        },
        { $sort: { createdAt: -1 } },
      ]);

      return res.send(results);
    } catch (error) {
      return res.json({ error: error });
    }
  },
  likePost: async (req, res, next) => {
    try {
      //get post from db
      const blogPost = await Post.findById(req.params.postId);
      const postAuthor = await User.findById(blogPost.author);

      //check if user already liked the post
      if (blogPost.likes[req.user._id] !== undefined) {
        return;
      }

      //if the user hasn't liked the post, add a like and return updated post
      blogPost.likes[req.user._id] = 'voted';
      blogPost.markModified('likes');
      await blogPost.save();

      return res.json({ post: blogPost, author: postAuthor });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  dislikePost: async (req, res, next) => {
    try {
      //get post from db
      const blogPost = await Post.findById(req.params.postId);
      const postAuthor = await User.findById(blogPost.author);

      //check if user liked the post, then remove the like
      if (blogPost.likes[req.user._id] !== undefined) {
        delete blogPost.likes[req.user._id];
        blogPost.markModified('likes');
        await blogPost.save();

        return res.json({ post: blogPost, author: postAuthor });
      }

      //if the user hasn't liked the post, return
      return;
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  getPostsByCategory: async (req, res, next) => {
    try {
      const posts = await Post.aggregate([
        {
          $match: {
            category: req.params.categoryId,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'author_info',
          },
        },
        { $sort: { createdAt: -1 } },
      ]);
      return res.send(posts);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  getRelatedPosts: async (req, res, next) => {
    try {
      const posts = await Post.aggregate([
        {
          $match: {
            category: req.params.categoryId,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'author_info',
          },
        },
        { $sort: { createdAt: -1 } },
      ]);
      const filteredPosts = posts.filter(p => p._id.toString() !== req.body.id);
      const randomPosts = filteredPosts
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      return res.send(randomPosts);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  deletePost: async (req, res, next) => {
    try {
      const foundPost = await Post.findById(req.params.postId);

      if (!foundPost) return res.json({ error: 'No post found' });

      if (req.user && req.user._id.toString() === foundPost.author.toString()) {
        await foundPost.remove();
        return res.send('Post Eliminado!');
      } else {
        return res.json({ error: 'Only the author can delete the post' });
      }
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  editPost: async (req, res, next) => {
    try {
      //SEARCH FOR POST ON DB
      const foundPost = await Post.findOne({ slug: req.params.slug });

      if (!foundPost) return res.json({ error: 'Post not found' });

      if (req.user && req.user._id.toString() !== foundPost.author.toString())
        return res.json({ error: 'Only the author can edit the post' });

      const {
        title,
        category,
        slug,
        description,
        featuredImage,
        post,
      } = req.body;

      //UPDATE POST FIELDS

      foundPost.title = title;
      foundPost.slug = slug;
      foundPost.category = category;
      foundPost.description = description;
      foundPost.featuredImage = featuredImage;
      foundPost.post = post;

      await foundPost.save();

      return res.json({ post: foundPost });
    } catch (error) {}
  },
};
