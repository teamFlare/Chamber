import React from 'react';
import { render } from 'react-dom';

// Import css
// import css from './styles/style.styl';

// Import Components
import App from './components/App.jsx';
import Homepage from './components/Homepage.jsx';
import AppWithAxios from './components/AppWithAxios.jsx';
import Profile from './components/Profile.jsx';
// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={AppWithAxios}></IndexRoute>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
