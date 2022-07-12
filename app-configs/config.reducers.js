import { combineReducers } from 'redux';

import auth from 'Auth/redux/ducks';
import app from 'App/redux/ducks';
import users from 'Users/redux/ducks';

export const rootReducer = combineReducers({
  auth,
  app,
  users,
});
