import React from 'react';
import axios from 'axios';

class AppWithAxios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: []
    }
    this.getSongs = this.getSongs.bind(this);
    this.handleVoteClick = this.handleVoteClick.bind(this);
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs() {
    axios.get('/api/topBeats')
      .then((results) => {
        this.setState({
          songs: results.data
        })
      })
      .catch((error) => {
        console.log('Error! getSongs on AppWithAxios.jsx', error);
      })
  }

  handleVoteClick(collab_id) {
    console.log('collab_id', collab_id);
    axios.post('/api/voteClick', {collaboration_id: collab_id})
      .then(result => console.log(result))
      .catch(error => console.log('Error! inside handleVoteClick AppWithAxios', error))
      this.getSongs();
  }

  render() {
    console.log('this.state.songs -> ', this.state.songs);
    return (
      <div>Collaborations
        {this.state.songs.map((song, i) => {
          return (
            <div>
            <h3>{song.name}</h3>
            <ul>
              <li>Beat Creator: {song.beatDisplay}</li>
              <li>Vocal Creator: {song.vocalDisplay}</li>
              <li>Vote Count: {song.count}</li>
            </ul>
            <button className="vote-button btn btn-warning" onClick={() => this.handleVoteClick(song.collaboration_id)}>
              Like
            </button>

            </div>
          )
        })}

      </div>
    )
  }
}

export default AppWithAxios;