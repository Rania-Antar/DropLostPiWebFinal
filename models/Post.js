const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    message: String,
    category: String,
    from: String,
    link: String,
    fullPicture: String,
    createdTime: Date,
    updatedTime: Date,
    type: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
