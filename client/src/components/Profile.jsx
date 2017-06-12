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
  }

  onDrop(files) {
    superagent.post('/upload')   
    .attach('theseNamesMustMatch', files[0])
    .end((err, res) => {
      if (err) { console.log(err, "hey bro thieres a huge error"); }
      alert('File uploaded!');
    });
  }

  componentDidMount() {
 
    this.getRandomImage();
    this.getUserInfo();
    this.getUserSongs();
  
  
  }

  getRandomImage() {
      axios.get('https://randomuser.me/api/')
      .then((response) => {
        console.log("This is the image response", response);
				this.setState({userImage: response.data.results[0].picture.large})
      })
      .catch((err) => {
				console.log("This is the image response ERRORRER", err);
      });
  }

  getUserInfo() {
      axios.get('/loginInfo')
      .then((response) => {
        this.setState({userName: response.data.display});
        // this.getUserSongs();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUserSongs() {
    axios.get('/userSongs')
    .then((response) => {
      console.log("USER DATA RESPONSE:", response)
      this.setState({userSongs: response.data});
      console.log(this.state.userSongs, "USER SONGS");
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
    
    let renderThis = this.state.userSongs.length>0 ? <SongList myName={this.state.userName} songs={this.state.userSongs}/> : <NoSongs/>
    if (this.state.redirect) {
    return <Redirect push to="/sample" />;
    }
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
        {renderThis}
        <div className="uploadBut">
          <Link className="linkWithinButton" to="/upload">Upload a Sound</Link>
				</div>
      </div>
    );
  }
}

export default Profile;
