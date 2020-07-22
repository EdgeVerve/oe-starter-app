import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger/src';

import ftApp from './reducers';

const loggerMiddleware = createLogger();

export const store = createStore(ftApp, applyMiddleware(thunkMiddleware, loggerMiddleware));
