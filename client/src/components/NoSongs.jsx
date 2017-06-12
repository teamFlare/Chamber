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
  }


  render () {
    return (
    	<div className="userProfileTitle">
      	<h1>No Songs Uploaded...</h1>
      </div>
    );
  }
}

export default Profile;
