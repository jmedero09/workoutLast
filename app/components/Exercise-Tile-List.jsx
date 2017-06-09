import ExerciseTile from './Exercise-Tile';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExerciseTileList extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <ul className="small-centered  small-12 columns text-center">
        {this.props.workout.exercises.map((exercise, index) =>
          <li key={index}>
            <ExerciseTile
              workout_id={this.props.workout._id}
              name={exercise.name}
              sets_reps={exercise.sets}
              exercise_id={exercise._id}
            />
          </li>
        )}
      </ul>
    );
  }
}
const mapStateToProps = state => {
  return {
    workout: state.workoutReducer.workout
  };
};
export default connect(mapStateToProps)(ExerciseTileList);
