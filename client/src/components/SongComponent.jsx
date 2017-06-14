import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import SongEntry from './SongEntry.jsx'

class SongComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: [],
      newSong: {},
      numVote: 0,
      numCom: 0
    }
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleCommentTyping = this.handleCommentTyping.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getNewSongs = this.getNewSongs.bind(this);
  }

  componentDidMount() {
    this.getNewSongs(this.props.params.songname);
  }
  
  getNewSongs(song_id) {
    axios.get('/singleSong/'+song_id)
    .then((results) => { 
      console.log("HEYYY THIS IS THE NEW SHI",results.data)
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
        console.log(this.state.numVote, "NUMBER OF VOTES MIGHT BE IN STRINg");
        let votePlus = this.state.numVote + 1;
        this.setState({numVote: votePlus});
      })
      .catch((error) => {console.log('Error! inside handleVoteClick AppWithAxios', error)})
  }

  handleCommentClick(collab_id) {
    axios.post('/api/comment', {collaboration_id: collab_id, comment: this.state.comment})
      .then(result => console.log(result))
      .catch(error => console.log('Error! inside handleCommentClick AppWithAxios', error))
  }

  getComments() {
    axios.get('/api/commentRender', {params: {collab_id: this.state.newSong.submission_id}})
      .then((results) => {
        this.setState({
          comments: results.data
        })
      })
      .catch((error) => {
        console.log('Error! getSongs on SongEntry.jsx', error);
      })
  }

  

  render() {
    return (
      <div>
        <h1>SongCom</h1>
          <div className="container songListRow rcorners">		
        <div className="row">
					<h3 className="songTitle">{this.state.newSong.name}</h3>
				</div>	
				<div className="row">
					<ReactAudioPlayer src={this.state.newSong.link ? this.state.newSong.link : this.state.default} controls/>
					<button className="btn comBut btn-danger" onClick={() =>{ this.handleVoteClick(this.state.newSong.submission_id)}}>  
						<span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> Likes {this.state.numVote}
					</button>
					<button className="btn comBut btn-info" href="#">  
						<span className="glyphicon glyphicon-comment" aria-hidden="true"></span> Comments {this.state.numCom}
					</button>
          <p onClick={()=>{this.handleProfileSongClick(this.state.newSong.profiles_id)}}className="songCreator">By {this.state.newSong.display}</p>
				</div>
				<div>
					<input onChange={this.handleCommentTyping}></input>
					<button className="vote-button btn btn-warning" onClick={() => this.handleCommentClick(this.state.newSong.submission_id)}>submit comment</button>
				</div>
				<div>
					<h1>Comments:</h1>
					<div >
						{this.state.comments.map((comment) => {
							return <div className="card">{comment.comment}</div>
						})}
				</div>		
      </div>  
      </div>
      </div>
    )
  }
}

export default SongComponent;