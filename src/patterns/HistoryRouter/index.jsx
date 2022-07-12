import { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';

const HistoryRouter = ({ history, ...restProps }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return <Router {...restProps} location={state.location} navigationType={state.action} navigator={history} />;
};

HistoryRouter.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    action: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    listen: PropTypes.func.isRequired,
  }).isRequired,
};

export default HistoryRouter;
