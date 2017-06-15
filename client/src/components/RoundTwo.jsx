import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';

class RoundTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      round2matchup1: {},
      round2matchup2: {},
      profileunlock: false
    };

    this.getRound2Info = this.getRound2Info.bind(this);
    this.insertRound3 = this.insertRound3.bind(this);
    this.submitRound2 = this.submitRound2.bind(this);
    this.voteSubmission = this.voteSubmission.bind(this);
    this.getCurrentProfile = this.getCurrentProfile.bind(this);
  }

  componentDidMount() {
    this.getCurrentProfile();
    this.getRound2Info();
  }

  getRound2Info() {
    axios.get('/round2matchup1')
      .then((response) => {
        this.setState({round2matchup1: response.data[0]})
      })
      .catch((error) => console.log(error))

      axios.get('/round2matchup2')
      .then((response) => {
        this.setState({round2matchup2: response.data[0]})
      })
      .catch((error) => console.log(error))
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
    this.getRound2Info();
    // this.getRound3Info();
  }

  submitRound2() {
    axios.post('/round3post',{'hi': 'hi'})
      .then(() => {
        console.log('success')
      })
      .catch((error) => console.log(error))
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

  insertRound3(competitorPosition, competitorObject) {
    if(competitorPosition === 1 || competitorPosition === 2) {
      if(competitorPosition === 1) {
        axios.post('/insertRound31', {'profile_id': competitorObject.prof_id1})
          .then(result => console.log(result))
          .catch(error => console.log('Error! inside handleVoteClick Tournaments', error))
      } else {
        axios.post('/insertRound31', {'profile_id': competitorObject.prof_id2})
          .then(result => console.log(result))
          .catch(error => console.log('Error! inside handleVoteClick Tournaments', error))
      }
    } 
    if(competitorPosition === 3 || competitorPosition === 4) {
      if(competitorPosition === 3) {
        axios.post('/insertRound32', {'profile_id': competitorObject.prof_id1})
          .then(result => console.log(result))
          .catch(error => console.log('Error! inside handleVoteClick Tournaments', error))
      } else {
        axios.post('/insertRound32', {'profile_id': competitorObject.prof_id2})
          .then(result => console.log(result))
          .catch(error => console.log('Error! inside handleVoteClick Tournaments', error))
      }
    } 
  }

  render() {
  
    return (
      <div>
          <h2>Second Round</h2>
          <div>Round 2 Beat!! Name: {this.state.round2matchup1.roundbeatname} <ReactAudioPlayer src={this.state.round2matchup1.roundbeatlink} controls/></div>
          <h3>First Matchup</h3>
          <div className="container songListRow rcorners">
          <div>Profile: {this.state.round2matchup1.profile1name}</div>
          <div>Song Submission: {this.state.round2matchup1.profile1songname}</div>
          <div>Votes: {this.state.round2matchup1.profile1count}</div>
          <button className=" btn comBut btn-danger" onClick={() => this.voteSubmission(1, this.state.round2matchup1)}>Like</button>
          {this.state.profileunlock ?<button className=" btn comBut btn-danger" onClick={() => this.insertRound3(1, this.state.round2matchup1)}>Move to round 3</button>: null}
          <ReactAudioPlayer src={this.state.round2matchup1.profile1songlink} controls/>
          </div> <br/> <br/>
          <div className="container songListRow rcorners">
          <div>Profile: {this.state.round2matchup1.profile2name}</div>
          <div>Song Submission: {this.state.round2matchup1.profile2songname}</div>
          <div>Votes: {this.state.round2matchup1.profile2count}</div>
          <button className=" btn comBut btn-danger" onClick={() => this.voteSubmission(2, this.state.round2matchup1)}>Like</button>
          {this.state.profileunlock ?<button className=" btn comBut btn-danger" onClick={() => this.insertRound3(2, this.state.round2matchup1)}>Move to round 3</button>: null}
          <ReactAudioPlayer src={this.state.round2matchup1.profile2songlink} controls/>
          </div> <br/> <br/>
          <h3>Second Matchup</h3>
          <div className="container songListRow rcorners">
          <div >Profile: {this.state.round2matchup2.profile1name}</div>
          <div>Song Submission: {this.state.round2matchup2.profile1songname}</div>
          <div>Votes: {this.state.round2matchup2.profile1count}</div>
          <button className=" btn comBut btn-danger" onClick={() => this.voteSubmission(1, this.state.round2matchup2)}>Like</button>
          {this.state.profileunlock ?<button className=" btn comBut btn-danger" onClick={() => this.insertRound3(3, this.state.round2matchup2)}>Move to round 3</button>: null}
          <ReactAudioPlayer src={this.state.round2matchup2.profile1songlink} controls/>
          </div> <br/> <br/>
          <div className="container songListRow rcorners">
          <div>Profile: {this.state.round2matchup2.profile2name}</div>
          <div>Song Submission: {this.state.round2matchup2.profile2songname}</div>
          <div>Votes: {this.state.round2matchup2.profile2count}</div>
          <button className=" btn comBut btn-danger" onClick={() => this.voteSubmission(2, this.state.round2matchup2)}>Like</button>
          {this.state.profileunlock ?<button className=" btn comBut btn-danger" onClick={() => this.insertRound3(4, this.state.round2matchup2)}>Move to round 3</button>: null}
          <ReactAudioPlayer src={this.state.round2matchup2.profile2songlink} controls/>
          </div> <br/> <br/>
          {this.state.profileunlock ? <button onClick={this.submitRound2}>Submit Round 2 Winners</button>: null}
        </div>
    )
  }
}

export default RoundTwo;