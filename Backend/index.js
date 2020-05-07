const express = require("express");
const app = express();
const allRoutes = require("./routes/Routes");
const passport = require("passport");
const mongoose = require("mongoose");
const path = require("path");
const https = require("https");
const fs = require("fs");

const apiController = require("./controllers/api");
const listController = require("./controllers/list");
const categoryController = require("./controllers/category");
const postsController = require("./controllers/posts");

//passport jwt initialisation
require("./configs/passport")(passport);

//connecting to mongodb
require("./configs/mongodbConnexion")(mongoose);

/**
 * API keys and Passport configuration.
 */
const passportConfig = require("./configs/pass");
const config = require("./configs/config");
const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, "ssl", "server.cert")),
  key: fs.readFileSync(path.join(__dirname, "ssl", "server.key")),
};

//adding middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//allowing cros origin
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",

    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

//adding routes
app.use("/api", allRoutes);

/*
 * Primary app routes.
 */
app.get("/user", passportConfig.isAuthenticated, (req, res) => {
  return res.json(req.user);
});
app.get("/", apiController.getFacebook);
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "https://localhost:3000/",
  }),
  (req, res) => {
    const token = jwt.sign({ data: req.user }, "secret", {
      expiresIn: 60 * 60 * 60,
    });
    res.redirect("http://localhost:3000/token?token=" + token);
  }
);

app.get("/posts", postsController.getPosts);
app.post("/posts/save", postsController.save);
app.post("/posts/delete", postsController.delete);
app.get("/posts/:id", postsController.getPost);

app.get("/lists", listController.getLists);
app.post("/lists/save", listController.save);
app.post("/lists/delete", listController.delete);
app.get("/lists/:id", listController.getList);

app.get("/cats", categoryController.getCats);
app.post("/cats/save", categoryController.save);
app.post("/cats/delete", categoryController.delete);
app.get("/cats/:id", categoryController.getCat);

const port = process.env.PORT || 8080;

/**
 * Start Express server.
 */
https.createServer(httpsOptions, app).listen(port, () => {
  console.log("App is running at https://localhost:" + port);
  console.log("  Press CTRL-C to stop\n");
});
