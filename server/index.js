'use strict';
const app = require('./app');
const db = require('../db');
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Example app listening on port 8080!');
});
