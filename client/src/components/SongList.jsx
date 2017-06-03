import React from 'react';
import ReactDOM from 'react-dom';

class SongList extends React.Component {
  constructor(props) {
    super(props);
  }

handleSongPick(song) {
		this.props.handleSongPick(song);
	}

  render() {
    return (
			<div>
				{
					this.props.songs.map((song)=>{
						return (
							<div>
							<h1 onClick={()=>{this.handleSongPick(song)}}>{song.name}</h1>
							</div>
						)})
				}
			</div>
    );
  }
}

export default SongList;