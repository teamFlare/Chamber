import React from 'react';
import axios from 'axios';

class AppWithAxios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: []
    }
    this.getSongs = this.getSongs.bind(this);

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
    console.log('this.state.songs -> ', this.state.songs);
    return (
      <div>AppWithAxios</div>
    )
  }
}

export default AppWithAxios;