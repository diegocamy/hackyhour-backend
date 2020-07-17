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
    picture: String,
    bio: { type: String, default: `Hacky Hour!` },
    social: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      instagram: { type: String, default: '' },
      github: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user', userSchema);
