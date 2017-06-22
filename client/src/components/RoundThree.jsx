import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';

class RoundThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        round3matchup1: {},
        winner: '',
        profileunlock: false
    };

    this.getRound3Info = this.getRound3Info.bind(this);
    this.insertRound4 = this.insertRound4.bind(this);
    this.voteSubmission = this.voteSubmission.bind(this);
    this.getCurrentProfile = this.getCurrentProfile.bind(this);

  }

  componentDidMount() {
    this.getCurrentProfile();
    this.getRound3Info();
  }

  insertRound4(competitorPosition, competitorObject) {
    if(competitorPosition === 1){
      this.setState({winner: competitorObject.profile1name})
    } 
    if(competitorPosition === 2) {
      this.setState({winner: competitorObject.profile2name})
    }
  }

  getCurrentProfile() {
    axios.get('/currentuser')
      .then((response) => {
        console.log(response.data)
        if(response.data.display === 'Nikhil Mehta' || response.data.display === 'Prateek Bhatt' || response.data.display === 'Steve Chang') {
          this.setState({profileunlock: true})
        }
      })
  }
  
  voteSubmission(competitorPosition, competitorObject) {
    if(competitorPosition === 1){
      axios.post('/api/voteClick', {collaboration_id: competitorObject.song_id1})
        .then(result => console.log(result))
        .catch(error => console.log('Error! inside handleVoteClick Tournaments', error))
    } 
    if(competitorPosition === 2) {
      axios.post('/api/voteClick', {collaboration_id: competitorObject.song_id2})
        .then(result => console.log(result))
        .catch(error => console.log('Error! inside handleVoteClick Tournaments', error))
    }
    // this.getRound1Info();
    // this.getRound2Info();
    this.getRound3Info();
  }

  getRound3Info() {
    axios.get('/round3matchup1')
      .then((response) => {
        this.setState({round3matchup1: response.data[0]})
      })
      .catch((error) => console.log(error))
  }

  render() {

  
    return (
      <div>
          <div className='jumbotron tournament_background'></div>
          <div className='jumbotron jumbotron-tournament'>
            <h2>Final Round</h2>
            <div className = "songTitle white tagTitle">Round 3 Beat: {this.state.round3matchup1.roundbeatname} 
              <div className='tagTitle'><ReactAudioPlayer src={this.state.round3matchup1.roundbeatlink} controls/></div></div>
          </div>
          <h3 className='h3-tournament'>Matchup</h3>
          <div className="songListRowTournament rcorners col-xs-6">
            <div className = "songTitleTournament white">{this.state.round3matchup1.profile1songname}</div>
            <div className = "songCreatorTournament white">{this.state.round3matchup1.profile1name}</div>
            <ReactAudioPlayer src={this.state.round3matchup1.profile1songlink} controls/>
            <button className=" btn comBut btn-danger btn-md" onClick={() => this.voteSubmission(1, this.state.round3matchup1)}>Like</button>
            {this.state.profileunlock ?<button className=" btn comBut btn-danger btn-md" onClick={() => this.insertRound4(1, this.state.round3matchup1)}>Winner</button>: null}
            <div className = "songVote white">Votes: {this.state.round3matchup1.profile1count}</div>
          </div> 
          <div className="songListRowTournament rcorners col-xs-6">
            <div className = "songTitleTournament white">{this.state.round3matchup1.profile2songname}</div>
            <div className = "songCreatorTournament white">{this.state.round3matchup1.profile2name}</div>
            <ReactAudioPlayer src={this.state.round3matchup1.profile2songlink} controls/>
            <button className=" btn comBut btn-danger btn-md" onClick={() => this.voteSubmission(2, this.state.round3matchup1)}>Like</button>
            {this.state.profileunlock ?<button className=" btn comBut btn-danger btn-md" onClick={() => this.insertRound4(2, this.state.round3matchup1)}>Winner</button>: null}
            <div className = "songVote white">Votes: {this.state.round3matchup1.profile2count}</div>
          </div> <br/> <br/>
          <h1>WINNER: {this.state.winner}</h1>
        </div>
    )
  }
}

export default RoundThree;