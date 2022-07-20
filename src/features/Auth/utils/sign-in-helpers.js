import * as Yup from 'yup';

export const mapPropsToValues = () => ({
  email: '',
  password: '',
});

export const handleSubmit = ({ email, password }, { props: { signIn } }) => signIn({ email, password });

export const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .label('Email')
    .required()
    .email(),
  password: Yup
    .string()
    .label('Password')
    .required(),
});

export const signInErrors = {
  EMAIL_INCORRECT: 'Email is incorrect',
  WRONG_PASSWORD: 'Wrong password',
};
