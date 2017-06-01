import React from 'react';
import { render } from 'react-dom';

// Import css
// import css from './styles/style.styl';

// Import Components
import App from './components/App';
import Homepage from './components/Homepage';
import BeatsList from './components/BeatsList';
import Beat from './components/Beat';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/reduxroute" component={App}>
        <IndexRoute component={BeatsList}></IndexRoute>
        <Route path="/view/:postId" component={Beat}></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
