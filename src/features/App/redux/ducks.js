import { createAction, createReducer } from 'Utils/redux-helpers';

const ROOT = 'app';

export const INIT_APPLICATION = `${ROOT}/INIT_APPLICATION`;
export const SHOW_APP_LOADING = `${ROOT}/SHOW_APP_LOADING`;
export const HIDE_APP_LOADING = `${ROOT}/HIDE_APP_LOADING`;
export const SET_AUTORIZE = `${ROOT}/SET_AUTORIZE`;

const initialState = {
  appLoading: false,
  appRender: true,
};

const showAppLoading = (state, { payload }) => ({
  ...state,
  appLoading: true,
  appRender: payload,
});

const hideAppLoading = (state) => ({
  ...state,
  appLoading: false,
  appRender: true,
});

export default createReducer(initialState, {
  [SHOW_APP_LOADING]: showAppLoading,
  [HIDE_APP_LOADING]: hideAppLoading,
});

export const actions = {
  showAppLoading: (appRender = true) => createAction(SHOW_APP_LOADING, appRender),
  hideAppLoading: () => createAction(HIDE_APP_LOADING),
  initApplication: () => createAction(INIT_APPLICATION),
};
