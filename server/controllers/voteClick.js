const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));
const db = require('../../db/index');

module.exports.voteClick = (req, res) => {
  console.log('hit vote click');
  var votesObject = {};
  votesObject.profile_id = req.user.id;
  votesObject.collabs_id = req.body.collaboration_id;
  db.postVoteToDb(votesObject, function(err, result) {
    if (err) {
      console.log('Error! getSongs inside controllers/postVote', err);
      res.status(500).send("You done messed up voting");
    } else {
      res.status(200).send('success: voting', result);
    }
  })

};

