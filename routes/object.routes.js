const router = require('express').Router();
let Object = require('../models/object.model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML
deepai.setApiKey('51db84da-9a7e-4c5b-9c2b-9aae1c99001e');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


router.post("/uploadImage", (req, res) => {
    console.log("Image uploaded")
    upload(req, res, err => {
        if (err) {
            console.log("Uploader", err, req.file);
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});





router.route('/').post(async function (req, res) {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;
   // if (req.body.adType=="0"){
    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]

                }

            } else {
                findArgs[key] = req.body.filters[key];
                console.log(findArgs, "weyweywey")
            }
        }
    }

    
 
    Object.find(/*{adType:"0"} ,*/ findArgs )
        //.populate("writer")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, objects) => {
           
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, objects, postSize: objects.length })

        });
    
}

    //Object.find()
    //  .then(objects => res.json(objects))
    //.catch(err => res.status(400).json('Error: ' + err));
    //}
);

function addPost(req, res, next) {
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
    newObject.save()

        .catch(err => res.status(400).json('Error: ' + err));

    console.log("9bal");
    return next();


}

async function resultat(img, category,brandName) {
    console.log("hamzaoui");
    let foundedObject = await search(img, category,brandName)

    const objects = new Map([...foundedObject.entries()].sort((a, b) => b[1] - a[1]))
   
    return objects;
}
router.route('/add').post(addPost, async function (req, res) {
    console.log("add post image" + req.body.images[0]);
    const objects = await resultat(req.body.images[0], req.body.category, req.body.brandName)
  
    res.send({ objects: [...objects.keys()] });
    objects.forEach(function (found) {
        found.then(function (el) {
            console.log(el);
        })
    });

});
router.route('/addFound').post((req, res, next) => {
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

    newObject.save()
        .then(() => res.json('Object added!'))
        .catch(err => res.status(400).json('Error: ' + err));  
        
});

async function search(img, category,brandName) {
    const directoryPath = path.join(__dirname, '../');
    console.log(directoryPath);
    console.log("search:" + img);


    const objectss = await Object.find({});
    const myMap = {};
    objectss.forEach((obj) => {
        myMap[obj._id] = obj;
    });
    let foundedObject = new Map();
    for (var map in myMap) {
        if (myMap[map].category == category  && myMap[map].adType == "1" && myMap[map].brandName == brandName) {
            myMap[map].images.forEach(function (file) {
                if (file != img) {
                    foundedObject.set(myMap[map], (async function () {
                        var resp = await deepai.callStandardApi("image-similarity", {

                            image1: fs.createReadStream(img),
                            image2: fs.createReadStream(directoryPath + file),
                        });
                       
                        return resp.output.distance;
                    })());

                }

            });

        }
    }
    return foundedObject;
}

router.route('/matching').post((req, res) => {
    let categories = req.query.category
    console.log("req.query.category", req.query.category)

    Object.find({ 'category': { $in: categories } })
        .exec((err, objects) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, objects })

        })



    // console.log(images[1],images[2])

});



router.route('/:id').get((req, res) => {
    Object.findById(req.params.id)
        .then(object => res.json(object))
        .catch(err => res.status(400).json('Error: ' + err));
});
//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array 
router.get("/object_by_id", (req, res) => {
    let type = req.query.type
    let objectIds = req.query.id

    console.log("req.query.id", req.query.id)

    if (type === "array") {
        let ids = req.query.id.split(',');
        objectIds = [];
        objectIds = ids.map(item => {
            return item
        })
    }

    console.log("objectIds", objectIds)


    //we need to find the product information that belong to product Id 
    Object.find({ '_id': { $in: objectIds } })
        //.populate('writer')
        .exec((err, object) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(object)
        })
});

router.route('/:id').delete((req, res) => {
    Object.findByIdAndDelete(req.params.id)
        .then(() => res.json('Object deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Object.findById(req.params.id)
        .then(object => {

            object.objectTitle = req.body.objectTitle;
            object.category = req.body.category;
            object.location = req.body.location;
            object.date = Date.parse(req.body.date);
            object.langtitude = Number(req.body.langtitude);
            object.latitude = Number(req.body.latitude);
            object.adType = req.body.adType;
            object.brandName = req.body.brandName;
            object.tags = [req.body.tags];

            object.save()
                .then(() => res.json('Object updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;
