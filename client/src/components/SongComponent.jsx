import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';

class SongComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  // componentDidMount() {
  //   this.getComments();
  // }


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
              <h1>The Sickness</h1>
            </div>
          )
  }
}

export default SongComponent;