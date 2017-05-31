const knex = require('knex')(require('../knexfile'));
const db = require('bookshelf')(knex);

db.plugin('registry');

var beatsQuery = knex.table('likes').innerJoin('submissions', 'likes.submission_id', '=', 'submissions.id').where({'submissions.type':'beat'}).as('beatsTable');
var orderedQuery = knex.select('submission_id').count('submission_id').from(beatsQuery).groupBy('submission_id').orderByRaw('count(distinct submission_id) desc limit 5').as('orderedTable');

knex(orderedQuery).innerJoin('submissions', 'orderedTable.submission_id', '=', 'submissions.id')
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })

var collabsQuery = knex.table('likes').innerJoin('collaborations', 'likes.collaboration_id', '=', 'collaborations.id').as('collabsTable');
var orderedQuery = knex.select('collaboration_id').count('collaboration_id').from(collabsQuery).groupBy('collaboration_id').orderByRaw('count(distinct collaboration_id) desc limit 5').as('orderedTable');

knex(orderedQuery).innerJoin('collaborations', 'orderedTable.collaboration_id', '=', 'collaborations.id')
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })



module.exports = db;

