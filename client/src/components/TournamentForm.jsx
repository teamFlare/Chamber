import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import ReactSuperSelect from 'react-super-select';

var handlerExample = function(option) {
  var output = [
    'Option Item Chosen = {\n',
    '\tid: ', option.id, '\n',
    '\tname: ', option.name, '\n',
    '\tsize: ', option.size, '\n\t};'];
  console.log(output.join(''));
};
var testData = [
{
  "id": "5507c0528152e61f3c348d56",
  "name": "elit laborum et",
  "size": "Large"
},
{
  "id": "5507c0526305bceb0c0e2c7a",
  "name": "dolor nulla velit",
  "size": "Medium"
}
];

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
      tournamentdescription: ''
    };

    this.submitTournament = this.submitTournament.bind(this);
    this.round1Drop = this.round1Drop.bind(this);
    this.round2Drop = this.round2Drop.bind(this);
    this.round3Drop = this.round3Drop.bind(this);
  }
  componentWillMount() {
    //axios.get('/profiles')
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

  
    return (
      <div>
          <h5>To submit a new tournament: FIRST: fill out the form with text NEXT: click the submit button at the bottom of the page LAST: drop in the beats for the 3 rounds</h5>
          <h6>Ensure you are ready to clear the previous tournament and create a new one before touching this form</h6>
          <input onChange={(e) => this.setState({tournamentname: e.target.value})} placeholder='tournament name'></input><br/><br/>
          <ReactSuperSelect placeholder="Make a Selection" 
                  dataSource={testData} 
                  onChange={handlerExample} /><br/>
          <input onChange={(e) => this.setState({competitor1: e.target.value})} placeholder='competitor 1 username'></input><br/><br/>
          <input onChange={(e) => this.setState({competitor2: e.target.value})} placeholder='competitor 2 username'></input><br/><br/>
          <input onChange={(e) => this.setState({competitor3: e.target.value})} placeholder='competitor 3 username'></input><br/><br/>
          <input onChange={(e) => this.setState({competitor4: e.target.value})} placeholder='competitor 4 username'></input><br/><br/>
          <input onChange={(e) => this.setState({competitor5: e.target.value})} placeholder='competitor 5 username'></input><br/><br/>
          <input onChange={(e) => this.setState({competitor6: e.target.value})} placeholder='competitor 6 username'></input><br/><br/>
          <input onChange={(e) => this.setState({competitor7: e.target.value})} placeholder='competitor 7 username'></input><br/><br/>
          <input onChange={(e) => this.setState({competitor8: e.target.value})} placeholder='competitor 8 username'></input><br/><br/>
          <input onChange={(e) => this.setState({tournamentdescription: e.target.value})} placeholder='tournament description'></input><br/><br/>
          <button className=" btn comBut btn-danger" onClick={this.submitTournament}>Submit Tournament (This will clear the previous tournament be careful!)</button>
          <div>Round 1 Beat Submission: <Dropzone onDrop={this.round1Drop}/></div>
          <div>Round 2 Beat Submission: <Dropzone onDrop={this.round2Drop}/></div>
          <div>Round 3 Beat Submission: <Dropzone onDrop={this.round3Drop}/></div><br/><br/>
      </div>
    )
  }
}

export default TournamentForm;