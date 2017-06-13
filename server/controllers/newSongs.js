const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));
const db = require('../../db/index');

module.exports.getNewSongs = (req, res) => {
  db.getNewSongsFromDb(function(response, error) {
    if (error) {
      console.log('Error! getSongs inside controllers/newSongs', error);
    } else {
      res.status(200).send(response);
    }
  })

};