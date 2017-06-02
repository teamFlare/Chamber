'use strict';
const express = require('express');
const router = express.Router();
const TopBeatsController = require('../controllers').TopBeats;

router.route('/')
  .get(TopBeatsController.getSongs)
  // .post(TopBeatsController.create)
  ;

// router.route('/:id')
//   .get(TopBeatsController.getOne)
//   .put(TopBeatsController.update)
//   // .delete(TopBeatsController.deleteOne)
//   ;

module.exports = router;