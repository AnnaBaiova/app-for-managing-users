/* eslint-disable import/no-import-module-exports */
import { createStore, applyMiddleware } from 'redux';

import { rootReducer } from './config.reducers';
import { rootSaga, middlewareSaga } from './config.sagas';

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(middlewareSaga),
  );

  middlewareSaga.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./config.reducers.js', () => {
      store.replaceReducer('./config.reducers.js');
    });
  }

  return store;
}
