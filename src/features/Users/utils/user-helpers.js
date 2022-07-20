import * as Yup from 'yup';

export const userRoles = {
  DOCTOR: 'doctor',
  ADMIN: 'admin',
  ACCOUNTANT: 'accountant',
};

export const handleSubmit = (user, { props: { editUser, addUser, hideModal } }) => {
  if (user.id) {
    editUser(user);
  } else {
    addUser(user);
  }
  hideModal();
};

export const mapPropsToValues = ({ selectedUser: { id, email, firstName, lastName, role, status, password } }) => {
  const res = {
    id,
    email,
    firstName,
    lastName,
    role,
    status: status || 'active',
    password,
  };
  return res;
};

export const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .label('Email')
    .required()
    .test(
      'Email',
      ({ label }) => `${label} is invalid`,
      (value) => (
        value ? /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value) : true // eslint-disable-line
      ),
    )
    .email(),
  password: Yup
    .string()
    .label('Password')
    .required()
    .test(
      'passwordValid',
      ({ label }) => `${label} is invalid`,
      (value) => (value ? /(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&!+=]).{8,}/.test(value) : true),
    ),
  firstName: Yup
    .string()
    .label('FirstName')
    .required(),
  lastName: Yup
    .string()
    .label('LastName')
    .required(),
  role: Yup
    .string()
    .label('Password')
    .required(),
  status: Yup
    .string()
    .label('Status')
    .required(),
});
