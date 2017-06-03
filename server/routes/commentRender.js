'use strict';
const express = require('express');
const router = express.Router();
const CommentRenderController = require('../controllers').CommentRender;

router.route('/')
  .get(CommentRenderController.commentRender)

module.exports = router;