const express = require("express");
const rolemodel = require("../models/role");
const User = require("../models/userModel");

// Route
const router = express.Router();

router.post("/update", (req, res) => {
  User.updateOne({ email: req.body.emails }, { $set: { role: req.body.role } })
    .then((resData) => {
      res.json(resData);
    })
    .catch((err) => console.log("Error!" + err));
});

router.post("/add", (req, res) => {
  if (!req.body) {
    return res.status(400).send("request body is missing");
  }
  let model = new rolemodel(req.body);
  model
    .save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.get("/role", (req, res) => {
  rolemodel
    .findOne({
      _id: req.query.id,
    })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/role/", (req, res) => {
  rolemodel
    .findOneAndUpdate(
      {
        _id: req.query.id,
      },
      req.body,
      {
        new: true,
      }
    )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.get("/showroles", (req, res) => {
  rolemodel
    .find()
    .then((doc) => {
      res.setHeader("Content-Range", "users 0-5/5");
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/user/", (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.query.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
