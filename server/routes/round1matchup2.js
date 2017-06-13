const knex = require('knex')(require('../../knexfile.js'));
module.exports = function (req,res) {
  var tournamentQuery = knex.table('tournaments').innerJoin('round1', 'tournaments.round1_id', '=', 'round1.id').select('*','tournaments.name as tournamentname').as('tournamentTable');
  var matchup1Query = knex(tournamentQuery).innerJoin('matchup', 'matchup.id', '=', 'tournamentTable.matchup_id2').as('matchup1Table');
  var matchup1Profile1Query = knex(matchup1Query).join('profiles', 'matchup1Table.prof_id1','=', 'profiles.id').select('*','profiles.display as profile1name').as('matchup1profile1Table');
  var profile1songQuery = knex(matchup1Profile1Query).join('submissions', 'submissions.id','=', 'matchup1profile1Table.song_id1').select('*','submissions.name as profile1songname', 'submissions.link as profile1songlink', 'submissions.id as profile1songid').as('profile1songTable');
  var matchup1Profile2Query = knex(profile1songQuery).join('profiles', 'profile1songTable.prof_id2','=', 'profiles.id').select('*','profiles.display as profile2name').as('matchup1profile2Table');
  var profile2songQuery = knex(matchup1Profile2Query).join('submissions', 'submissions.id','=', 'matchup1profile2Table.song_id2').select('*','submissions.name as profile2songname', 'submissions.link as profile2songlink', 'submissions.id as profile2songid').as('profile2songTable')
    .then((songs)=>{
        knex.count('submission_id as profile1votecount').groupBy('submission_id').from('likes').where({'submission_id': songs[0].song_id1})
          .then((prof1count) => {songs[0].profile1count = prof1count[0].profile1votecount;
              knex.count('submission_id as profile2votecount').groupBy('submission_id').from('likes').where({'submission_id': songs[0].song_id2})
                  .then((prof2count) => {
                      songs[0].profile2count = prof2count[0].profile2votecount;
                      res.send(songs)
                  })
                  .catch((error) => console.log(error))
          }
          )
    })
    .catch((err)=>{
      console.log(err);
    });
}

