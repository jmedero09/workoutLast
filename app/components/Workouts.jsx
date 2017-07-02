import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router-dom';
import { fetchWorkouts } from '../actions';
import { connect } from 'react-redux';
import WorkoutTile from './WorkoutTile';

class Workouts extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchWorkouts());
  }

  renderList() {
    return this.props.workouts.map((workout, index) => {
      return (
        <Link to={`/workout/${workout._id}`} key={index}>
          <li key={index}>
            <WorkoutTile name={workout.name} date={workout.date} />
          </li>
        </Link>
      );
    });
  }
  render(props) {
    return (
      <div className="saved-workout-container">
        <ul className="saved-workout-list small-centered  small-12 columns text-center">
          <h1>Workouts component renders here</h1>
          {this.renderList()}
        </ul>
        {this.props.children}
      </div>
    );
  }
}
var mapStateToProps = state => {
  return state.workoutReducer;
};

export default connect(mapStateToProps)(Workouts);
