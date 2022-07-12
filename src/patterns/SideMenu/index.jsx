import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  drawerRoot: {
    display: 'flex',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    zIndex: 2,
  },
  drawerOpen: {
    width: '280px',
    paddingTop: '64px',
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    boxSizing: 'border-box',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: 'hidden',
    width: '57px',
    paddingTop: '64px',
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(5),
      height: 'auto',
      top: '81px',
      borderTopRightRadius: '30%',
      borderBottomRightRadius: '30%',
      boxShadow: 'rgba(255, 255, 255, .25) 0px 0px 5px 0px',
      opacity: '.8',
      padding: '0',
      transition: 'none',
    },
  },
  toggleClosed: {
    position: 'absolute',
    left: '14px',
    bottom: '0.5rem',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      left: 'auto',
      bottom: 'auto',
    },
  },
  toggleOpen: {
    position: 'absolute',
    right: '14px',
    bottom: '0.5rem',
  },
  listClose: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export const SideMenu = ({ items }) => {
  const location = useLocation();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleLinkClick = (link) => (event) => {
    if (matchPath({ path: link, end: true }, location.pathname)) {
      event.preventDefault();
    }

    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        root: classes.drawerRoot,
        paper: open ? classes.drawerOpen : classes.drawerClose,
      }}
    >
      <List className={classes.listClose}>
        {items.map(({ link, text }) => (
          <ListItem key={link} component={Link} to={link} onClick={handleLinkClick(link)} button>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

SideMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default SideMenu;
