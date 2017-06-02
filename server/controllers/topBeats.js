const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));
const db = require('../../db/index');

module.exports.getSongs = (req, res) => {
  db.getSongsFromDb(function(response, error) {
    if (error) {
      console.log('Error! getSongs inside controllers/topBeats', error);
    } else {
      res.status(200).send(response);
    }
  })
  // models.Profile.fetchAll()
  //   .then(songs => {
  //     res.status(200).send(songs);
  //   })
  //   .catch(err => {
  //     // This code indicates an outside service (the database) did not respond in time
  //     res.status(503).send(err);
  //   });
};