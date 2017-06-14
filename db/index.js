const knex = require('knex')(require('../knexfile'));
const db = require('bookshelf')(knex);

db.plugin('registry');

function getSongsFromDb(callback) {
var likesQuery = knex.select().from('likes').distinct('profiles_id', 'submission_id').as('likesTable');
var orderedQuery = knex.select('submission_id').count('submission_id').from(likesQuery).groupBy('submission_id').orderByRaw('count(submission_id) desc').as('orderedTable');
var topBeats = knex(orderedQuery).innerJoin('submissions', 'orderedTable.submission_id', '=', 'submissions.id').where({'submissions.type':'beat'}).as('topbeatTable');

knex(topBeats).innerJoin('profiles', 'topbeatTable.profiles_id', '=', 'profiles.id').orderBy('count', 'desc')
    .then((response) => {
        // console.log(response)
        callback(response, null)
    })
    .catch((error) => {
        // console.log(error)
        callback(null, error)
    })
}

function getTopCollabsFromDb(callback) {
    // console.log('get collabs from db');
    var likesQuery = knex.select().from('likes').distinct('profiles_id', 'submission_id').as('likesTable');
    var orderedQuery = knex.select('submission_id').count('submission_id').from(likesQuery).groupBy('submission_id').orderByRaw('count(submission_id) desc').as('orderedTable');
    var topBeats = knex(orderedQuery).innerJoin('submissions', 'orderedTable.submission_id', '=', 'submissions.id').where({'submissions.type':'collab'}).as('topbeatTable');

    knex(topBeats).innerJoin('profiles', 'topbeatTable.profiles_id', '=', 'profiles.id').orderBy('count', 'desc')
        .then((response) => {
            // console.log(response)
            callback(response, null)
        })
        .catch((error) => {
            // console.log(error)
            callback(null, error)
        })
}

function getNewSongsFromDb(callback) {
    var likesQuery = knex.select().from('likes').distinct('profiles_id', 'submission_id').as('likesTable');
    var orderedQuery = knex.select('submission_id').count('submission_id').from(likesQuery).groupBy('submission_id').orderByRaw('count(submission_id) desc').as('orderedTable');
    var topBeats = knex(orderedQuery).innerJoin('submissions', 'orderedTable.submission_id', '=', 'submissions.id').as('topbeatTable');

    knex(topBeats).innerJoin('profiles', 'topbeatTable.profiles_id', '=', 'profiles.id').orderBy('topbeatTable.created_at', 'desc')
        .then((response) => {
            // console.log(response)
            callback(response, null)
        })
        .catch((error) => {
            // console.log(error)
            callback(null, error)
        })
}

function getSingleUserSongs(user, callback) {
    knex('submissions').where({profiles_id: user}).select('*')
        .then((response) => {
            // console.log(response)
            callback(response, null)
        })
        .catch((error) => {
            console.log(error)
            callback(null, error)
        })
}

function getCommentsFromDb(callback, collab_id) {
  knex('comments').where({submission_id: collab_id}).select('comment')
      .then((response) => {
        // console.log(response)
          callback(response, null)
      })
      .catch((error) => {
          callback(null, error)
      })
}

function postVoteToDb(voteObject, callback) {
  knex('likes').insert({profiles_id: voteObject.profile_id, submission_id: voteObject.collabs_id})
    .then(result => console.log(result))
    .catch(error => console.log(error))
}

function postCommentToDb(voteObject, callback) {
  knex('comments').insert({profiles_id: voteObject.profile_id, submission_id: voteObject.collabs_id, comment: voteObject.comment})
    .then(result => console.log(result))
    .catch(error => console.log(error))
}

module.exports = db;
module.exports.postVoteToDb = postVoteToDb;
module.exports.getSongsFromDb = getSongsFromDb;
module.exports.postCommentToDb = postCommentToDb;
module.exports.getCommentsFromDb = getCommentsFromDb;
module.exports.getTopCollabsFromDb = getTopCollabsFromDb;
module.exports.getNewSongsFromDb = getNewSongsFromDb;
module.exports.getSingleUserSongs = getSingleUserSongs;
