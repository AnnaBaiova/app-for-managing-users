import PropTypes from 'prop-types';

export const UserShape = {
  id: PropTypes.number,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  role: PropTypes.string,
  status: PropTypes.string,
  password: PropTypes.string,
};
