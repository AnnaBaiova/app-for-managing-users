import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { compose, display, flexbox, sizing, spacing } from '@material-ui/system';

const styles = () => ({
  minWidth: '200px',
  textTransform: 'uppercase',
  padding: '0.25rem 1.5rem',
  '& .MuiButton-label': {
    alignItems: 'flex-start',
    lineHeight: '2rem',
  },
  '& .MuiButton-iconSizeMedium': {
    marginTop: '0.25rem',
  },
});

export default styled(Button)(compose(styles, display, flexbox, spacing, sizing));
