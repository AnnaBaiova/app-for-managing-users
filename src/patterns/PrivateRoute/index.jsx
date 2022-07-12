import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { SIGN_IN } from 'Utils/router-helpers';

const PrivateRoute = ({ element, condition, redirectTo }) => (
  condition === true
    ? element
    : <Navigate to={redirectTo} />
);

PrivateRoute.propTypes = {
  element: PropTypes.node,
  redirectTo: PropTypes.string,
  condition: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  element: null,
  redirectTo: SIGN_IN,
  condition: false,
};

export default PrivateRoute;
