import * as redux from 'redux';
import update from 'immutability-helper';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  QUOTE_REQUEST,
  QUOTE_SUCCESS,
  QUOTE_FAILURE
} from '../actions';

const exerciseReducer = (state = { exercises: [] }, action) => {
  switch (action.type) {
    case 'ADD_EXERCISE':
      return Object.assign({}, state, {
        exercises: [
          ...state.exercises,
          {
            id: action.id,
            name: action.name,
            sets: []
          }
        ]
      });

    case 'ADD_EXERCISE_DETAILS':
      const index = state.exercises.findIndex(function(exercise) {
        return exercise.id === action.id;
      });

      var state_update = Object.assign({}, state);
      state_update.exercises[index].sets.push({
        reps: action.reps,
        weight: action.weight
      });
      return state_update;

    default:
      return state;
  }
};

const workoutReducer = (state = { workouts: [], workout: {} }, action) => {
  switch (action.type) {
    case 'SAVE_WORKOUT':
      return Object.assign({}, state, {
        workouts: [
          ...state.workouts,
          {
            name: action.name,
            date: action.date,
            storedSessoin: [...state]
          }
        ]
      });
    case 'FETCH_WORKOUTS':
      return Object.assign({}, state, {
        workouts: [...action.workouts]
      });

    case 'FETCH_WORKOUT':
      return Object.assign({}, state, {
        workout: action.workout
      });

    default:
      return state;
  }
};
const authReducer = (
  state = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('id_token'),
    errorMessage: ''
  },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    default:
      return state;
  }
};

const reducer = combineReducers({
  authReducer,
  exerciseReducer,
  formReducer,
  workoutReducer
});

export default reducer;
