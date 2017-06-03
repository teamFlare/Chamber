import React from 'react';
import axios from 'axios';
import SongEntry from './SongEntry.jsx';

class AppWithAxios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: []
    }
    this.getSongs = this.getSongs.bind(this);
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

  render() {
    return (
      <div>Submissions
        {this.state.songs.map((song, i) => {
          return (
            <SongEntry song={song}/>
          )
        })}

      </div>
    )
  }
}

export default AppWithAxios;