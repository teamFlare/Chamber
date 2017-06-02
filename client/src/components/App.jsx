import  { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Homepage from './Homepage.jsx';

//mapStateToProps - will take the state
function mapStateToProps(state) {
  //return the state that you need
  return {
    posts: state.posts,
    comments: state.comments
  }
}

// dispatch = function creators
// it will surface the data and functions via props
// mapDispatchToProps will eliminate the need to manually run $r.store.dispatch
function mapDispatchToProps(dispatch) {
  // will pass action creators via props
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Homepage);
// all of our data and action creators are available inside Homepage
// connect will inject the data from our store to whatever level component that we actually need

export default App;