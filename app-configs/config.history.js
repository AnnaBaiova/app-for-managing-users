import { createBrowserHistory } from 'history';

// DO NOT CHANGE THIS VARIABLE
// this is a variable that is set internally with the configuration
// mechanism. Changing this variable will cause the application to break.
export const history = createBrowserHistory({ basename: '/' });

const path = window.location.hash.slice(1);

if (path) {
  window.location.hash = '';
  history.replace({}, '', `${window.location.pathname}${path}`);
}
