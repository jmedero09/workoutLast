import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SetReps from './SetReps';
import { Field, reduxForm } from 'redux-form';

class ExerciseTile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    var { dispatch } = this.props;
    var weight = this.refs.weight.value;
    var reps = this.refs.reps.value;

    const id = e.target.attributes.id.value;
    dispatch(actions.addExerciseDetails(id, weight, reps));

    this.refs.weight.value = '';
    this.refs.reps.value = '';
    this.forceUpdate();
  }
  render() {
    const {
      fields: exercise,
      weight,
      reps,
      handleSubmit,
      onKeyPress
    } = this.props;

    return (
      <div className="exercise-tile small-12 columns small-centered">
        <h1> {this.props.title} </h1>
        {this.props.sets_reps.map((detail, index) => {
          return (
            <SetReps
              key={index}
              set={++index}
              weight={detail.weight}
              reps={detail.reps}
            />
          );
        })}

        <form onSubmit={this.handleSubmit} id={this.props.exercise_id}>
          <div className="small-4 columns small-centered">
            <label> Weight </label>
            {' '}
            <input
              required
              maxLength={4}
              name="weight"
              type="number"
              ref="weight"
              {...weight}
            />
            {' '}
          </div>

          <div className="small-4 columns small-centered">
            <label> Reps </label>
            {' '}
            <input
              required
              maxLength={2}
              name="reps"
              type="number"
              ref="reps"
              {...reps}
            />
            {' '}
          </div> <button className="button tiny"> submit </button>{' '}
        </form>
        {' '}
        {/*<div className="textHelp">{weight.touched ? weight.error : ''}</div>
                 <div className="textHelp">{reps.touched ? reps.error : ''}</div>*/}

      </div>
    );
  }
}
var mapStateToProps = state => {
  return {
    exercises: state.addExercise
  };
};

function validate(values) {
  var errors = {};
  if (!values.weight) {
    errors.weight = 'You Must Enter a weight';
  }
  if (!values.reps) {
    errors.reps = 'You Must Enter a rep';
  }
  if (values.weight && values.weight.length > 4) {
    errors.weight = 'Weight can only be 4 characters long';
  }
  if (values.reps && values.reps.length > 2) {
    errors.reps = 'reps can only be up tp 2 characters';
  }

  return errors;
}
export default reduxForm(
  {
    form: 'exerciseForm',
    fields: ['exercise', 'weight', 'reps'],
    validate
  },
  mapStateToProps
)(ExerciseTile);
