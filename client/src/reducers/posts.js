// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. a copy of current state

// (here is what happened, okay let me see)
// return the updated store
// from that point forward, react will do everything it needs to do

function posts(state = [], action) {
  console.log(state, action);
  return state;
}

export default posts;

//the reducer actually does the editing of state

//call the dispatch method (of store) to fire off these actions

//everytime you dispatch an action, every single reducer is going to run
//... and whether or not you choose to act on that action or not is up to the reducer

//we need to write some logic inside of this posts that will say if it is one of actions that I am actually interested in, then do something
// (by action were interested in, type: 'INCREMENT_LIKES')

//every reducer runs everytime we run an action, whether it does something is up to you (so that's why we need a switch statement in order to handle all of the actions)
