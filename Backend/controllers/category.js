const Category = require("../models/Category");
const Post = require("../models/Post");
const List = require("../models/List");

exports.getCats = async (req, res) => {
  const cats = await Category.find({});

  const catsMap = [];
  cats.forEach((cat) => {
    catsMap.push(cat);
  });
  res.json(catsMap);
};
exports.getCat = async (req, res) => {
  const cat = await Category.findById(req.params.id);

  res.json(cat);
};
exports.save = (req, res) => {
  Category.findById(req.body.id, (err, cat) => {
    if (!cat) cat = new Category();
    cat.name = req.body.name;
    cat.color = req.body.color;

    cat.save((err) => {
      if (err) {
        return res.json(err);
      }
      res.json({ success: true, cat });
    });
  });
};

exports.delete = (req, res) => {
  Category.findById(req.body.id, (err, cat) => {
    if (err) {
      return res.json(err);
    }
    if (cat) {
      Post.deleteMany({ category: cat.name }, (err) => {
        if (err) {
          return res.json(err);
        }
      });
      List.deleteMany({ category: cat.name }, (err) => {
        if (err) {
          return res.json(err);
        }
      });
      Category.deleteOne({ _id: req.body.id }, (err) => {
        if (err) {
          return res.json(err);
        }
        return res.json({ success: true });
      });
    } else {
      return res.json({ success: false, msg: "no categories with this id" });
    }
  });
};
