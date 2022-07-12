import PropTypes from 'prop-types';
import { Box, styled, Typography } from '@material-ui/core';

import colors from 'Styles/colors';

const MessageStyled = styled(Typography)({
  color: colors.error,
  '& a': {
    color: colors.success,
    textDecoration: 'none',
  },
  '& a:hover': {
    textDecoration: 'underline',
  },
});

const ErrorMessageBlock = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <Box width="100%" minHeight="40px" p=".25rem 0">
      <MessageStyled>Incorrect email or password</MessageStyled>
    </Box>
  );
};

ErrorMessageBlock.propTypes = {
  error: PropTypes.bool,
};

ErrorMessageBlock.defaultProps = {
  error: false,
};

export default ErrorMessageBlock;
