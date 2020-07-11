const JWT = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  googleOauth: async (req, res, next) => {
    try {
      const user = req.user;
      const token = await JWT.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      return res.status(200).json({ token: token });
    } catch (error) {
      console.log(error);
    }
  },
};
