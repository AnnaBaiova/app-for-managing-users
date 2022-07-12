import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import { history, configureStore } from 'AppConfigs';
import HistoryRouter from 'Patterns/HistoryRouter';
import AppRoot from 'App/components/AppContainer';
import muiTheme from 'Styles/mui-theme';

import './index.css';

const theme = createTheme(muiTheme);
export const store = configureStore();

const RootComponent = () => (
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AppRoot />
        </HistoryRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);

ReactDOM.render(<RootComponent />, document.getElementById('root'));
