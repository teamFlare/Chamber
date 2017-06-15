import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import SongList from './SongList.jsx';
import NoSongs from './NoSongs.jsx';
import Uploads from './Uploads.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
			userImage: '',
      userSongs: [],
      redirect: false
    };   
    this.handleSongPick = this.handleSongPick.bind(this);
    this.getRandomImage = this.getRandomImage.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserSongs = this.getUserSongs.bind(this);
    console.log("THESE ARE THE PROPSPSPSPSPSP",this.props);
  }

  onDrop(files) {
    superagent.post('/upload')   
    .attach('theseNamesMustMatch', files[0])
    .end((err, res) => {
      if (err) { console.log(err, "Error! onDrop in Profile.jsx"); }
      alert('File uploaded!');
    });
  }

  componentDidMount() {
    this.getRandomImage();
    this.getUserInfo(this.props.params.user_id);
    this.getUserSongs(this.props.params.user_id);
  }

  getRandomImage() {
      axios.get('https://randomuser.me/api/')
      .then((response) => {
				this.setState({userImage: response.data.results[0].picture.large})
      })
      .catch((err) => {
				console.log("This is the image response ERRORRER", err);
      });
  }

  getUserInfo(user_id) {
      axios.get('/profileName/'+ user_id)
      .then((response) => {
        this.setState({userName: response.data[0].display});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUserSongs(user_id) {
    axios.get('/userSongs/'+ user_id)
    .then((response) => {
      this.setState({userSongs: response.data});
    })
    .catch((error) => {
      console.log(error);
    }); 
  }    

  handleSongPick(song) {
    this.setState({current: song});
  }

  handleNextPage() {
    this.setState({redirect: truth});
  }

  render () {
    let currentSong = this.state.current 
      ? this.state.current.link
      : 'http://dreamsupport.us/justin/Music/Beyonce%20Lemonade/01%20Pray%20You%20Catch%20Me.mp3';
    
    return (
      <div className="container-fluid">
				<div className="jumbotron">
					<div className="row">
            <h3 className="col-md-12 userName">{this.state.userName}'s Stream</h3>
					</div>
					<img className="img-fluid img-responsive bioImages" src={this.state.userImage}/>
				</div>
        <div className="row col-12 userProfileTitle">
          <h1 className="userUploadsTitle">Uploads</h1>
        </div>
        <SongList myName={this.state.userName} songs={this.state.userSongs}/>
      </div>
    );
  }
}

export default Profile;
