import { takeEvery, put, call } from 'redux-saga/effects';

import { history } from 'AppConfigs';
import { actions as appActions } from 'App/redux/ducks';
import { actions as authActions } from 'Auth/redux/ducks';
import { USERS, SIGN_IN as SIGN_IN_ROUTE } from 'Utils/router-helpers';

import { SIGN_IN, SIGN_OUT } from './ducks';

export function* signUpSaga({ email, password }) {
  try {
    yield put(appActions.showAppLoading());
    return yield call(email, password);
  } finally {
    yield put(appActions.hideAppLoading());
  }
}

export function* signUpSuccessSaga() {
  yield history.push(SIGN_IN_ROUTE);
}

export function* signInSaga({ payload: { email, password } }) {
  try {
    yield put(appActions.showAppLoading());
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (user && user.password === password) {
      yield put(authActions.signInSuccess(user));
      localStorage.setItem('autorizedUser', JSON.stringify(user));
    } else {
      yield put(authActions.signInFailure());
    }
    return user;
  } finally {
    yield put(appActions.hideAppLoading());
  }
}

export function* checkUserSaga() {
  const autorizedUser = JSON.parse(localStorage.getItem('autorizedUser'));
  if (autorizedUser) {
    yield put(authActions.signInSuccess(autorizedUser));
  }
}

export function* signOutSaga() {
  try {
    localStorage.setItem('autorizedUser', JSON.stringify(null));
    history.push(SIGN_IN_ROUTE);
  } finally {
    yield put(appActions.hideAppLoading());
  }
}

export function signInSuccessSaga() {
  history.push(USERS);
}

function* watchSignIn() {
  yield takeEvery(SIGN_IN.request, signInSaga);
}

function* watchSignInSuccess() {
  yield takeEvery(SIGN_IN.success, signInSuccessSaga);
}

function* watchSignOut() {
  yield takeEvery(SIGN_OUT.request, signOutSaga);
}

export default [
  watchSignInSuccess,
  watchSignIn,
  watchSignOut,
];
