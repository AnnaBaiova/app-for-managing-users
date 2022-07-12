import { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppBar, Box, IconButton } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { ExitToApp, Menu } from '@material-ui/icons';

import { actions } from 'Auth/redux/ducks';

import Drawer from './Drawer';
import Logo from '../../../../assets/images/Brand-logo.png';
import colors from '../../../../styles/colors';

const AppBarStyled = styled(AppBar)({
  backgroundColor: colors.secodaryHover,
});

const Section = styled('section')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '.5rem 0',
  margin: '0 auto',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '70%',
  background: colors.secodaryHover,
  '& .MuiIconButton-root': {
    '&:hover': {
      background: colors.primaryMidnight100,
    },
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 'initial',
    padding: '0.5rem 1rem',
  },
}));

const PageHeader = ({ signOut, email }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => setDrawerOpen((open) => !open);

  return (
    <AppBarStyled position="sticky" color="inherit">
      <Section>
        <IconButton title="Open navigation menu" onClick={handleDrawerToggle}>
          <Menu />
        </IconButton>
        <Drawer open={drawerOpen} onToggle={handleDrawerToggle} email={email} />
        <img src={Logo} alt="logo" height="50px" width="auto" />
        <Box display="flex" alignItems="center">
          <IconButton title="Sign out" onClick={signOut}>
            <ExitToApp />
          </IconButton>
        </Box>
      </Section>
    </AppBarStyled>
  );
};

PageHeader.propTypes = {
  email: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  auth: {
    email,
  },
}) => ({
  email,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    signOut: actions.signOut,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
