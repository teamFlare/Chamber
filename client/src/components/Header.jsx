import React from 'react';
import ReactDOM from 'react-dom';

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
            <li><a className="navBarLinkStart" href="#">Profile</a></li>
            <li><a className="navBarLinkStart" href="#">Tournaments</a></li>
            <li><a className="navBarLinkEnd" href="#">Logout</a></li>
         </ul>      
        </nav>
      </div>
    )
  }
}

export default Header;