const router = require("express").Router();
let Person = require("../models/person.model");
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../static/img/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/uploadImage", (req, res) => {
  console.log("Image uploaded");
  upload(req, res, (err) => {
    if (err) {
      console.log("Uploader", err, req.file);
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.route("/all").get((req, res) => {
  Person.find()
    .then((persons) => res.json(persons))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/missing").get((req, res) => {
  Person.find()
    .where("type")
    .equals("Missing")
    .then((persons) => res.json(persons))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/found").get((req, res) => {
  Person.find()
    .where("type")
    .equals("Found")
    .then((persons) => res.json(persons))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/count").get(function (req, res) {
  Person.count({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const name = req.body.name;
  const description = req.body.description;
  const location = req.body.location;
  const type = req.body.type;
  const date = Date.parse(req.body.date);
  const images = req.body.images;

  const newPerson = new Person({
    title,
    name,
    description,
    location,
    type,
    date,
    images,
  });

  newPerson
    .save()
    .then(() => res.json("Person added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Person.findById(req.params.id)
    .then((person) => res.json(person))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.json("Person deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      person.title = req.body.title;
      person.description = req.body.description;
      person.type = req.body.type;
      person.date = Date.parse(req.body.date);

      person
        .save()
        .then(() => res.json("Person updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
