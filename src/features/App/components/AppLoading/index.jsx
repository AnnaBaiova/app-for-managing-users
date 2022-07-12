import PropTypes from 'prop-types';
import { Box, CircularProgress, Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const CircularProgressStyled = styled(CircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
});

const AppLoading = ({ loading, className, children, render }) => (
  <Container maxWidth={false} className={className}>
    {render && children}
    {loading && (
      <Box width="100%" height="100%" position="fixed" top={0} bgcolor="rgba(232, 234, 246, 0.5)">
        <CircularProgressStyled color="primary" />
      </Box>
    )}
  </Container>
);

AppLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
  render: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AppLoading.defaultProps = {
  className: null,
};

export default AppLoading;
