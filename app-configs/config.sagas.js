import { all } from 'redux-saga/effects';
import createMiddlewareSaga from 'redux-saga';

import auth from 'Auth/redux/sagas';
import app from 'App/redux/sagas';
import users from 'Users/redux/sagas';

const transform = (watchers) => watchers.map((watcher) => watcher());

export const middlewareSaga = typeof createMiddlewareSaga === 'function'
  ? createMiddlewareSaga()
  : createMiddlewareSaga.default();

const sagas = transform([
  ...auth,
  ...app,
  ...users,
]);

export function* rootSaga() {
  yield all(sagas);
}
