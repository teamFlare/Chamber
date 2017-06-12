import React from 'react';
import ReactDOM from 'react-dom';
let axios = require('axios');
import ReactAudioPlayer from 'react-audio-player';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import SongList from './SongList.jsx';
import NoSongs from './NoSongs.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };   
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    superagent.post('/upload')   
    .attach('theseNamesMustMatch', files[0])
    .end((err, res) => {
      if (err) { console.log(err, "hey bro thieres a huge error"); }
      alert('File uploaded!');
    });
  }

  render () {
    return (
    	<div className="userProfileTitle">
      	<h1>Upload a Sound</h1>
        <Dropzone onDrop={()=>{this.onDrop}}/>
      </div>
    );
  }
}

export default Profile;
