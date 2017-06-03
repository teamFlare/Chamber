'use strict';
const express = require('express');
const router = express.Router();
const CommentClickController = require('../controllers/index.js').CommentClick;

router.route('/')
  .post(CommentClickController.commentClick)

module.exports = router;