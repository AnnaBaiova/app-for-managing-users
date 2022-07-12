import { createFlowType, createAction, createReducer } from 'Utils/redux-helpers';

const ROOT = 'users';

export const GET_ALL_USERS = createFlowType(`${ROOT}/GET_ALL_USERS`);
export const EDIT_USER = createFlowType(`${ROOT}/EDIT_USER`);
export const DELETE_USER = createFlowType(`${ROOT}/DELETE_USER`);
export const ADD_USER = createFlowType(`${ROOT}/ADD_USER`);

const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: false,
};

const fetchAllUsersRequest = (state) => ({
  ...state,
  loading: true,
});

const fetchAllUsersSuccess = (state, { payload }) => ({
  ...state,
  users: payload,
  loading: false,
});

const fetchAllUsersFailure = (state) => ({
  ...state,
  loading: false,
  error: true,
});

const updateUsersRequest = (state) => ({
  ...state,
  loading: true,
});

const updateUsersSuccess = (state, { payload }) => ({
  ...state,
  loading: false,
  users: payload,
});

const updateUsersFailure = (state) => ({
  ...state,
  loading: false,
  error: true,
});

export default createReducer(initialState, {
  [GET_ALL_USERS.request]: fetchAllUsersRequest,
  [GET_ALL_USERS.success]: fetchAllUsersSuccess,
  [GET_ALL_USERS.failure]: fetchAllUsersFailure,
  [EDIT_USER.request]: updateUsersRequest,
  [EDIT_USER.success]: updateUsersSuccess,
  [EDIT_USER.failure]: updateUsersFailure,
  [DELETE_USER.request]: updateUsersRequest,
  [DELETE_USER.success]: updateUsersSuccess,
  [DELETE_USER.failure]: updateUsersFailure,
  [ADD_USER.request]: updateUsersRequest,
  [ADD_USER.success]: updateUsersSuccess,
  [ADD_USER.failure]: updateUsersFailure,
});

export const actions = {
  fetchAllUsers: () => createAction(GET_ALL_USERS.request),
  fetchAllUsersSuccess: (users) => createAction(GET_ALL_USERS.success, users),
  fetchAllUsersFailure: (users) => createAction(GET_ALL_USERS.failure, users),
  editUser: (user) => createAction(EDIT_USER.request, user),
  editUserSuccess: (users) => createAction(EDIT_USER.success, users),
  editUserFailure: () => createAction(EDIT_USER.failure),
  deleteUser: (id) => createAction(DELETE_USER.request, id),
  deleteUserSuccess: (users) => createAction(DELETE_USER.success, users),
  deleteUserFailure: () => createAction(DELETE_USER.failure),
  addUser: (user) => createAction(ADD_USER.request, user),
  addUserSuccess: (users) => createAction(ADD_USER.success, users),
  addUserFailure: () => createAction(ADD_USER.failure),
};
