const config = {
  MongoURI:
    //"mongodb+srv://admin:admin@cluster0-tdssk.gcp.mongodb.net/test?retryWrites=true&w=majority",
    "mongodb://localhost:27017/piweb",
  port: 8080,
  BASE_URL: "https://localhost:8080",
  FACEBOOK_ID: "2817637084956105",
  FACEBOOK_SECRET: "727eaec61e0775602883ef295ee1b268",
  SESSION_SECRET: "shhh its a secret",
  GROUP_ID: "1262213584168454",
  PER_PAGE: 6,
};

module.exports = config;
