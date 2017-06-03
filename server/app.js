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
    accessKeyId: 'AKIAJTKICAWGNXC5OX6A',
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

// app.get('/api/songs', function (req, res) {
//   knex.select().table('submissions')
//   .then((songs)=>{
//     res.send(songs);
//   })
//   .catch((err)=>{
//     console.log(err);
//   });
// });

module.exports = app;
