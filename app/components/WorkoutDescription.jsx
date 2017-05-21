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
  handleSubmit(e) {
    e.preventDefault();

    var {
      dispatch,
      exercises
    } = this.props;

    var exerciseText = this.refs.addExercise.value;

    var x = dispatch(actions.addExercise(exerciseText));
    console.log(this.props);
    this.refs.addExercise.value = '';
  }
  render() {
        const {
      // fields: {
      //   exercises,
      //   weight,
      //   reps
      // },
      handleSubmit,
      isAuthenticated
    } = this.props;
    console.log('what an actual fuck', this.props.description);
    let exercises = this.props.description.exercises.map((exercise, index) => {
      let sets_reps = exercise.sets_reps.map(item => (
        <SetRep
          key={index}
          set={++index}
          weight={item.weight}
          reps={item.reps}
        />
      ));
      return (
        <div key={index}>
          <h1>{exercise.name}</h1>
          {sets_reps}
        </div>
      );
    });

    return (
      <div className="exercise-tile small-12 columns text-center">
        <div>       
          <div className="row">
            <div className="columns samll-centred">
              <ExerciseTileList />
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
                  {...exercises}
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
var mapStateToProps = state => {
  return {
    description: state.exerciseReducer
  };
};
export default connect(mapStateToProps)(WorkoutDescription);