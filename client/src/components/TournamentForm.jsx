import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import ReactSuperSelect from 'react-super-select';


class TournamentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentname: '',
      competitor1: '',
      competitor2: '',
      competitor3: '',
      competitor4: '',
      competitor5: '',
      competitor6: '',
      competitor7: '',
      competitor8: '',
      tournamentdescription: '',
      profiles: []
    };

    this.submitTournament = this.submitTournament.bind(this);
    this.round1Drop = this.round1Drop.bind(this);
    this.round2Drop = this.round2Drop.bind(this);
    this.round3Drop = this.round3Drop.bind(this);
    this.getProfiles = this.getProfiles.bind(this);
  }
  componentWillMount() {
    //axios.get('/profiles')
    this.getProfiles();
  }
  submitTournament() {
    axios.post('/submitTournament', {tournamentname: this.state.tournamentname,
      competitor1: this.state.competitor1,
      competitor2: this.state.competitor2,
      competitor3: this.state.competitor3,
      competitor4: this.state.competitor4,
      competitor5: this.state.competitor5,
      competitor6: this.state.competitor6,
      competitor7: this.state.competitor7,
      competitor8: this.state.competitor8,
      tournamentdescription: this.state.tournamentdescription})
      .then(result => console.log(result))
      .catch(error => console.log('Error! inside submitTournament Tournaments', error))
  }

  getProfiles() {
    axios.get('/api/profiles')
      .then((response) => {
        var profilesArray = [];
        for(var i = 0; i < response.data.length; i++) {
          var obj = {};
          obj.name = response.data[i].display;
          obj.id = i;
          profilesArray.push(obj);
        }
        this.setState({profiles: profilesArray});
      })
      .catch((error) => {
        console.log(error)
      })
  }

  round1Drop(files) {
    superagent.post('/uploadround1')   
    .attach('theseNamesMustMatch', files[0])
    .end((err, res) => {
      if (err) { console.log(err, "hey bro thieres a huge error"); }
      alert('File uploaded!');
    });
  }

  round2Drop(files) {
    superagent.post('/uploadround2')   
    .attach('theseNamesMustMatch', files[0])
    .end((err, res) => {
      if (err) { console.log(err, "hey bro thieres a huge error"); }
      alert('File uploaded!');
    });
  }

  round3Drop(files) {
    superagent.post('/uploadround3')   
    .attach('theseNamesMustMatch', files[0])
    .end((err, res) => {
      if (err) { console.log(err, "hey bro thieres a huge error"); }
      alert('File uploaded!');
    });
  }

  render() {
    console.log(this.state.profiles)
  
    return (
      <div>
      <div className="container">
        <div className='jumbotron tournament_background'></div>
          {/*<h5 className="white">To submit a new tournament: FIRST: fill out the form with text NEXT: click the submit button at the bottom of the form LAST: drop in the beats for the 3 rounds</h5>
          <h6 className="white">Ensure you are ready to clear the previous tournament and create a new one before touching this form</h6>*/}
          <div className="row">
            <h5 className="white">To submit a new tournament: FIRST: fill out the form with text NEXT: click the submit button at the bottom of the form LAST: drop in the beats for the 3 rounds</h5>
            <h6 className="white">Ensure you are ready to clear the previous tournament and create a new one before touching this form</h6>
            <input className="tourneyName col-xs-6" onChange={(e) => this.setState({tournamentname: e.target.value})} placeholder='tournament name'></input>
            <input className="tourneyName col-xs-6" onChange={(e) => this.setState({tournamentdescription: e.target.value})} placeholder='tournament description'></input>
            <h1>Competitor Selection</h1>
          </div>
          </div>
          <div className="container">
          <div className="row">
          <div className="competitorSelect col-xs-6">
            <ReactSuperSelect placeholder="Competitor 1" 
              dataSource={this.state.profiles} 
              onChange={(option) => this.setState({competitor1: option.name})} />
          </div>
          <div className="competitorSelect col-xs-6">
          <ReactSuperSelect placeholder="Competitor 2" 
                  dataSource={this.state.profiles} 
                  onChange={(option) => this.setState({competitor2: option.name})} />
          </div>
          </div>
          <div className="row">
          <div className="competitorSelect col-xs-6">
          <ReactSuperSelect placeholder="Competitor 3" 
                  dataSource={this.state.profiles} 
                  onChange={(option) => this.setState({competitor3: option.name})} />
          </div>
          <div className="competitorSelect col-xs-6">
          <ReactSuperSelect placeholder="Competitor 4" 
                  dataSource={this.state.profiles} 
                  onChange={(option) => this.setState({competitor4: option.name})} />
          </div>
          </div>
          <div className="row">
          <div className="competitorSelect col-xs-6">
          <ReactSuperSelect placeholder="Competitor 5" 
                  dataSource={this.state.profiles} 
                  onChange={(option) => this.setState({competitor5: option.name})} />
          </div>
          <div className="competitorSelect col-xs-6">
          <ReactSuperSelect placeholder="Competitor 6" 
                  dataSource={this.state.profiles} 
                  onChange={(option) => this.setState({competitor6: option.name})} />
          </div>
          </div>
          <div className="row">
          <div className="competitorSelect col-xs-6">
          <ReactSuperSelect placeholder="Competitor 7" 
                  dataSource={this.state.profiles} 
                  onChange={(option) => this.setState({competitor7: option.name})} />
          </div>
          <div className="competitorSelect col-xs-6">
          <ReactSuperSelect placeholder="Competitor 8" 
                  dataSource={this.state.profiles} 
                  onChange={(option) => this.setState({competitor8: option.name})} />
          </div>
          <div className="col-xs-12">
            <button className="col-xs-12 btn btn-danger btnSpacer" onClick={this.submitTournament}>Submit Tournament (This will clear the previous tournament be careful!)</button>          
          </div>
          <div className="row">
            <h4 className='dropzone white col-xs-4'>Round 1 Beat Submission: <Dropzone onDrop={this.round1Drop}/></h4>
            <h4 className='dropzone white col-xs-4'>Round 2 Beat Submission: <Dropzone onDrop={this.round2Drop}/></h4>
            <h4 className='dropzone white col-xs-4'>Round 3 Beat Submission: <Dropzone onDrop={this.round3Drop}/></h4>
          </div>
          </div>
      </div>
      </div>
    )
  }
}

export default TournamentForm;