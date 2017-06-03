const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));
const db = require('../../db/index');

module.exports.commentClick = (req, res) => {
  var votesObject = {};
  votesObject.profile_id = req.user.id;
  votesObject.comment = req.body.comment;
  votesObject.collabs_id = req.body.collaboration_id;
  db.postCommentToDb(votesObject, function(response, error) {
    if (error) {
      console.log('Error! getSongs inside controllers/commentClick', error);
    } else {
      res.status(200).send('success');
    }
  })

};