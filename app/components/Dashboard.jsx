import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ExerciseTileList from './Exercise-Tile-List';
import SetRepList from './SetRepsList';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { fields, reduxForm } from 'redux-form';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(e) {
    e.preventDefault();
    var { dispatch } = this.props;

    var name = this.refs.addWorkout.value;

    dispatch(actions.createWorkout(name));

    this.refs.addWorkout.value = ' ';
  }
  render() {
    const {
      fields: { exercise, weight, reps },
      handleSubmit,
      isAuthenticated
    } = this.props;

    return (
      <div className="{save-workout-form small-12 columns text-center samll-centred} ">
        <form onSubmit={this.handleSubmit}>
          <input
            required
            minLength="4"
            maxLength="15"
            className="saveWorkoutField text-center"
            type="text"
            ref="addWorkout"
            placeholder="Add a Workout"
            {...exercise}
          />
          <button onClick={this.handleSave} className="button expanded">
            Save Workout
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  var errors = {};
  if (!values.exercise) {
    errors.exercise = 'You Must Enter an exercise';
  } else if (values.exercise && values.exercise.length < 4) {
    errors.exercise = 'Length must be at least 4 characters';
  }

  return errors;
}
export default reduxForm(
  {
    form: 'dashboardForm',
    fields: ['exercise', 'weight', 'reps'],
    validate
  },
  null
)(Dashboard);
