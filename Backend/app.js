/**
 * Module dependencies.
 */
const express = require("express");
const compression = require("compression");
const session = require("express-session");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const lusca = require("lusca");
const flash = require("express-flash");
const upload = multer({ dest: path.join(__dirname, "uploads") });
const jwt = require("jsonwebtoken");
var cors = require("cors");

const https = require("https");
const fs = require("fs");
/**
 * Controllers (route handlers).
 */
const userController = require("./controllers/user");
const apiController = require("./controllers/api");
const listController = require("./controllers/list");

const categoryController = require("./controllers/category");
const postsController = require("./controllers/posts");

const allRoutes = require("./routes/Routes");
const roleRoute = require("./controllers/roleController");

const exercisesRouter = require("./routes/exercises");
const objectRouter = require("./routes/object.routes");
const personRouter = require("./routes/persons");

//passport jwt initialisation
require("./configs/passport")(passport);

//connecting to mongodb
require("./configs/mongodbConnexion")(mongoose);

/**
 * API keys and Passport configuration.
 */
const config = require("./configs/config");
const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, "ssl", "server.cert")),
  key: fs.readFileSync(path.join(__dirname, "ssl", "server.key")),
};

/**
 * Create Express server.
 */
const app = express();
app.use(cors());

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.connect(config.MongoURI);
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

/**
 * Express configuration.
 */
app.set("port", config.port || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: config.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
    store: new MongoStore({
      url: config.MongoURI,
      autoReconnect: true,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
/*
 * Primary app routes.
 */
app.use("/api", allRoutes);
app.use("/role", roleRoute);
app.get("/", apiController.getFacebook);

app.get("/user", (req, res) => {
  return res.json(req.user);
});

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
    // we can set expiration time using sync

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

app.get("/users", userController.getUsers);
app.post("/users/save", userController.save);
app.post("/users/delete", userController.delete);
app.get("/users/:id", userController.getUser);

app.use("/exercises", exercisesRouter);
app.use("/objects", objectRouter);
app.use("/persons", personRouter);

app.use("/uploads", express.static("uploads"));

/**
 * Start Express server.
 */
https.createServer(httpsOptions, app).listen(app.get("port"), () => {
  console.log("App is running at https://localhost:" + app.get("port"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
