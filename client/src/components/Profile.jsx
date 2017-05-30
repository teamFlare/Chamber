import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import Sound from 'react-sound';
import ReactAudioPlayer from 'react-audio-player';
import fs from 'fs';
import createFile from 'create-file';
// var createFile = require('create-file');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        file: [],
        async: false
    };

    this.onDrop.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    this.setState({file: acceptedFiles})
    //   createFile('./', acceptedFiles, function (err) {
    //     console.log(err)
    //   });
    // fs.writeFileSync('song.txt', acceptedFiles, function (err) {
    //     if(err) {console.log(err)}
    // })
    //   console.log(acceptedFiles)
    setTimeout(() => console.log('this.state.file',this.state.file), 1000)
  }

  render() {
    console.log(this.state.async)
    return (
      <div> 
        <div onClick={() => this.setState({async: true})}>Profile</div>
        <div>Upload a Beat Below</div>
        <Dropzone onDrop={this.onDrop}></Dropzone>
        {!this.state.async ? <ReactAudioPlayer src='../../client/src/components/No Eyes.mp3' autoplay controls/> : <ReactAudioPlayer src={this.state.file[0]} autoPlay controls/>}
      </div>
    )
  }
}

export default Profile;