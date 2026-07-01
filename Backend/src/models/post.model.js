const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true
    },
    caption: {
      type: String,
      trim: true,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
