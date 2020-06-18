const List = require("../models/List");

const getPosts = async () => {
  const posts = await List.find({});

  return posts;
};

const getScore = async (text) => {
  var score = {};
  console.log(text);
  if (text) {
    posts = await getPosts();
    posts.forEach((post) => {
      wordList = post.text.replace(/\s\s+/g, " ").trim().split(" ");
      score[post.category] = score[post.category] ? score[post.category] : 0;
      wordList.forEach((word) => {
        var regExp = new RegExp(word.toUpperCase(), "gi");
        var count = (text.toUpperCase().match(regExp) || []).length;
        score[post.category] += count;
      });
    });
  }
  return score;
};

module.exports = getScore;
