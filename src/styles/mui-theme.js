import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

import colors from './colors';
import HeroNewRegular from '../assets/fonts/HeroNewRegular.otf';

const breakpoints = createBreakpoints({});

const newHeroRegular = {
  fontFamily: 'NewHeroRegular',
  fontStyle: 'normal',
  fontDisplay: 'block',
  fontWeight: 400,
  src: `
    local('HeroNewRegular'),
    url(${HeroNewRegular}) format('otf')
  `,
  unicodeRange: `
    U+0000-00FF,
    U+0131,
    U+0152-0153, 
    U+02BB-02BC, 
    U+02C6, 
    U+02DA,
    U+02DC,
    U+2000-206F,
    U+2074,
    U+20AC,
    U+2122,
    U+2191, 
    U+2193, 
    U+2212, 
    U+2215, 
    U+FEFF,
  `,
};

export default {
  palette: {
    primary: {
      main: colors.primaryMidnight100,
    },
    secondary: {
      main: colors.secodary,
      textPrimary: colors.white,
    },
    type: 'dark',
  },
  typography: {
    fontFamily: 'NewHeroRegular, Helvetica, Arial, sans-serif',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [newHeroRegular],
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: colors.primaryMidnight100,
      },
    },
    MuiDialog: {
      paper: {
        backgroundColor: colors.secodary,
      },
    },
    MuiContainer: {
      root: {
        backgroundColor: colors.secodary,
        paddingLeft: '0px!important',
        paddingRight: '0px!important',
        minHeight: '100vh',
      },
    },
    MuiSvgIcon: {
      root: {
        fill: colors.white,
      },
      colorError: {
        fill: colors.error,
      },
      colorAction: {
        fill: '#00c853',
      },
    },
    MuiDrawer: {
      paperAnchorLeft: {
        width: '25%',
        [breakpoints.down('xs')]: {
          width: '75%',
        },
      },
      paper: {
        zIndex: 2,
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: 'transparent',
      },
    },
    MuiTab: {
      wrapper: {
        color: colors.white,
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        [breakpoints.down('xs')]: {
          padding: '0',
        },
      },
    },
    MuiExpansionPanel: {
      root: {
        '&:before': {
          backgroundColor: colors.white,
        },
      },
    },
    MuiLinearProgress: {
      root: {
        height: 10,
      },
      determinate: {
        backgroundColor: colors.persianIndigoLighten,
      },
      bar1Determinate: {
        backgroundColor: colors.primaryMidnight50,
      },
    },
    MuiButton: {
      root: {
        padding: '5px 10px',
        fontSize: '1rem',
        textDecoration: 'none',
        backgroundColor: colors.primaryMidnight50,
        borderRadius: '5px',
        textTransform: 'capitalize',
        color: colors.white,
        transition: 'background-color 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          backgroundColor: colors.primaryMidnight50Lighten,
          boxShadow: `0 0 0.5rem ${colors.primaryMidnight50Darken}`,
        },
        '&$disabled': {
          backgroundColor: colors.primaryMidnight50Lighten,
          color: colors.white,
        },
        '& svg': {
          fill: colors.primaryMidnight50,
        },
      },
      textPrimary: {
        color: colors.primaryMidnight100,
        '&:hover': {
          backgroundColor: colors.primaryMidnight50Darken,
        },
      },
    },
    MuiSwitch: {
      colorSecondary: {
        color: colors.primaryMidnight50Darken,
        '&.Mui-checked': {
          color: colors.constantine,
          '&:hover': {
            backgroundColor: 'rgba(237, 1, 117, .2) !important',
          },
        },
        '&.Mui-checked.Mui-disabled': {
          color: colors.primaryMidnight50Darken,
        },
        '&.Mui-checked + .MuiSwitch-track': {
          backgroundColor: colors.primaryMidnight50,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          backgroundColor: colors.white,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        margin: '0.5rem 0',
        '& .MuiOutlinedInput-notchedOutline': {
          transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.primaryMidnight50,
          boxShadow: '0 0 0.5rem rgb(240, 80, 240, 0.5)',
        },
        '&.Mui-error': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.error,
            boxShadow: '0 0 0.5rem rgb(224, 40, 80, 0.5)',
          },
        },
      },
    },
    MuiFormLabel: {
      root: {
        '&.Mui-focused': {
          color: colors.primaryMidnight50,
        },
        '&.Mui-error': {
          color: colors.error,
        },
      },
    },
    MuiAppBar: {
      colorDefault: {
        backgroundColor: colors.secodary,
      },
    },
    MuiFab: {
      root: {
        position: 'fixed',
        right: '5rem',
        bottom: '3rem',
        zIndex: 999,
        backgroundColor: colors.secodary,
        '&:hover': {
          backgroundColor: colors.primaryMidnight50,
        },
      },
    },
    MuiCheckbox: {
      root: {
        '&$checked': {
          '& .MuiSvgIcon-root': {
            fill: colors.primaryMidnight50,
          },
          '&:hover, &:focus, &.Mui-focusVisible': {
            backgroundColor: 'rgba(237, 1, 117, .2) !important',
          },
        },
      },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: colors.secodaryHover,
        },
        '&.Mui-focusVisible': {
          backgroundColor: colors.secodary,
        },
        '&.Mui-disabled svg': {
          fill: 'rgba(255, 255, 255, .3)',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: colors.secodary,
        fontSize: '0.875rem',
      },
      arrow: {
        color: colors.secodary,
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: colors.secodaryHover,
      },
    },
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
    },
    MuiSelect: {
      variant: 'outlined',
    },
    MuiDialog: {
      TransitionProps: { exit: false },
    },
  },
};
