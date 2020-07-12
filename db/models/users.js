const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    oauth: {
      type: String,
      enum: ['google', 'github'],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    picture: String,
    bio: String,
    social: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String,
      github: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user', userSchema);
