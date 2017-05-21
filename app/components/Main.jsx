import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import Workouts from './Workouts';
import WorkoutDescription from './WorkoutDescription';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { dispatch, exercise } = this.props;
    const { isAuthenticated, errorMessage } = this.props.authReducer;
    return (
      <div className="row">

        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />

        {this.props.children}

      </div>
    );
  }
}

var mapStateToProps = (state, props) => {
  return state;
};
export default connect(mapStateToProps)(Main);
