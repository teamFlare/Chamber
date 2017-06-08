import React from 'react';
import SongEntry from './SongEntry.jsx';
// import store from './../store';
import { connect } from 'react-redux';

class SongDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button >Change State</button>
        <h1>Song Display</h1>
        {/*{
          this.props.songs.map((song) => {
            return (
              <SongEntry song={song} />
            )
          })
        }*/}
      </div>
    )
  }
}

export default SongDisplay;
