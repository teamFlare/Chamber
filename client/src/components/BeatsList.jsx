import React from 'react';
import Beat from './Beat.jsx';

/*const BeatsList = () => {
  return (
    <div>
      <h1> BeatsList </h1>
      <p> {this.props} </p>
    </div>
  )
}*/

const BeatsList = React.createClass({
  render() {
    return (
      <div className="photo-grid">
        {this.props.posts.map((post, i) => 
          <Beat {...this.props} key={i} i={i} post={post} />
        )}

      </div>
    )
  }
})

export default BeatsList;

// {this.props.posts.map((post, i) => 
//         <Beat {...this.props} key={i} i={i} />
//       )}
// {this.props.posts.map((post, i) => 
          // <Beat {...this.props} key={i} i={i} post={post} />)}