const knex = require('knex')(require('./knexfile.js'));
const db = require('bookshelf')(knex);
const Submissions = require('./Submissions.json');
const Likes = require('./Likes.json');
const Profiles = require('./Profiles.json')
const Comments = require('./Comments.json')

for(var i = 0;i < Profiles.length;i++){
  knex('profiles').insert({first: Profiles[i].first, last: Profiles[i].last, display: Profiles[i].display, email: Profiles[i].email, phone: Profiles[i].phone})
    .then(result => console.log(result))
    .catch(error => console.log(error))
}

for(var i = 0;i < Submissions.length;i++){
  knex('submissions').insert({name: Submissions[i].name, profiles_id: Submissions[i].profiles_id, type: Submissions[i].type, tempo: Submissions[i].tempo, link: Submissions[i].link})
    .then(result => console.log(result))
    .catch(error => console.log(error))
}

for(var i = 0;i < Likes.length;i++){
  knex('likes').insert({profiles_id: Likes[i].profiles_id, submission_id: Likes[i].submission_id})
    .then(result => console.log(result))
    .catch(error => console.log(error))
}

for(var i = 0;i < Comments.length;i++){
  knex('comments').insert({profiles_id: Comments[i].profiles_id, comment: Comments[i].comment, submission_id: Comments[i].submission_id})
    .then(result => console.log(result))
    .catch(error => console.log(error))
}



