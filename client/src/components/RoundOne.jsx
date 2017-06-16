import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';

class RoundOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      round1matchup1: {},
      round1matchup2: {},
      round1matchup3: {},
      round1matchup4: {},
      profileunlock: false
    };

    this.getRound1Info = this.getRound1Info.bind(this);
    this.insertRound2 = this.insertRound2.bind(this);
    this.submitRound1 = this.submitRound1.bind(this);
    this.voteSubmission = this.voteSubmission.bind(this);
    this.getCurrentProfile = this.getCurrentProfile.bind(this);
  }

  componentDidMount() {
    this.getCurrentProfile();
    this.getRound1Info();
  }

  getRound1Info() {
    axios.get('/round1matchup1')
      .then((response) => {
        this.setState({round1matchup1: response.data[0]})
      })
      .catch((error) => console.log(error))

      axios.get('/round1matchup2')
      .then((response) => {
        this.setState({round1matchup2: response.data[0]})
      })
      .catch((error) => console.log(error))

      axios.get('/round1matchup3')
      .then((response) => {
        this.setState({round1matchup3: response.data[0]})
      })
      .catch((error) => console.log(error))

      axios.get('/round1matchup4')
      .then((response) => {
        this.setState({round1matchup4: response.data[0]})
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
    this.getRound1Info();
    // this.getRound2Info();
    // this.getRound3Info();
  }

insertRound2(competitorPosition, competitorObject) {
    if(competitorPosition === 1 || competitorPosition === 2) {
      if(competitorPosition === 1) {
        axios.post('/insertRound21', {'profile_id': competitorObject.prof_id1})
          .then(result => console.log(result))
          .catch(error => console.log('Error! inside handleVoteClick Tournaments', error))
      } else {
        axios.post('/insertRound21', {'profile_id': competitorObject.prof_id2})
          .then(result => console.log(result))
          .catch(error => console.log('Error! inside handleVoteClick Tournaments', error))
      }
    } 
    if(competitorPosition === 3 || competitorPosition === 4) {
      if(competitorPosition === 3) {
        axios.post('/insertRound22', {'profile_id': competitorObject.prof_id1})
          .then(result => console.log(result))
          .catch(error => console.log('Error! inside handleVoteClick Tournaments', error))
      } else {
        axios.post('/insertRound22', {'profile_id': competitorObject.prof_id2})
          .then(result => console.log(result))
          .catch(error => console.log('Error! inside handleVoteClick Tournaments', error))
      }
    } 
    if(competitorPosition === 5 || competitorPosition === 6) {
      if(competitorPosition === 5) {
        axios.post('/insertRound23', {'profile_id': competitorObject.prof_id1})
          .then(result => console.log(result))
          .catch(error => console.log('Error! inside handleVoteClick Tournaments', error))
      } else {
        axios.post('/insertRound23', {'profile_id': competitorObject.prof_id2})
          .then(result => console.log(result))
          .catch(error => console.log('Error! inside handleVoteClick Tournaments', error))
      }
    } 
    if(competitorPosition === 7 || competitorPosition === 8) {
      if(competitorPosition === 7) {
        axios.post('/insertRound24', {'profile_id': competitorObject.prof_id1})
          .then(() => {
              console.log('success')          
          })
          .catch(error => console.log('trigaaaaaaaaa', error))
      } else {
        axios.post('/insertRound24', {'profile_id': competitorObject.prof_id2})
          .then(() => {
              console.log('success')
          })
          .catch(error => console.log('triggggaaaaaaaaaaa', error))
      }
    } 
  }

submitRound1() {
    axios.post('/round2post',{'hi': 'hi'})
      .then(() => {
        console.log('success')
      })
      .catch((error) => console.log(error))
  }

  render() {
  
    return (
      <div>
          <div className='jumbotron tournament_background'></div>
          <h2>First Round</h2>
          <h5>{this.state.round1matchup1.tournamentname}</h5>
          <div className = "songTitle white">Round 1 Beat!! {this.state.round1matchup1.roundbeatname} 
            <div><ReactAudioPlayer src={this.state.round1matchup1.roundbeatlink} controls/></div>
          </div>
          <h3>First Matchup</h3>
            <div className="songListRowTournament rcorners col-xs-6">
            <div className = "songCreator">{this.state.round1matchup1.profile1name}</div>
            <div className = "songTitle">{this.state.round1matchup1.profile1songname}</div>
            <ReactAudioPlayer src={this.state.round1matchup1.profile1songlink} controls/>
            <button className=" btn comBut btn-danger btn-xs" onClick={() => this.voteSubmission(1, this.state.round1matchup1)}>Like</button>
            {this.state.profileunlock ?<button className="btn comBut btn-danger btn-xs" onClick={() => this.insertRound2(1, this.state.round1matchup1)}>Move to round 2</button>: null}
            <div className = "songTitle">Votes: {this.state.round1matchup1.profile2count}</div>
          </div>
          <div className="songListRowTournament rcorners col-xs-6">
          <div className = "songCreator">{this.state.round1matchup1.profile2name}</div>
          <div className = "songTitle">{this.state.round1matchup1.profile2songname}</div>
          <ReactAudioPlayer src={this.state.round1matchup1.profile2songlink} controls/>
          <button className=" btn comBut btn-danger btn-xs" onClick={() => this.voteSubmission(2, this.state.round1matchup1)}>Like</button>
          {this.state.profileunlock ?<button className="btn comBut btn-danger btn-xs" onClick={() => this.insertRound2(2, this.state.round1matchup1)}>Move to round 2</button>: null}
          <div className = "songTitle">Votes: {this.state.round1matchup1.profile2count}</div>
          </div> 
          <h3>Second Matchup</h3>
          <div className="container songListRowTournament rcorners">
          <div className = "songCreator">{this.state.round1matchup2.profile1name}</div>
          <div className = "songTitle">{this.state.round1matchup2.profile1songname}</div>
          <div className = "songTitle">Votes: {this.state.round1matchup2.profile1count}</div>
          <button className=" btn comBut btn-danger" onClick={() => this.voteSubmission(1, this.state.round1matchup2)}>Like</button>
          {this.state.profileunlock ?<button className="btn comBut btn-danger" onClick={() => this.insertRound2(3, this.state.round1matchup2)}>Move to round 2</button>: null}
          <ReactAudioPlayer src={this.state.round1matchup2.profile1songlink} controls/>
          </div> <br/> <br/>
          <div className="container songListRowTournament rcorners">
          <div className = "songCreator">{this.state.round1matchup2.profile2name}</div>
          <div className = "songTitle">{this.state.round1matchup2.profile2songname}</div>
          <div className = "songTitle">Votes: {this.state.round1matchup2.profile2count}</div>
          <button className=" btn comBut btn-danger" onClick={() => this.voteSubmission(2, this.state.round1matchup2)}>Like</button>
          {this.state.profileunlock ?<button className="btn comBut btn-danger" onClick={() => this.insertRound2(4, this.state.round1matchup2)}>Move to round 2</button>: null}
          <ReactAudioPlayer src={this.state.round1matchup2.profile2songlink} controls/>
          </div> <br/> <br/>
          <h3>Third Matchup</h3>
          <div className="container songListRowTournament rcorners">
          <div className = "songCreator">{this.state.round1matchup3.profile1name}</div>
          <div className = "songTitle">{this.state.round1matchup3.profile1songname}</div>
          <div className = "songTitle">Votes: {this.state.round1matchup3.profile1count}</div>
          <button className=" btn comBut btn-danger" onClick={() => this.voteSubmission(1, this.state.round1matchup3)}>Like</button>
          {this.state.profileunlock ?<button className="btn comBut btn-danger" onClick={() => this.insertRound2(5, this.state.round1matchup3)}>Move to round 2</button>: null}
          <ReactAudioPlayer src={this.state.round1matchup3.profile1songlink} controls/>
          </div> <br/> <br/>
          <div className="container songListRowTournament rcorners">
          <div className = "songCreator">{this.state.round1matchup3.profile2name}</div>
          <div className = "songTitle">{this.state.round1matchup3.profile2songname}</div>
          <div className = "songTitle">Votes: {this.state.round1matchup3.profile2count}</div>
          <button className=" btn comBut btn-danger" onClick={() => this.voteSubmission(2, this.state.round1matchup3)}>Like</button>
          {this.state.profileunlock ?<button className="btn comBut btn-danger" onClick={() => this.insertRound2(6, this.state.round1matchup3)}>Move to round 2</button>: null}
          <ReactAudioPlayer src={this.state.round1matchup3.profile2songlink} controls/>
          </div> <br/> <br/>
          <h3>Fourth Matchup</h3>
          <div className="container songListRowTournament rcorners">
          <div className = "songCreator">{this.state.round1matchup4.profile1name}</div>
          <div className = "songTitle">{this.state.round1matchup4.profile1songname}</div>
          <div className = "songTitle">Votes: {this.state.round1matchup4.profile1count}</div>
          <button className=" btn comBut btn-danger" onClick={() => this.voteSubmission(1, this.state.round1matchup4)}>Like</button>
          {this.state.profileunlock ?<button className="btn comBut btn-danger" onClick={() => this.insertRound2(7, this.state.round1matchup4)}>Move to round 2</button>: null}
          <ReactAudioPlayer src={this.state.round1matchup4.profile1songlink} controls/>
          </div> <br/> <br/>
          <div className="container songListRowTournament rcorners">
          <div className = "songCreator">{this.state.round1matchup4.profile2name}</div>
          <div className = "songTitle">{this.state.round1matchup4.profile2songname}</div>
          <div className = "songTitle">Votes: {this.state.round1matchup4.profile2count}</div>
          <button className=" btn comBut btn-danger" onClick={() => this.voteSubmission(2, this.state.round1matchup4)}>Like</button>
          {this.state.profileunlock ?<button className="btn comBut btn-danger" onClick={() => this.insertRound2(8, this.state.round1matchup4)}>Move to round 2</button>: null}
          <ReactAudioPlayer src={this.state.round1matchup4.profile2songlink} controls/>
          </div> <br/> <br/>
          {this.state.profileunlock ? <button className=" btn comBut btn-danger" onClick={this.submitRound1}>Submit Round 1 Winners</button>: null}
        </div>
    )
  }
}

export default RoundOne;