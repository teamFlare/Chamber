import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import axios from 'axios';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-inverse navbar-fixed-top navbar-collapse">
          <a className="navbar-brand title" href="/">Co.Lab</a>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to='/'>Discover Sounds</Link></li>
            <li><Link to='/myProfile'>Profile</Link></li>
            <li><Link to='/tournaments'>Tournaments</Link></li>
            <li><a href='/logout' className="navBarLinkEnd">Logout</a></li>
         </ul>      
        </nav>
      </div>
    )
  }
}

export default Header;