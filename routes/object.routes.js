const router = require("express").Router();
let Object = require("../models/object.model");
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
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
  Object.find()
    .then((persons) => res.json(persons))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post(
  (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
        if (key === "price") {
          findArgs[key] = {
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1],
          };
        } else {
          findArgs[key] = req.body.filters[key];
          console.log(findArgs, "weyweywey");
        }
      }
    }

    // if (term) {
    //   Object.find(findArgs)
    //     .find({ $text: { $search: term } })
    // .populate("writer")
    //   .sort([[sortBy, order]])
    // .skip(skip)
    // .limit(limit)
    // .exec((err, objects) => {
    //   if (err) return res.status(400).json({ success: false, err })
    // res.status(200).json({ success: true, objects, postSize: objects.length })
    // })
    //} else {
    Object.find(findArgs)
      //.populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, objects) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, objects, postSize: objects.length });
      });
  }

  //Object.find()
  //  .then(objects => res.json(objects))
  //.catch(err => res.status(400).json('Error: ' + err));
  //}
);

router.route("/add").post((req, res, next) => {
  console.log(req.file);
  const objectTitle = req.body.objectTitle;
  const category = req.body.category;
  const location = req.body.location;
  const date = Date.parse(req.body.date);
  const langtitude = Number(req.body.langtitude);
  //const latitude = Number(req.body.latitude);
  const adType = req.body.adType;
  const brandName = req.body.brandName;
  //const tags = Array(req.body.tags);
  const images = req.body.images;

  const newObject = new Object({
    objectTitle,
    category,
    location,
    date,
    langtitude,
    //  latitude,
    adType,
    brandName,
    //tags
    images,
  });

  newObject
    .save()
    .then(() => res.json("Object added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/matching").post((req, res) => {
  Object.find()
    .then((objects) => res.json(objects))
    .catch((err) => res.status(400).json("Error: " + err));

  aa = JSON.parse.res;
  for (let k in aa) {
    console.log(k, aa[k], "aaaaaaaaaaaaaaaaaaaaaa");
  }

  // console.log(images[1],images[2])
});

router.route("/:id").get((req, res) => {
  Object.findById(req.params.id)
    .then((object) => res.json(object))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Object.findByIdAndDelete(req.params.id)
    .then(() => res.json("Object deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Object.findById(req.params.id)
    .then((object) => {
      object.objectTitle = req.body.objectTitle;
      object.category = req.body.category;
      object.location = req.body.location;
      object.date = Date.parse(req.body.date);
      object.langtitude = Number(req.body.langtitude);
      object.latitude = Number(req.body.latitude);
      object.adType = req.body.adType;
      object.brandName = req.body.brandName;
      object.tags = [req.body.tags];

      object
        .save()
        .then(() => res.json("Object updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
