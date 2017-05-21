import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router-dom';
import { connect } from 'react-redux';
import WorkoutTile from './WorkoutTile';

class Workouts extends Component {
  constructor(props) {
    super(props);
  }
  renderList() {
    return this.props.workouts.map((workout, index) => {
      console.log(workout);
      return (
        <Link to={'description'} key={index}>
          <li key={index}>
            <WorkoutTile name={workout.name} date={workout.date} />
          </li>
        </Link>
      );
    });
  }
  render(props) {
    return (
      <div>
        <ul className="small-centered  small-12 columns text-center">
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
