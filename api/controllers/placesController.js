const Place = require('../models/Place');
const upload = require('../config/upload');
const uploader = require('../models/Uploader');

function find(req, res, next) {
  Place.findById(req.params.id)
  .then(place => {
    req.place = place;
    next();
  })
  .catch(err => {
    next(err);
  });
}

function index(req, res) {
  Place.paginate({}, {page: req.query.page || 1, limit: 1, sort: {"_id": -1}})
  .then(docs => {
    res.json(docs);
  }).catch(err => {
    console.log(err);
    res.json(err);
  });
}

function show(req, res) {
  Place.findById(req.params.id).then(doc => {
    res.json(doc);
  }).catch(err => {
    console.log(err);
    res.json(err);
  });
}

function create(req, res, next) {
  Place.create({
    title: req.body.title,
    description: req.body.description,
    acceptsCreditCard: req.body.acceptsCreditCard,
    openHour: req.body.openHour,
    closeHour: req.body.closeHour
  }).then(doc=>{
    req.place = doc;
    next();
  }).catch(err => {
    next(err);
  })
}

function update(req, res) {
  let attributes = ["title", "description", "acceptsCreditCard", "openHour", "closeHour"];
  let placeParams = {};

  attributes.forEach(attr => {
    if(Object.prototype.hasOwnProperty.call(req.body, attr)){
      placeParams[attr] = req.body[attr];
    }
  });

  req.place = Object.assign(req.place, placeParams);

  req.place.save().then(doc => {
    res.json(doc);
  }).catch(err => {
    console.log(err);
    res.json(err);
  });
}

function destroy(req, res) {
  req.place.remove().then(doc => {
    res.json(doc);
  }).catch(err => {
    console.log(err);
    res.json(err);
  });
}

function multerMiddleware() {
  return upload.fields([
    {name: "avatar", maxCount: 1},
    {name: "cover", maxCount: 1}
  ]);
}

function saveImage(req, res) {
  if (req.place) {
    if (req.files && req.files.avatar) {
      const path = req.files.avatar[0].path;
      uploader(path).then(result => {
        console.log(result);
        res.json(req.place);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
    }
  } else {
    res.status(422).json({
      error: req.error || "Could not save place"
    });
  }
}

module.exports = {index, show, update, create, destroy, find, multerMiddleware, saveImage};
