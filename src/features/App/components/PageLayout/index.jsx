import PropTypes from 'prop-types';
import { Box, styled } from '@material-ui/core';

const Container = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  paddingBottom: '3rem',
  [theme.breakpoints.down('md')]: {
    padding: '0 2rem 3rem',
    maxWidth: '100%',
  },
}));

const PageLayout = ({ children }) => (
  <Container m="4rem auto auto" maxWidth="70%" color="white">{children}</Container>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
