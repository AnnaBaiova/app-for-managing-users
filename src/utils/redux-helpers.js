const flowStatuses = ['request', 'success', 'failure'];

export const createFlowType = (type) => (
  flowStatuses.reduce((acc, status) => ({ ...acc, [status]: `${type}/${status}` }), {})
);

export const createAction = (type, payload, data) => ({ type, payload, data });

export const createReducer = (initialState, handlers) => (
  function reducer(state = initialState, action) {
    if (handlers[action.type]) {
      return handlers[action.type](state, action);
    }
    return state;
  }
);
