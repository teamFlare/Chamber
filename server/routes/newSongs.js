'use strict';
const express = require('express');
const router = express.Router();
const NewSongsController = require('../controllers').NewSongs;

router.route('/')
  .get(NewSongsController.getNewSongs)

module.exports = router;