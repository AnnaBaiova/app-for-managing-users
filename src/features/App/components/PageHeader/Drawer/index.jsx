import PropTypes from 'prop-types';
import { matchPath, useLocation } from 'react-router-dom';
import { Avatar, Box, Drawer as MuiDrawer, IconButton, List, Typography, Link } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';

import DrawerItem from '../DrawerItem';
import { drawerItems } from '../../../utils/page-header-helpers';
import colors from '../../../../../styles/colors';

const DrawerStyles = styled(MuiDrawer)(({ theme }) => ({
  '& > .MuiDrawer-paperAnchorLeft': {
    maxWidth: '350px',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: `
      0 0 1px 2px rgba(0, 0, 0, 0.1),
      0 0 2px 4px rgba(0, 0, 0, 0.1),
      0 0 4px 8px rgba(0, 0, 0, 0.1),
      0 0 8px 16px rgba(0, 0, 0, 0.1),
      0 0 16px 32px rgba(0, 0, 0, 0.1)
    `,
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  '& > .MuiBackdrop-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const EmailStyled = styled(Link)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem',
  '&:hover': {
    textDecoration: 'none',
  },
  '& .MuiAvatar-root': {
    transition: 'box-shadow 0.25s ease',
  },
  '&:hover .MuiAvatar-root': {
    textDecoration: 'none',
    boxShadow: `0 0 1rem 0 ${colors.warning}`,
  },
});

const UserIcon = styled(Avatar)({
  color: '#040e28',
  backgroundColor: colors.warning,
  fontWeight: 'bold',
});

const Drawer = ({ open, onToggle, email }) => {
  const location = useLocation();

  const handleLinkClick = (link) => (event) => {
    event.stopPropagation();

    if (matchPath({ path: link, end: true }, location.pathname)) {
      event.preventDefault();
    }

    onToggle();
  };

  return (
    <DrawerStyles open={open} onClose={onToggle} ModalProps={{ disableScrollLock: true }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" p="0.5rem 0.5rem 0rem 1rem">
        <IconButton title="Close navigation menu" onClick={onToggle}>
          <Close />
        </IconButton>
      </Box>
      <EmailStyled to="*" color="white" textDecoration="none" onClick={onToggle}>
        <UserIcon>{email.charAt(0).toUpperCase()}</UserIcon>
        <Typography align="center" mt="0.5rem">{email}</Typography>
      </EmailStyled>
      <List>{drawerItems.map((item) => <DrawerItem key={item.text} {...item} onLinkClick={handleLinkClick} />)}</List>
    </DrawerStyles>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

Drawer.defaultProps = {
  open: false,
};

export default Drawer;
