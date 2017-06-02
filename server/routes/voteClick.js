'use strict';
const express = require('express');
const router = express.Router();
const VoteClickController = require('../controllers/index.js').VoteClick;

router.route('/')
  .post(VoteClickController.voteClick)

module.exports = router;