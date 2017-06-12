import React from 'react';
import ReactDOM from 'react-dom';
var Tabs = require('react-simpletabs');
import $ from 'jquery';
import TopBeats from './TopBeats.jsx';
import TopCollabs from './TopCollabs.jsx';
import Feed from './Feed.jsx';
import SongList from './SongList.jsx';


class Tag extends React.Component {
  constructor(props) {
    super(props);
		this.state = {  
    };
		
    this.openCity = this.openCity.bind(this);
  }

  componentDidMount() {
    $('#LondonBut').click();

  }

   
	openCity(evt, cityName) {
    // Declare all variables
       console.log("This should be active EVENT->", evt)
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

  render() {
    return (
			<div className="uniqueTabs">
	<div className="tab">
  <button id="LondonBut" className="tablinks active" onClick={(event)=>{this.openCity(event, 'London')}}>Top Collaborations</button>
  <button id="ParisBut" className="tablinks" onClick={(event)=>{this.openCity(event, 'Paris')}}>Top Beats</button>
  <button id="TokyoBut" className="tablinks" onClick={(event)=>{this.openCity(event, 'Tokyo')}}>Feed</button>
</div>

<div id="London" className="tabcontent">
  <div className="tagTitle">
  <h1>Top Collabs</h1>
  </div>
  <SongList songs={this.props.topCollabs}/>
</div>

<div id="Paris" className="tabcontent">
  <div className="tagTitle">
  <h1>Top Beats</h1>
  </div>
  <SongList songs={this.props.topBeats}/>
</div>

<div id="Tokyo" className="tabcontent">
  <div className="tagTitle">
  <h1>Feed</h1>
  </div>
  <SongList songs={this.props.newSongs}/>
</div>
			</div>
    )
  }
}

export default Tag;