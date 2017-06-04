import React from 'react';
import ReactDOM from 'react-dom';
let axios = require('axios');
import ReactAudioPlayer from 'react-audio-player';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import SongList from './SongList.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      songs1: [],
      current: ''
    };
    axios.get('/api/topBeats')
      .then((response)=> {
        // console.log(response);
        // let songArr = [];
        // for (var i = 0; i < response.data.length; i++) {
        //   songArr.push(response.data[i]);
        // }
        this.setState({songs: response.data});
        // console.log(songArr);
      })
      .catch((error)=> {
        console.log(error);
      });
    this.handleSongPick = this.handleSongPick.bind(this);
  }

  onDrop(files) {
    superagent.post('/upload')   
    .attach('theseNamesMustMatch', files[0])
    .end((err, res) => {
      if (err) { console.log(err, "hey bro thieres a huge error"); }
      alert('File uploaded!');
    });
  }

  handleSongPick(song) {
    this.setState({current: song});
  }

  render () {
    let currentSong = this.state.current 
      ? this.state.current.link
      : 'http://dreamsupport.us/justin/Music/Beyonce%20Lemonade/01%20Pray%20You%20Catch%20Me.mp3';

    return (
      <div>
        <h1>Upload file</h1>
        <Dropzone onDrop={this.onDrop}/>
      </div>
    );
  }
}

export default Profile;