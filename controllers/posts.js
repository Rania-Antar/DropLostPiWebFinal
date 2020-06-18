const Post = require("../models/Post");

exports.getPosts = async (req, res) => {
  const posts = await Post.find({});

  const map = [];
  posts.forEach((post) => {
    map.push(post);
  });
  res.json(map);
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.json(post);
};

exports.save = (req, res) => {
  Post.findById(req.body.id, (err, post) => {
    if (!post) post = new Post();
    post.from = req.body.from;
    post.message = req.body.message;
    post.category = req.body.category;
    post.fullPicture = req.body.fullPicture;
    post.link = req.body.link;
    post.type = req.body.type;
    post.createdTime = req.body.createdTime;
    post.updatedTime = req.body.updatedTime;
    post.save((err) => {
      if (err) {
        return res.json(err);
      }
      res.json({ success: true, post });
    });
  });
};

exports.delete = (req, res) => {
  Post.deleteOne({ _id: req.body.id }, (err, post) => {
    if (err) {
      return res.json(err);
    }
    res.json({ success: true });
  });
};
