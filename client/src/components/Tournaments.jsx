import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import RoundOne from './RoundOne.jsx';
import RoundTwo from './RoundTwo.jsx';
import RoundThree from './RoundThree.jsx';
import TournamentForm from './TournamentForm.jsx';

class Tournaments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileunlock: false,
      round1boolean: false,
      round2boolean: false,
      finalsboolean: false,
      createboolean: false,
      uploadboolean: false
    };

    this.getCurrentProfile = this.getCurrentProfile.bind(this);
    this.voteSubmission = this.voteSubmission.bind(this);
    this.competitorUpload = this.competitorUpload.bind(this);
  }

  componentDidMount() {
    this.getCurrentProfile();
  }

  getCurrentProfile() {
    axios.get('/currentuser')
      .then((response) => {
        console.log(response.data)
        if(response.data.display === 'Nikhil Mehta' || response.data.display === 'Sim K' || response.data.display === 'Prateek Bhatt' || response.data.display === 'Steve Chang') {
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
    // this.getRound3Info();
  }

  competitorUpload(files) {
    superagent.post('/competitorUpload')   
    .attach('theseNamesMustMatch', files[0])
    .end((err, res) => {
      if (err) { console.log(err, "hey bro thieres a huge error"); }
      alert('File uploaded!');
    });
  }

  render() {
    return (
      <div>
      <h1 className="songTitle">Tournaments</h1> <br/><br/><br/>
      <button className="btn comBut btn-danger" onClick={() => this.setState({round1boolean: true, round2boolean: false, finalsboolean: false, createboolean: false, uploadboolean: false})}>First Round</button>
      <button className="btn comBut btn-danger" onClick={() => this.setState({round1boolean: false, round2boolean: true, finalsboolean: false, createboolean: false, uploadboolean: false})}>Second Round</button>
      <button className="btn comBut btn-danger" onClick={() => this.setState({round1boolean: false, round2boolean: false, finalsboolean: true, createboolean: false, uploadboolean: false})}>Finals</button>
      <button className="btn comBut btn-danger" onClick={() => this.setState({round1boolean: false, round2boolean: false, finalsboolean: false, createboolean: false, uploadboolean: true})}>Upload</button>
      {this.state.profileunlock ? <button className="btn comBut btn-danger" onClick={() => this.setState({createboolean: true, round1boolean: false, round2boolean: false, finalsboolean: false, uploadboolean: false})}>Create Tournament</button>: null}
      {this.state.uploadboolean ? <div>Competitors: Upload your submission below
      <Dropzone onDrop={this.competitorUpload}/>
      </div>: null}
       {this.state.round1boolean ? <RoundOne/> : null}
        {this.state.round2boolean ? <RoundTwo/> : null}
        {this.state.finalsboolean ? <RoundThree/> : null}
        {this.state.createboolean ? <TournamentForm/>: null}
      </div>
    )
  }
}

export default Tournaments;