import ExerciseTile from './Exercise-Tile';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExerciseTileList extends Component {
  constructor(props) {
    super(props);
  }

  renderList() {
    return this.props.exercises.map((exercise, index) => {
      return (
        <li key={exercise.id}>
          <ExerciseTile
            title={exercise.name}
            sets_reps={exercise.sets_reps}
            exercise_id={exercise.id}
          />
        </li>
      );
    });
  }
  render(props) {
    return (
      <ul className="small-centered  small-12 columns text-center">
        {this.renderList()}
      </ul>
    );
  }
}
const mapStateToProps = state => {
  return {
    exercises: state.exerciseReducer.exercises
  };
};
export default connect(mapStateToProps)(ExerciseTileList);
