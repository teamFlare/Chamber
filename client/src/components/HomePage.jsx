import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import TopBeats from './TopBeats.jsx';
import TopCollabs from './TopCollabs.jsx';
import Tournaments from './Tournaments.jsx';
import Profile from './Profile.jsx';
import Dropzone from 'react-dropzone';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        topBeats: false,
        topCollabs: false,
        tournaments: false,
        profile: false
    };
  }

  render() {
        if(!this.state.profile) {
            return( <div>
                    <Header />
                    <div onClick={() => this.setState({profile: true})}>Profile</div>
                    <button onClick={() => this.setState({tournaments: false, topBeats: true, topCollabs: false})}>Top Beats</button>
                    <button onClick={() => this.setState({tournaments: false, topBeats: false, topCollabs: true})}>Top Collabs</button>
                    <button onClick={() => this.setState({tournaments: true, topBeats: false, topCollabs: false})}>Tournaments</button>
                    {this.state.topBeats ? <TopBeats />: null} 
                    {this.state.topCollabs ? <TopCollabs />: null}
                    {this.state.tournaments ? <Tournaments />: null}
                    </div>
            )
        } else {
            return(<Profile />)
        }
  }
}

export default HomePage;