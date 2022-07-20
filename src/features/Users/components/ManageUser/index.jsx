import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  styled,
  Checkbox,
  FormControlLabel,
  IconButton,
  FormControl,
  Typography,
  MenuItem,
} from '@material-ui/core';
import { withFormik, Form } from 'formik';
import { isEmpty } from 'lodash';
import Close from '@material-ui/icons/Close';

import Field from 'Patterns/Inputs/Field';
import Select from 'Patterns/Inputs/Select';

import { UserShape } from '../../../../shapes/users-shapes';
import { userRoles, handleSubmit, validationSchema, mapPropsToValues } from '../../utils/user-helpers';

const DialogActionsStyled = styled(DialogActions)({
  display: 'flex',
  padding: '1.5rem',
});

const IconButtonStyled = styled(IconButton)({
  position: 'absolute',
  right: '10px',
  top: '10px',
});

const FormControlLabelStyled = styled(FormControlLabel)({
  margin: '1rem .5rem',
});

const BoxStyled = styled(Box)({
  margin: '1rem .5rem',
});

const ManageUser = ({
  open,
  hideModal,
  selectedUser,
  users,
  isNewUser,
  setFieldValue,
  values,
  resetForm,
}) => {
  const [user, setUser] = useState();
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    setUser(selectedUser);
    resetForm();
  }, [selectedUser, resetForm]);

  if (isEmpty(user) && !isNewUser) {
    return null;
  }

  const handleFieldChange = ({ target: { value, name } }) => setFieldValue(name, value);

  const handleChangeStatus = (event) => {
    setUser({ ...user, status: event.target.checked ? 'active' : 'inactive' });
    setFieldValue('status', event.target.checked ? 'active' : 'inactive');
  };

  const handleChangeEmail = (event) => {
    const isThereSameEmail = users.filter(({ id }) => id !== user.id)
      .some(({ email }) => email.toLowerCase() === event.target.value.toLowerCase());
    setIsEmailValid(!isThereSameEmail);
    setUser({ ...user, email: event.target.value });
    setFieldValue('email', event.target.value);
  };

  return (
    <Dialog open={open} onClose={hideModal} scroll="body" maxWidth="sm" fullWidth>
      <Form noValidate>
        <BoxStyled>
          <Typography mb=".5rem" align="center">
            {isNewUser ? 'Create User' : 'Manage user'}
            {' '}
            {!isNewUser && user.email}
          </Typography>
          <IconButtonStyled onClick={hideModal}>
            <Close />
          </IconButtonStyled>
        </BoxStyled>
        <DialogContent>
          <FormControl fullWidth>
            <Typography m="1rem">
              Status:
              <FormControlLabelStyled
                name="status"
                control={<Checkbox />}
                checked={values.status === 'active'}
                onChange={handleChangeStatus}
                label={user.status}
              />
            </Typography>
            <Field name="email" label="email" type="text" onChange={handleChangeEmail} />
            {!isEmailValid && <Box component="span" color="red"> User with this email is already exists </Box>}
            <Field name="password" label="Password" type="password" onChange={handleFieldChange} />
            <Field name="firstName" type="text" label="firstName" onChange={handleFieldChange} />
            <Field name="lastName" type="text" label="lastName" onChange={handleFieldChange} />
            <Select onChange={handleFieldChange} name="role" value={userRoles[0]} label="role" select>
              {Object.values(userRoles).map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActionsStyled>
          <Button onClick={hideModal}>Close</Button>
          <Button type="submit">{isNewUser ? 'Add' : 'Change'}</Button>
        </DialogActionsStyled>
      </Form>
    </Dialog>
  );
};

ManageUser.propTypes = {
  open: PropTypes.bool,
  hideModal: PropTypes.func.isRequired,
  selectedUser: PropTypes.shape(UserShape).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(UserShape)).isRequired,
  isNewUser: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape(UserShape).isRequired,
  resetForm: PropTypes.func.isRequired,
};

ManageUser.defaultProps = {
  open: false,
};

export default withFormik({
  enableReinitialize: true,
  validateOnMount: true,
  mapPropsToValues,
  handleSubmit,
  validationSchema,
})(ManageUser);
