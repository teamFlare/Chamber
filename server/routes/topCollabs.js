'use strict';
const express = require('express');
const router = express.Router();
const TopCollabsController = require('../controllers').TopCollabs;

router.route('/')
  .get(TopCollabsController.getTopCollabs)

module.exports = router;