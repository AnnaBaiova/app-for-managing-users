import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { matchPath, useLocation } from 'react-router-dom';
import { Box, ListItem, ListItemText, Link } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import colors from '../../../../../styles/colors';

const DrawerLink = styled(({ to, showIndicator, nested, ...restProps }) => (
  to ? <Link to={to} {...restProps} /> : <Box {...restProps} />
))(({ showIndicator, nested }) => ({
  position: 'relative',
  '&:hover, & a:hover': {
    textDecoration: 'none',
  },
  '& a': {
    color: 'white',
  },
  ...(showIndicator && {
    '& .MuiListItem-root::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: nested ? '2.5rem' : 0,
      transform: 'translateY(-50%)',
      height: '90%',
      width: '0.25rem',
      borderRadius: '0 0.5rem 0.5rem 0',
      backgroundColor: colors.warning,
      zIndex: 1,
    },
  }),
}));

const DrawerItemStyled = styled(({ nested, ...restProps }) => (
  <ListItem {...restProps} />
))(({ nested }) => ({
  padding: nested ? '0.5rem 1rem 0.5rem 3.5rem' : '0.5rem 1rem',
}));

const DrawerItem = ({ link, text, items, onLinkClick, nested }) => {
  const { pathname } = useLocation();
  const showIndicator = useMemo(() => matchPath({ path: link, end: true }, pathname), [pathname, link]);
  const [open, setOpen] = useState(items ? pathname.slice(0, pathname.lastIndexOf('/')) === link : false);

  const handleDrawerItemClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setOpen(!open);
  };

  return (
    <DrawerLink
      key={text}
      to={!items && link}
      onClick={!items ? onLinkClick(link) : null}
      color="white"
      width="100%"
      showIndicator={showIndicator}
      nested={nested}
    >
      <DrawerItemStyled onClick={items ? handleDrawerItemClick : null} nested={nested} button>
        <ListItemText>{text}</ListItemText>
      </DrawerItemStyled>
    </DrawerLink>
  );
};

DrawerItem.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  onLinkClick: PropTypes.func.isRequired,
  nested: PropTypes.bool,
};

DrawerItem.defaultProps = {
  link: null,
  items: null,
  nested: false,
};

export default DrawerItem;
