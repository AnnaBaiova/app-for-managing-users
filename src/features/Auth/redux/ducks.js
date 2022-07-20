import { createFlowType, createAction, createReducer } from 'Utils/redux-helpers';

const ROOT = 'auth';

export const SIGN_IN = createFlowType(`${ROOT}/SIGN_IN`);
export const SIGN_OUT = createFlowType(`${ROOT}/SIGN_OUT`);

const initialState = {
  isAuthenticated: false,
  signInError: null,
  user: null,
};

const signInRequest = (state) => ({
  ...state,
  isAuthenticated: false,
  signInError: null,
  email: null,
});

const signInSuccess = (state, { payload }) => ({
  ...state,
  isAuthenticated: true,
  user: payload,
  email: payload.email,
  signInError: null,
});

const signInFailure = (state, { payload }) => ({
  ...state,
  signInError: payload,
});

const signOut = (state) => ({
  ...state,
  isAuthenticated: false,
});

export default createReducer(initialState, {
  [SIGN_IN.request]: signInRequest,
  [SIGN_IN.success]: signInSuccess,
  [SIGN_IN.failure]: signInFailure,
  [SIGN_OUT.request]: signOut,
});

export const actions = {
  signIn: (credentials) => createAction(SIGN_IN.request, credentials),
  signInSuccess: (user) => createAction(SIGN_IN.success, user),
  signInFailure: (error) => createAction(SIGN_IN.failure, error),
  signOut: () => createAction(SIGN_OUT.request),
};
