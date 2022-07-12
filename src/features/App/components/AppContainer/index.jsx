import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import PrivateRoute from 'Patterns/PrivateRoute';
import SignIn from 'Auth/components/SignIn';
import { SIGN_IN } from 'Utils/router-helpers';
import { actions } from 'App/redux/ducks';

import PageContainer from '../PageContainer';
import AppLoading from '../AppLoading';
import { fillStorageFakeData } from '../../../../utils/storage-helper';

const AppContainer = ({ initApplication, isAuthenticated, appLoading, appRender }) => {
  useEffect(() => {
    initApplication();
    fillStorageFakeData();
  }, [initApplication]);

  return (
    <AppLoading loading={appLoading} render={appRender}>
      <Routes>
        <Route path={SIGN_IN} element={<SignIn />} end />
        <Route
          path="*"
          element={
            <PrivateRoute condition={isAuthenticated} element={<PageContainer />} />
          }
        />
      </Routes>
    </AppLoading>
  );
};

AppContainer.propTypes = {
  initApplication: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  appLoading: PropTypes.bool.isRequired,
  appRender: PropTypes.bool.isRequired,
};

const mapStateToProps = ({
  auth: {
    isAuthenticated,
  }, app: {
    appLoading,
    appRender,
  },
}) => ({
  isAuthenticated,
  appLoading,
  appRender,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    initApplication: actions.initApplication,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
