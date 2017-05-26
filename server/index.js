'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.port || 8080;

app.listen(PORT, () => {
  console.log('Example app listening on port 8080!');
});
