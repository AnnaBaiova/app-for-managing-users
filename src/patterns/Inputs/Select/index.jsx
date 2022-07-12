import PropTypes from 'prop-types';
import { useField } from 'formik';
import { TextField, styled } from '@material-ui/core';
import {
  compose,
  display,
  flexbox,
  spacing,
} from '@material-ui/system';

const Select = ({ onChange, value, children, className, ...restProps }) => {
  const handleChange = ({ target }) => onChange({ [target.name]: target.value }, target.value);
  const [field, { error, touched }] = useField(restProps);

  return (
    <TextField
      onChange={handleChange}
      className={className}
      error={!!(touched && error)}
      helperText={touched && error}
      value={value || ''}
      fullWidth
      select
      {...restProps}
      {...field}
    >
      {children}
    </TextField>
  );
};

Select.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  className: PropTypes.string,
};

Select.defaultProps = {
  onChange: null,
  value: null,
  className: null,
};

export default styled(Select)(compose(display, flexbox, spacing));
