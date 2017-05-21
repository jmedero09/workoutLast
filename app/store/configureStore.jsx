import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import reducer from '../reducers/reducers';

export const configure = (initialState = {}) => {
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  const store = createStoreWithMiddleware(reducer);
  return store;
};
