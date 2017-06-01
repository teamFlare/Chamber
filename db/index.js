const knex = require('knex')(require('../knexfile'));
const db = require('bookshelf')(knex);

db.plugin('registry');

// var beatsQuery = knex.table('likes').innerJoin('submissions', 'likes.submission_id', '=', 'submissions.id').where({'submissions.type':'beat'}).as('beatsTable');
// var orderedQuery = knex.select('submission_id').count('submission_id').from(beatsQuery).groupBy('submission_id').orderByRaw('count(distinct submission_id) desc limit 5').as('orderedTable');
// var topBeats = knex(orderedQuery).innerJoin('submissions', 'orderedTable.submission_id', '=', 'submissions.id').as('topbeatTable');

// knex(topBeats).innerJoin('profiles', 'topbeatTable.profiles_id', '=', 'profiles.id')
//     .then((response) => {
//         console.log(response)
//     })
//     .catch((error) => {
//         console.log(error)
//     })

var collabsQuery = knex.table('likes').innerJoin('collaborations', 'likes.collaboration_id', '=', 'collaborations.id').as('collabsTable');
var orderedQuery = knex.select('collaboration_id').count('collaboration_id').from(collabsQuery).groupBy('collaboration_id').orderByRaw('count(distinct collaboration_id) desc limit 5').as('orderedTable');
var topCollabs = knex(orderedQuery).innerJoin('collaborations', 'orderedTable.collaboration_id', '=', 'collaborations.id').as('topcollabTable');

knex(topCollabs).innerJoin('submissions', 'topcollabTable.beat_id', '=', 'submissions.id')
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })

// var usersubmittedQuery = knex.table('likes').innerJoin('userSubmittedSongs', 'likes.collaboration_id', '=', 'userSubmittedSongs.id').as('usersubmittedTable');
// var orderedQuery = knex.select('usersubmitted_id').count('usersubmitted_id').from(usersubmittedQuery).groupBy('usersubmitted_id').orderByRaw('count(distinct usersubmitted_id) desc limit 5').as('orderedTable');
// var topUserSubmitted = knex(orderedQuery).innerJoin('userSubmittedSongs', 'orderedTable.collaboration_id', '=', 'userSubmittedSongs.id').as('topuserTable')
// knex(topUserSubmitted).innerJoin('profiles', 'topuserTable.profiles_id', '=', 'profiles.id')
//     .then((response) => {
//         console.log(response)
//     })
//     .catch((error) => {
//         console.log(error)
//     })



module.exports = db;

