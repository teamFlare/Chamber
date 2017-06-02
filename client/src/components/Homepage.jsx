import React from 'react';
import { Link } from 'react-router';

const Homepage = React.createClass({
  render() {
    return (
      <div>
        <h1>
          <Link to="/">Rap Battle Chamber</Link>
        </h1>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
});

//React.cloneElement it will pass down the props from Homepage down to the first child
// (reduxstagram.js is where you will find the child component of Homepage.js, which is PhotoGrid.js)

export default Homepage;