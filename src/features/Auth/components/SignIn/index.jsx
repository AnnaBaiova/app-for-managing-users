import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withFormik } from 'formik';
import { ExitToApp } from '@material-ui/icons';
import { TextField, Box, Button, Typography } from '@material-ui/core';

import ErrorMessageBlock from 'Patterns/ErrorMessageBlock';

import { actions } from '../../redux/ducks';
import { actions as actionsUser } from '../../../Users/redux/ducks';
import ManageUser from '../../../Users/components/ManageUser';
import ActionButton from '../../patterns/ActionButton';
import { mapPropsToValues, handleSubmit, validationSchema } from '../../utils/sign-in-helpers';
import { UserShape } from '../../../../shapes/users-shapes';
import AuthLayout from '../AuthLayout';

const SignIn = ({ setFieldValue, signInError, addUser, users }) => {
  const [userManageModalOpen, setUserManageModalOpen] = useState(false);

  const handleFieldChange = ({ target: { value, name } }) => setFieldValue(name, value.trim());

  return (
    <AuthLayout>
      <Typography variant="h5" align="center" mb="1rem">Sign In</Typography>
      <TextField name="email" label="Email" onChange={handleFieldChange} mb="1rem" />
      <TextField name="password" label="Password" type="password" onChange={handleFieldChange} mb="1rem" />
      <ErrorMessageBlock error={signInError} />
      <ManageUser
        open={userManageModalOpen}
        hideModal={() => setUserManageModalOpen(false)}
        selectedUser={{}}
        users={users}
        isNewUser={userManageModalOpen}
        addUser={addUser}
      />
      <ActionButton type="submit" endIcon={<ExitToApp />} m="0 auto">Sign In</ActionButton>
      <Box align="center" mt="1rem">
        <Button title="Sign In" onClick={() => setUserManageModalOpen(true)}>
          <Typography variant="body1" align="center" mb="1rem">Sign Up</Typography>
        </Button>
      </Box>
    </AuthLayout>
  );
};

SignIn.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  signInError: PropTypes.string,
  addUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(UserShape)).isRequired,
};

SignIn.defaultProps = {
  signInError: null,
};

const mapStateToProps = ({
  auth: {
    signInError,
  },
  users: {
    users,
  },
}) => ({
  signInError,
  users,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    signIn: actions.signIn,
    addUser: actionsUser.addUser,
  },
  dispatch,
);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({ mapPropsToValues, handleSubmit, validationSchema }),
)(SignIn);
