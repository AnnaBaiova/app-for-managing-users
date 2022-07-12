import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Form } from 'formik';

const FormStyled = styled(Form)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '4rem 0',
  [theme.breakpoints.down('xs')]: {
    padding: 0,
  },
}));

const PaperStyled = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  width: '450px',
  boxShadow: '0 0 50px 0 rgba(255, 255, 255, 0.1)',
  borderRadius: '0.5rem',
  padding: '1.5rem',
});

const AuthLayout = ({ children }) => (
  <FormStyled noValidate>
    <PaperStyled variant="outlined" square>{children}</PaperStyled>
  </FormStyled>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
