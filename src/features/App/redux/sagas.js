import { takeEvery, put, call } from 'redux-saga/effects';
import { checkUserSaga } from 'Auth/redux/sagas';
import { INIT_APPLICATION, actions } from './ducks';

export function* initApplication() {
  try {
    yield put(actions.showAppLoading(false));
    yield call(checkUserSaga);
  } finally {
    yield put(actions.hideAppLoading());
  }
}

function* watchInitApplication() {
  yield takeEvery(INIT_APPLICATION, initApplication);
}

export default [
  watchInitApplication,
];
