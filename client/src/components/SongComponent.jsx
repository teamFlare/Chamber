import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import SongEntry from './SongEntry.jsx';
import UserAvatar from 'react-user-avatar';
import {browserHistory} from 'react-router';

class SongComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:'',
      comment: '',
      comments: [],
      newSong: {},
      numVote: 0,
      numCom: 0,

    }
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleCommentTyping = this.handleCommentTyping.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getNewSongs = this.getNewSongs.bind(this);
    console.log(this.props)
  }

  componentDidMount() {
    this.getNewSongs(this.props.params.songname);
    this.getRandomImage();
    this.getUserInfo();
  }

  handleProfileSongClick(str) {
    browserHistory.push('/profile/'+str);
  }

  getUserInfo() {
    axios.get('/currentUser')
    .then((response) => {
      console.log("THIS IS THE RESPONSE!!", response.data)
      this.setState({userName: response.data.display, userId: response.data.id});
    })
    .catch((error) => {
      console.log(error);
    });
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
  
  getNewSongs(song_id) {
    axios.get('/singleSong/'+song_id)
    .then((results) => { 
      this.setState({
        newSong: results.data[0]
      });
      this.setState({numVote: parseInt(this.state.newSong.count)});
      this.getComments();
    })
    .catch((error) => {
      console.log('Error! getNewSongs on SongComponent.jsx', error);
    })
  }

  handleCommentTyping(e) {
    e.preventDefault()
    this.setState({comment: e.target.value})
  }

  handleVoteClick(collab_id) {
    axios.post('/api/voteClick', {collaboration_id: collab_id})
      .then((result) => {
        console.log(result);
        this.getVotes();
      })
      .catch((error) => {console.log('Error! inside handleVoteClick AppWithAxios', error)})
  }

  getVotes() {
    axios.get('/singleVote', {params: {collab_id: this.state.newSong.submission_id}})
      .then((results) => {
        this.setState({
					numVote: results.data[0].count
        })
      })
      .catch((error) => {
        console.log('Error! getSongs on SongEntry.jsx', error);
      })
  }

  handleCommentClick(collab_id) {
    console.log("Reached handleComment")
    axios.post('/api/comment', {collaboration_id: this.state.newSong.submission_id, comment: this.state.comment})
      .then((result) => {
        console.log("abbout to handle comment")
        this.getComments();
      })
      .catch(error => console.log('Error! inside handleCommentClick AppWithAxios', error));
  }

  getComments() {
    console.log("inGetComments")
    axios.get('/api/commentRender', {params: {collab_id: this.state.newSong.submission_id}})
      .then((results) => {
        this.setState({
          comments: results.data
        })
        console.log("Changed state!!");
      })
      .catch((error) => {
        console.log('Error! getSongs on SongEntry.jsx', error);
      })
  }

  handleSongClick(str) {
     browserHistory.push('/singleSong/'+str);
  }
  

  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron row">
        <h1 className="commentTitle row col-xs-12">{this.state.newSong.name}</h1>
        <h3 className="row col-xs-12 commentTitle cursorPoint" onClick={()=>{this.handleProfileSongClick(this.state.newSong.profiles_id)}}>By {this.state.newSong.display}</h3>
      </div>
			<div className="container">
				<ReactAudioPlayer className="row col-xs-12" src={this.state.newSong.link ? this.state.newSong.link : this.state.default} controls/>
      </div>      
      <div className="container">
        <div className="row likeComButton">
          <button className="btn  btn-danger col-xs-12" onClick={() =>{ this.handleVoteClick(this.state.newSong.submission_id)}}>  
            <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> Likes {this.state.numVote}
          </button>
        </div>
			  <div className="row col-xs-12">
          <span className="userCircle1 col-xs-2 " onClick={()=>{this.handleProfileSongClick(this.state.userId)}}><UserAvatar className="cursorPoint hvr-grow" size="48" name={this.state.userName ? this.state.userName : "Prateek Bhatt"}/></span>
					<input placeholder="Share your thoughts" className="col-xs-8 inputStyle" onChange={this.handleCommentTyping}></input>
					<button className="vote-button btn btn-info col-xs-2 btnStyle" onClick={()=>{this.handleCommentClick()}}>submit comment</button>
				</div>
      </div>
			<div className="container">
				<h1 className="row col-xs-12 col-md-12 commentTitle">Comments:</h1>
				<div className="">
					{this.state.comments.map((comment) => {
					  return (
              <div className="border round-xlarge row">
                <div className=" row col-xs-12">
                  <span className="userCircle col-xs-4" onClick={()=>{this.handleProfileSongClick(comment.profiles_id)}}><UserAvatar className="hvr-grow cursorPoint" size="48" name={comment.display}/></span>
                  <h4 className="userComment">{comment.comment}</h4>
                </div>
                <div className="row"> 
                  <h4 className="commentUserName">{comment.display}</h4>
                </div>
              </div>)
          })}
				  </div>		
      </div> 
      </div> 
     
    )
  }
}

export default SongComponent;