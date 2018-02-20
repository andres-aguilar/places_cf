const express = require('express');

const placesController = require('../controllers/placesController');

let router = express.Router();

router.route("/")
  .get(placesController.index)
  .post(placesController.create);

router.route("/:id")
  .get(placesController.show)
  .put(placesController.update)
  .delete(placesController.destroy);

module.exports = router;
