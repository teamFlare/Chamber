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
      newSong: [],
      numVote: 0,
      numCom: 0
    }
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleCommentTyping = this.handleCommentTyping.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getNewSongs = this.getNewSongs.bind(this);
  }

  componentWillMount() {
    this.getNewSongs(this.props.params.songname);
  }
  
  getNewSongs(song_id) {
    axios.get('/userSongs/'+song_id)
    .then((results) => { 
      this.setState({
        newSongs: results.data
      });
      console.log(this.state.newSongs);
      this.getComments();
    })
    .catch((error) => {
      console.log('Error! getSongs on SongComponent.jsx', error);
    })
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
    let songToMap = this.state.newSongs.length>0 ? this.state.newSongs[0] : []
          return (
            <div>
              <h1>SongCom</h1>
              {this.state.newSongs[0].map(song => {
                <SongEntry song={songToMap}/>
                  })}         
            </div>
          )
  }
}

export default SongComponent;