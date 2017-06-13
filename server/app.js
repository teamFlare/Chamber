'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
var AWS = require('aws-sdk');
var multer = require('multer');
var fs = require('fs');
const url = require('url');
var File = require('file');
var cors = require('cors');
var db = require('../db/index.js');
const knex = require('knex')(require('../knexfile.js'));

//modularized stuff 
const round1matchup1 = require('./routes/round1matchup1');
const round1matchup2 = require('./routes/round1matchup2');
const round1matchup3 = require('./routes/round1matchup3');
const round1matchup4 = require('./routes/round1matchup4');
const round2matchup1 = require('./routes/round2matchup1');
const round2matchup2 = require('./routes/round2matchup2');
const round3matchup1 = require('./routes/round3matchup1');


const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

AWS.config.update(
  {
    accessKeyId: 'AKIAINTNVRLUHO6R3HSQ',
    secretAccessKey: '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',
    // region: 'us-west-2'
  });
  
const s3 = new AWS.S3({region: 'us-west-2'});

const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 524288000 },
});

app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);
app.use('/api/topBeats', routes.topBeats);
app.use('/api/topCollabs', routes.topCollabs);
app.use('/api/newSongs', routes.newSongs);
app.use('/api/voteClick', routes.voteClick);
app.use('/api/comment', routes.commentClick);
app.use('/api/commentRender', routes.commentRender);



app.post('/upload', upload.single('theseNamesMustMatch'), (req, res) => {
  // req.file is the 'theseNamesMustMatch' file
  console.log(req.file);
  var params = {
    Bucket: 'elasticsongstalk', 
    Body: req.file.buffer,
    Key: req.file.originalname,
    ACL: 'public-read-write', // your permisions 
  };
  s3.upload(params, (err, data) => {
    if(err){
      console.log("ERRRORORR", err);
      res.status(500).send("We messed up in s3 upload.");
    // }else{
    //   res.status(200).send("s3 upload was succexful")
    // }
    }else{
      knex('submissions').insert({name: req.file.originalname, profiles_id: req.user.id, type: 'beat', tempo: 98, link: data.Location})
      .then(()=>{
        console.log("DB UPDATED");
        res.status(200).send("Database updated!");
      })
      .catch((err)=>{
        console.log("DB FAILED", err);
        res.status(500).send("Database update failed!");
      });
    }
  });
});

app.get('/loginInfo', (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

app.get('/userSongs', (req, res) => {
  // db.getSingleUserSongs(req.user.id, (err, results)=>{
  //   if(err){
  //     res.send("Error getting single user data", err);
  //   }
  //   res.status(200).send("We got the da")
  // })
  knex('submissions').where({profiles_id: req.user.id})
        .then((response) => {
            // console.log(response)
            console.log("Getting user DATA!!", response);
            res.status(200).send(response);
        })
        .catch((error) => {
            console.log("Getting single user data failed!", error)
            res.status(500).send("Database update failed!");
        })
});

// app.get('/api/songs', function (req, res) {
//   knex.select().table('submissions')
//   .then((songs)=>{
//     res.send(songs);
//   })
//   .catch((err)=>{
//     console.log(err);
//   });
// });
app.post('/uploadround1', upload.single('theseNamesMustMatch'), (req, res) => {
  // req.file is the 'theseNamesMustMatch' file
  console.log(req.file);
  var params = {
    Bucket: 'elasticsongstalk', 
    Body: req.file.buffer,
    Key: req.file.originalname,
    ACL: 'public-read-write', // your permisions 
  };
  s3.upload(params, (err, data) => {
    if(err){
      console.log("ERRRORORR", err);
      res.status(500).send("We messed up in s3 upload.");
    // }else{
    //   res.status(200).send("s3 upload was succexful")
    // }
    }else{
      knex('submissions').insert({name: req.file.originalname, profiles_id: req.user.id, type: 'beat', tempo: 98, link: data.Location})
      .then((response)=>{
        // console.log("DB UPDATED NIK YA DONE DID IT BABY", response);
        knex('submissions').select('id').where({name: req.file.originalname})
          .then((id) => {
            knex('round1').where({'id': 1}).update({'name': 'placeholder', 'round1_beat': id[0].id})
              .then(() => {
                console.log('did it')
              })
              .catch((error) => {
                console.log(error)
              })
          })
        res.status(200).send("Database updated!");
      })
      .catch((err)=>{
        console.log("DB FAILED", err);
        res.status(500).send("Database update failed!");
      });
    }
  });
});

app.post('/competitorUpload', upload.single('theseNamesMustMatch'), (req, res) => {
  // req.file is the 'theseNamesMustMatch' file
  var profileArray =[];
  console.log(req.file);
  var params = {
    Bucket: 'elasticsongstalk', 
    Body: req.file.buffer,
    Key: req.file.originalname,
    ACL: 'public-read-write', // your permisions 
  };
  knex.select().table('matchup')
    .then((response) => {
      for(var i = 0;i < response.length;i++) {
        profileArray.push(response[i].prof_id1)
      }
      for(var i = 0;i < response.length;i++) {
        profileArray.push(response[i].prof_id2)
      }
    })
  s3.upload(params, (err, data) => {
    if(err){
      console.log("ERRRORORR", err);
      res.status(500).send("We messed up in s3 upload.");
    // }else{
    //   res.status(200).send("s3 upload was succexful")
    // }
    } else if (req.user.id in profileArray){
      knex('submissions').insert({name: req.file.originalname, profiles_id: req.user.id, type: 'beat', tempo: 98, link: data.Location})
      .then((response)=>{
        // console.log("DB UPDATED NIK YA DONE DID IT BABY", response);
        knex('submissions').select('id').where({name: req.file.originalname, profiles_id: req.user.id})
          .then((id) => {
            knex('matchup').where({'prof_id2': req.user.id}).update({'song_id2': id[0].id})
              .then(() => {
                knex('likes').insert({'profiles_id': req.user.id, 'submission_id': id[0].id})
                  .then(() => console.log('we done did it baby'))
              })
            knex('matchup').where({'prof_id1': req.user.id}).update({'song_id1': id[0].id})
              .then(() => {
                knex('likes').insert({'profiles_id': req.user.id, 'submission_id': id[0].id})
                  .then(() => console.log('we done did it baby'))
              })
              .catch((error) => {
                console.log(error)
              })
          })
        res.status(200).send("Database updated!");
      }) 
      .catch((err)=>{
        console.log("DB FAILED", err);
        res.status(500).send("Database update failed!");
      });
    } else {
        res.status(500).send('not a competitor uploading')
      }
  });
});

app.post('/uploadround2', upload.single('theseNamesMustMatch'), (req, res) => {
  // req.file is the 'theseNamesMustMatch' file
  console.log(req.file);
  var params = {
    Bucket: 'elasticsongstalk', 
    Body: req.file.buffer,
    Key: req.file.originalname,
    ACL: 'public-read-write', // your permisions 
  };
  s3.upload(params, (err, data) => {
    if(err){
      console.log("ERRRORORR", err);
      res.status(500).send("We messed up in s3 upload.");
    // }else{
    //   res.status(200).send("s3 upload was succexful")
    // }
    }else{
      knex('submissions').insert({name: req.file.originalname, profiles_id: req.user.id, type: 'beat', tempo: 98, link: data.Location})
      .then((response)=>{
        // console.log("DB UPDATED NIK YA DONE DID IT BABY", response);
        knex('submissions').select('id').where({name: req.file.originalname})
          .then((id) => {
            knex('round2').insert({'id': 1, 'name': 'placeholder', 'round2_beat': id[0].id})
              .then(() => {
                console.log('did it')
              })
              .catch((error) => {
                console.log(error)
              })
          })
        res.status(200).send("Database updated!");
      })
      .catch((err)=>{
        console.log("DB FAILED", err);
        res.status(500).send("Database update failed!");
      });
    }
  });
});

app.post('/uploadround3', upload.single('theseNamesMustMatch'), (req, res) => {
  // req.file is the 'theseNamesMustMatch' file
  console.log(req.file);
  var params = {
    Bucket: 'elasticsongstalk', 
    Body: req.file.buffer,
    Key: req.file.originalname,
    ACL: 'public-read-write', // your permisions 
  };
  s3.upload(params, (err, data) => {
    if(err){
      console.log("ERRRORORR", err);
      res.status(500).send("We messed up in s3 upload.");
    // }else{
    //   res.status(200).send("s3 upload was succexful")
    // }
    }else{
      knex('submissions').insert({name: req.file.originalname, profiles_id: req.user.id, type: 'beat', tempo: 98, link: data.Location})
      .then((response)=>{
        // console.log("DB UPDATED NIK YA DONE DID IT BABY", response);
        knex('submissions').select('id').where({name: req.file.originalname})
          .then((id) => {
            knex('round3').insert({'id': 1, 'name': 'placeholder', 'round3_beat': id[0].id})
              .then(() => {
                console.log('did it')
              })
              .catch((error) => {
                console.log(error)
              })
          })
        res.status(200).send("Database updated!");
      })
      .catch((err)=>{
        console.log("DB FAILED", err);
        res.status(500).send("Database update failed!");
      });
    }
  });
});

app.get('/round1matchup1', function (req, res) {
  round1matchup1(req,res);
});

app.get('/round1matchup2', function (req, res) {
  round1matchup2(req,res);
});

app.get('/round1matchup3', function (req, res) {
  round1matchup3(req,res);
});

app.get('/currentuser', function(req, res) {
  res.send(req.user)
})

app.get('/round1matchup4', function (req, res) {
  round1matchup4(req,res);
});

app.get('/round2matchup1', function (req, res) {
  round2matchup1(req,res);
});

app.get('/round2matchup2', function (req, res) {
  round2matchup2(req,res);
});

app.get('/round3matchup1', function (req, res) {
  round3matchup1(req,res);
});

app.post('/submitTournament', function(req,res) {
  submitTournament(req,res);
})

app.post('/insertRound21', function(req,res) {
  knex('matchup').insert({'id': 5, 'name': 'placeholder', 'prof_id1': req.body.profile_id, 'song_id1': 1})
    .then((result) => res.send('worked'))
    .catch((error) => console.log(error))
})

app.post('/insertRound22', function(req,res) {
  knex('matchup').where({'id': 5}).update({'prof_id2': req.body.profile_id, 'song_id2': 1})
    .then((result) => res.send('worked'))
    .catch((error) => console.log(error))
})

app.post('/insertRound23', function(req,res) {
  knex('matchup').insert({'id': 6, 'name': 'placeholder', 'prof_id1': req.body.profile_id, 'song_id1': 1})
    .then((result) => res.send('worked'))
    .catch((error) => console.log(error))
})

app.post('/insertRound24', function(req,res) {
  knex('matchup').where({'id': 6}).update({'prof_id2': req.body.profile_id, 'song_id2': 1})
    .then((result) => res.send('worked'))
    .catch((error) => console.log(error))
})

app.post('/round2post', function(req,res) {
  console.log('steve said put this here')
  knex('round2').where({'id': 1}).update({'matchup_id1': 5, 'matchup_id2': 6})
    .then(() => {
      console.log('we are in the first knex call')
      knex('tournaments').where({'id': 1}).update({'round2_id': 1})
        .then(() => res.send('worked'))
    })
    .catch((error) => console.log(error))
})

app.post('/insertRound31', function(req,res) {
  knex('matchup').insert({'id': 7, 'name': 'placeholder', 'prof_id1': req.body.profile_id, 'song_id1': 1})
    .then((result) => res.send('worked'))
    .catch((error) => console.log(error))
})

app.post('/insertRound32', function(req,res) {
  knex('matchup').where({'id': 7}).update({'prof_id2': req.body.profile_id, 'song_id2': 1})
    .then((result) => res.send('worked'))
    .catch((error) => console.log(error))
})

app.post('/round3post', function(req,res) {
  knex('round3').where({'id': 1}).update({'matchup_id1': 7})
    .then(() => {
      knex('tournaments').where({'id': 1}).update({'round3_id': 1})
        .then(() => res.send('worked'))
    })
    .catch((error) => console.log(error))
})
module.exports = app;