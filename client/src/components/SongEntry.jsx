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
      playsong: false
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
          comments: results.data
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
          return (
            <div>
            <div>
              <div style={{'background-color': '#404040'}}>
                <h3 style={{'color': '#f2f2f2'}}>{this.props.song.name}</h3>
              </div>
            </div>
            {/*<div className="container-fluid">*/}
              <div style={{'background-color': '#404040'}}>
                <button  className="vote-button btn btn-danger" onClick={() => this.handleVoteClick(this.props.song.submission_id)}>
                Like
                </button>
                <ReactAudioPlayer style={{'color': 'yellow'}} src={this.props.song.link ? this.props.song.link : this.state.default} controls/>
              </div>
              <div style={{'background-color': '#404040'}}>
                <p style={{'color': '#f2f2f2',}}>Creator: {this.props.song.display}</p>
                <p style={{'color': '#ff66ff'}}>Likes: {this.props.song.count}</p>
              </div>
            {/*</div>*/}
            {/*<div className="container-fluid">*/}
              <div style={{'background-color': "white"}}>
                <input onChange={this.handleCommentTyping}></input>
                <button className="vote-button btn btn-warning" onClick={() => this.handleCommentClick(this.props.song.submission_id)}>submit comment</button>
              </div>
              <div>
                <h1 style={{'background-color': "white", "color": "#D9534F"}}>Comments:</h1>
                <div style={{'background-color': "white"}}>
                  {this.state.comments.map((comment) => {
                    return <div className="card" style={{'color': "black"}}>{comment.comment}</div>
                  })}
              </div>
            </div>
            </div>
            // </div>
          )
  }
}

export default SongEntry;