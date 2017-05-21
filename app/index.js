import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  IndexRoute,
  HashRouter as Router,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import Main from './components/Main';
import Workouts from './components/Workouts';
import WorkoutDescription from './components/WorkoutDescription';
import Dashboard from './components/Dashboard';
import * as actions from './actions';
var store = require('./store/configureStore').configure();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Main>
            <Route path="/workouts" component={Workouts}>
            </Route>
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/description" component={WorkoutDescription} />
          </Main>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
