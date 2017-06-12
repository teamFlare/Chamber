import React from 'react';
import ReactDOM from 'react-dom';
var Tabs = require('react-simpletabs');
import $ from 'jquery';


class Feed extends React.Component {
  constructor(props) {
    super(props);
		this.state = { tabIndex: 0 };
		this.openCity = this.openCity.bind(this);
  }

	openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
		console.log("This is whats in the tab??",tabcontent);
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
      <div>
        <h1>NEW SONGS BRUH</h1>
      </div>
    )
  }
}

export default Feed;