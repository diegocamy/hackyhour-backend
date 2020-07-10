const User = require('../../db/models/users');

module.exports = {
  signUp: async (req, res) => {
    try {
      const newUser = new User({
        oauth: 'google',
        name: 'Yeye',
        email: 'yeye@gmail.com',
      });
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      console.log(error);
    }
  },
};
