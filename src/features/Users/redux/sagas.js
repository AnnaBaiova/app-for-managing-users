import { takeEvery, put } from 'redux-saga/effects';
import { actions } from 'Users/redux/ducks';

import { GET_ALL_USERS, EDIT_USER, DELETE_USER, ADD_USER } from './ducks';

export function* fetchAllUsersSaga() {
  const users = JSON.parse(localStorage.getItem('users'));
  if (users) {
    yield put(actions.fetchAllUsersSuccess(users));
  } else {
    yield put(actions.fetchAllUsersFailure());
  }
  return users;
}

export function* editUserSaga({ payload }) {
  const users = JSON.parse(localStorage.getItem('users'));
  const index = users.findIndex(({ id }) => id === payload.id);
  users[index] = payload;
  localStorage.setItem('users', JSON.stringify(users));
  return yield put(actions.editUserSuccess(users));
}

export function* addUserSaga({ payload }) {
  const users = JSON.parse(localStorage.getItem('users'));
  const usersIds = users.map(({ id }) => id);
  const newUser = payload;
  newUser.id = Math.max(...usersIds) + 1;
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return yield put(actions.addUserSuccess(users));
}

export function* deleteUserSaga({ payload }) {
  const users = JSON.parse(localStorage.getItem('users'));
  const filteredUsers = users.filter(({ id }) => id !== payload);
  localStorage.setItem('users', JSON.stringify(filteredUsers));
  return yield put(actions.deleteUserSuccess(filteredUsers));
}

function* watchFetchAllUsers() {
  yield takeEvery(GET_ALL_USERS.request, fetchAllUsersSaga);
}

function* watchEditUser() {
  yield takeEvery(EDIT_USER.request, editUserSaga);
}

function* watchDeleteUser() {
  yield takeEvery(DELETE_USER.request, deleteUserSaga);
}

function* watchAddUser() {
  yield takeEvery(ADD_USER.request, addUserSaga);
}

export default [
  watchFetchAllUsers,
  watchEditUser,
  watchDeleteUser,
  watchAddUser,
];
