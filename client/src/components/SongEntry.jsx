import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';

class SongEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      default: 'http://dreamsupport.us/justin/Music/Beyonce%20Lemonade/01%20Pray%20You%20Catch%20Me.mp3',
      comment: '',
      comments: [],
      playsong: false, 
			numCom: ''
    }
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleCommentTyping = this.handleCommentTyping.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.getComments = this.getComments.bind(this);
    this.playSong = this.playSong.bind(this);
  }

  componentDidMount() {
    this.getComments();
  }


  handleVoteClick(collab_id) {
    console.log('collab_id', collab_id);
    axios.post('/api/voteClick', {collaboration_id: collab_id})
      .then(result => console.log(result))
      .catch(error => console.log('Error! inside handleVoteClick AppWithAxios', error))
  }

  handleCommentTyping(e) {
    e.preventDefault()
    this.setState({comment: e.target.value})
  }

  handleCommentClick(collab_id) {
    axios.post('/api/comment', {collaboration_id: collab_id, comment: this.state.comment})
      .then(result => console.log(result))
      .catch(error => console.log('Error! inside handleCommentClick AppWithAxios', error))
  }

  getComments() {
    axios.get('/api/commentRender', {params: {collab_id: this.props.song.submission_id}})
      .then((results) => {
        this.setState({
          comments: results.data,
					numCom: results.data.length
        })
      })
      .catch((error) => {
        console.log('Error! getSongs on SongEntry.jsx', error);
      })
  }

  playSong() {
    this.setState({playsong: !this.state.playsong});
  }

  render() {
    let usrPic = this.props.song.display?this.props.song.display:this.props.myName;
		return (
			<div className="container songListRow rcorners">		
        <div className="row">
					<h3 className="songTitle">{this.props.song.name}</h3>
				</div>	
				<div className="row">
					<ReactAudioPlayer src={this.props.song.link ? this.props.song.link : this.state.default} controls/>
					<button className="btn comBut btn-danger" onClick={() => this.handleVoteClick(this.props.song.submission_id)}>  
						<span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> Likes {this.props.song.count}
					</button>
					<button className="btn comBut btn-info" href="#">  
						<span className="glyphicon glyphicon-comment" aria-hidden="true"></span> Comments {this.state.numCom}
					</button>
          <p className="songCreator">By {usrPic}</p>
				</div>
				{/*<div>
					<input onChange={this.handleCommentTyping}></input>
					<button className="vote-button btn btn-warning" onClick={() => this.handleCommentClick(this.props.song.submission_id)}>submit comment</button>
				</div>*/}
				{/*<div>
					<h1>Comments:</h1>
					<div >
						{this.state.comments.map((comment) => {
							return <div className="card">{comment.comment}</div>
						})}
				</div>*/}			
      </div>

 		)
  }
}

export default SongEntry;