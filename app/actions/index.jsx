import * as redux from 'redux';
import uuid from 'node-uuid';
import moment from 'moment';

// export var addExercise = name => {
//   return {
//     type: 'ADD_EXERCISE',
//     id: uuid(),
//     name: name,
//     sets_reps: []
//   };
// };

export const FETCH_WORKOUTS = workouts => {
  return {
    type: 'FETCH_WORKOUTS',
    workouts
  };
};

export function addExercise(name, id) {
  const exercises_config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `bearer ${localStorage.getItem('id_token')}`
    },
    body: `name=${name}`
  };

  return dispatch => {
    return fetch(
      `http://localhost:8080/api/workouts/exercises/${id}`,
      exercises_config
    )
      .then(response => response.json())
      .then(response => {})
      .catch(err => new Error(err));
  };
}

export const FETCH_WORKOUT = workout => {
  return {
    type: 'FETCH_WORKOUT',
    workout
  };
};

export function fetchWorkout(id) {
  const exercises_config = {
    method: 'GET',
    headers: {
      Authorization: `bearer ${localStorage.getItem('id_token')}`
    }
  };

  return dispatch => {
    return fetch(`http://localhost:8080/api/workouts/${id}`, exercises_config)
      .then(response =>
        response.json().then(workout => ({
          workout,
          response
        }))
      )
      .then(({ workout, response }) => {
        if (!response.ok) {
          Promise.reject(workout);
        }
        dispatch(FETCH_WORKOUT(workout));
        Promise.resolve();
      })
      .catch(err => {
        console.log(err);
      });
  };
}

// export var saveWorkout = (state = [], action) => {
//   switch (action.type) {
//     case 'SAVE_WORKOUT':
//       return update(state, {
//         $push: [
//           {
//             workoutLabel: action.workoutLabel,
//             date: action.date,
//             storedSession: [...state]
//           }
//         ]
//       });
//     default:
//       return state;
//   }
// };

// export var createWorkout = name => {
//   return {
//     type: 'SAVE_WORKOUT',
//     name,
//     storedSessoin: [],
//     date: moment().format('MMM Do YYYY')
//   };
// };

export const fetchWorkouts = () => {
  const config = {
    headers: {
      Authorization: `bearer ${localStorage.getItem('id_token')}`
    }
  };
  return dispatch => {
    return fetch('http://localhost:8080/api/workouts', config)
      .then(response =>
        response.json().then(workouts => ({
          workouts,
          response
        }))
      )
      .then(({ workouts, response }) => {
        if (!response.ok) {
          Promise.reject(workouts);
        }
        return dispatch(FETCH_WORKOUTS(workouts));
      })
      .catch(err => new Error(err));
  };
};

export function createWorkout(name) {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `bearer ${localStorage.getItem('id_token')}`
    },
    body: `name=${name}`
  };

  return dispatch => {
    return fetch('http://localhost:8080/api/workouts', config)
      .then(response => response.json())
      .then(response => {
        Promise.resolve(response);
      })
      .catch(err => new Error(err));
  };
}
// /reps/:workout_id/exercise/:exercise_id
export function addSetsReps(workout_id, exercise_id, sets) {
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `bearer ${localStorage.getItem('id_token')}`
    },
    body: `weight=${sets.weight}&reps=${sets.reps}`
  };

  return dispatch => {
    return fetch(
      `http://localhost:8080/api/workouts/reps/${workout_id}/exercise/${exercise_id}`,
      config
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        Promise.resolve(response);
      })
      .catch(err => new Error(err));
  };
}

export var addExerciseDetails = (id, weight, reps) => {
  return {
    type: 'ADD_EXERCISE_DETAILS',
    id: id,
    weight: weight,
    reps: reps
  };
};

export var openWorkout = id => {
  return {
    type: 'OPEN_WORKOUT',
    id: id
  };
};

export var createExercie = props => {
  return {
    type: 'CREATE_POST'
  };
};

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${creds.username}&password=${creds.password}`
  };

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));
    return fetch('http://localhost:8080/auth/login', config)
      .then(response =>
        response.json().then(user => ({
          user,
          response
        }))
      )
      .then(({ user, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message));
          return Promise.reject(user);
        }

        // If login was successful, set the token in local storage
        localStorage.setItem('id_token', user.token);

        // Dispatch the success action
        return dispatch(receiveLogin(user));
      })
      .catch(err => new Error(err));
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    dispatch(receiveLogout());
  };
}
