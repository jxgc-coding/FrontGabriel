import { fade, makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#fff',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  hide: {
    display: 'none',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#fff',
    color: '#000000',
  },

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },

  subtitleMenu: {
    padding: '10px 0 10px 16px',
    color: '#272a52',
  },

  content: {
    flexGrow: 1,
    // padding: '1rem',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },

  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: +drawerWidth,
  },

  toolbar: theme.mixins.toolbar,

  grow: {
    flexGrow: 1,
  },

  nested: {
    paddingLeft: theme.spacing(6),
  },

  /*search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: '25px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },

  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },

  loadingIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '-6px',
    right: 0,
  },

  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    backgroundColor: '#e0e0e096',
    padding: theme.spacing(1, 6, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#000',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },

    '&::placeholder': {
      color: '#000',
    },
  },

  sidebar: {
    overflowY: 'hidden',
    marginBottom: 'calc(100% - 200px)',
  },

  divider: {
    backgroundColor: '#272a52 !important',
  },

  iconNavLink: {
    display: 'flex',
    width: 'fit-content',
  },*/

  menuNavLink: {
    color: 'white',
    textDecoration: 'none',
  },

  sidebarTextSeparator: {
    color: '#272a52',
    fontWeight: '600',
    padding: '8px 15px 0',
  },

  listIcon: {
    color: '#868686',
  },

  miniFooter: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },

  miniFooterSocials: {
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
  },

  socialMediaIconsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },

  socialMediaIcons: {
    cursor: 'pointer',
    transition: 'all ease-in-out .236s',
    color: 'white',

    '&:hover': {
      color: '#272a52',
    },
  },

  copyRightText: {
    color: '#000',
    padding: '8px 16px 8px 16px',
    fontSize: '0.7rem',
    textAlign: 'center',
  },
}))

export default useStyles
