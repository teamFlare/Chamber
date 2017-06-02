import React from 'react';

const Beats = React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li>
            Songs Name: {this.props.post.caption}
          </li>
        </ul>
      </div>
    )
  }
})

export default Beats;