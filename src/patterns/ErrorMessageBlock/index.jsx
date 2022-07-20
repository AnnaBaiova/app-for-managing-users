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
      <MessageStyled>{error}</MessageStyled>
    </Box>
  );
};

ErrorMessageBlock.propTypes = {
  error: PropTypes.string,
};

ErrorMessageBlock.defaultProps = {
  error: null,
};

export default ErrorMessageBlock;
