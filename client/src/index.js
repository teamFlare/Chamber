import React from 'react';
import { render } from 'react-dom';

// Import css
// import css from './styles/style.styl';

// Import Components
import App from './components/App.jsx';
import Homepage from './components/Homepage.jsx';
import BeatsList from './components/BeatsList.jsx';
import Beat from './components/Beat.jsx';
import AppWithAxios from './components/AppWithAxios.jsx';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={AppWithAxios}></IndexRoute>
        <Route path="/view/:postId" component={Beat}></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
