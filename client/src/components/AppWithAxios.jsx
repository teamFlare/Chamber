import React from 'react';
import axios from 'axios';
import SongList from './SongList.jsx';
import Profile from './Profile.jsx';
import Header from './Header.jsx';
import { Link } from 'react-router';

class AppWithAxios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      pageToDisplay: 'SongList'
    }
    this.getSongs = this.getSongs.bind(this);
    this.handleDisplayChange = this.handleDisplayChange.bind(this);
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

  handleDisplayChange() {
    let display = this.state.pageToDisplay;
    if (display === 'SongList') {
      this.setState({pageToDisplay : 'Profile'});
    } else if (display === 'Profile') {
      this.setState({pageToDisplay: 'SongList'})
    }
  }

  render() {
    let PageToDisplay = SongList;
    let display = this.state.pageToDisplay;
    if (display === 'Profile') {
      PageToDisplay = Profile;
    } else if (display === 'SongList') {
      PageToDisplay = SongList;
    }

    return (
      <div>
        <div className='container-fluid'>           
          <button 
            className='btn btn-danger pull-right' 
            onClick={this.handleDisplayChange}>
            Upload Song
          </button>
         </div>
         <PageToDisplay songs={this.state.songs}/>
      </div>
    )
  }
}

export default AppWithAxios;
