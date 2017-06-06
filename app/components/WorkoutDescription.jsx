import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { AddExerciseDetailsReducer } from '../reducers/reducers';
import SetRep from './SetReps';
import ExerciseTileList from './Exercise-Tile-List';

class WorkoutDescription extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchWorkout(this.props.match.params.id));
  }

  handleSubmit(e) {
    e.preventDefault();
    const exerciseText = this.refs.addExercise.value;
    const workout_id = this.props.match.params.id;
    const { dispatch, exercises } = this.props;
    dispatch(actions.addExercise(exerciseText, workout_id));
    this.refs.addExercise.value = '';
  }

  render() {
    return (
      <div className="exercise-tile small-12 columns text-center">
        <div>
          <div className="row">
            <div className="columns samll-centred">

              {this.props.workout &&
                this.props.workout.exercises &&
                <ExerciseTileList exercises={this.props.workout} />}

            </div>
            <div className="{small-12 columns text-center samll-centred} ">
              <form onSubmit={this.handleSubmit}>
                <input
                  required
                  minLength="4"
                  maxLength="15"
                  className="addExerciseField text-center"
                  type="text"
                  ref="addExercise"
                  placeholder="Add an Exercise"
                />
                <button className="button expanded">Add Exercise</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    workout: state.workoutReducer.workout
  };
};
export default connect(mapStateToProps)(WorkoutDescription);
