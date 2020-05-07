const graph = require("fbgraph");
const getScore = require("../utils/scoreCalc");
const User = require("../models/userModel");
const config = require("../configs/config");
/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = async (req, res, next) => {
  let token;
  if (req.user && req.user.data.tokens) {
    token = req.user.data.tokens.find((token) => token.kind === "facebook");
  } else {
    const user = await User.findOne().sort({ createdAt: -1 });

    token = user.tokens.find((token) => token.kind === "facebook");
  }
  graph.extendAccessToken(
    {
      access_token: token,
      client_id: config.FACEBOOK_ID,
      client_secret: config.FACEBOOK_SECRET,
    },
    function (err, facebookRes) {
      console.log(facebookRes);
    }
  );
  var fbSimpleFields = [
    "id",
    "from",
    "message",
    "story",
    "full_picture",
    "link",
    "type",
    "created_time",
    "updated_time",
  ];
  graph.setAccessToken(token.accessToken);
  group = config.GROUP_ID;
  path = `/${group}/feed?fields=${fbSimpleFields}`;
  // console.log(req.query)
  if (req.query.next) {
    path = req.query.next.replace("https://graph.facebook.com/v6.0", "");
  }
  // console.log(path)
  graph.get(path, async (err, result) => {
    if (err) {
      return res.json(err);
    }
    posts = result.data;
    nextLink = result.paging.next;
    var finalResults = await Promise.all(
      posts.map(async (post) => {
        ids = post.id.split("_");
        post.link = `https://www.facebook.com/groups/${ids[0]}/permalink/${ids[1]}/`;
        scores = await getScore(post.message);
        scores = Object.keys(scores).map((key) => {
          const obj = {};
          obj[key] = scores[key];
          return obj;
        });
        scores.sort((a, b) => {
          return b[Object.keys(b)[0]] - a[Object.keys(a)[0]];
        });
        post.scores = scores;
        return post;
      })
    );

    return res.json({ posts: finalResults, next: nextLink });
  });
};
