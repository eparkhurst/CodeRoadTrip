import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App';
import Admin from './components/Admin';
import './index.css';

ReactDOM.render(
  (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/admin" component={Admin} />
  </Router>
  ),
  document.getElementById('root')
);
