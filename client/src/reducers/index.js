import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import comments from './comments';
// import beats from './beats';

const rootReducer = combineReducers({ posts, comments, routing: routerReducer });

export default rootReducer;

// create a reducer for every single piece of state
// i.e. for this app we have posts and comments
// ... so when the posts gets updated, we run the posts reducer
// ... so when the comments gets updated, we run the comments reducer
// eventually, those two reducers are going to get reduced to a single big one
