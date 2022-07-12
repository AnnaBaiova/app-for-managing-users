import PropTypes from 'prop-types';
import { useField } from 'formik';
import { TextField, styled } from '@material-ui/core';
import { compose, display, flexbox, spacing } from '@material-ui/system';

const Field = ({ inputProps, ...restProps }) => {
  const [field, { error, touched }] = useField(restProps);
  const value = typeof restProps.defaultValue === 'undefined' ? field.value || '' : undefined;

  return (
    <TextField
      error={!!(touched && error)}
      helperText={touched && error}
      fullWidth
      {...field}
      value={value}
      {...restProps}
      inputProps={{ spellCheck: 'false', ...inputProps }}
    />
  );
};

Field.propTypes = {
  inputProps: PropTypes.objectOf(PropTypes.any),// eslint-disable-line
};

Field.defaultProps = {
  inputProps: undefined,
};

export default styled(Field)(compose(display, flexbox, spacing));
