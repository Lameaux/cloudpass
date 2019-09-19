import React, { FunctionComponent, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import {
  fade,
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import ExpandMore from '@material-ui/icons/ExpandMoreOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import NoteIcon from '@material-ui/icons/ListAltOutlined';
import PasswordIcon from '@material-ui/icons/LockOutlined';
import FolderIcon from '@material-ui/icons/FolderSpecialOutlined';
import PowerIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import Link from './Link';
import { useRouter } from 'next/router';
import Chip from '@material-ui/core/Chip';
import { StoreState } from '../types/StoreState';
import { logoutUser } from '../domain/store';

const drawerWidth = 240;

const userSelector = (state: StoreState) => state.email;

const useUser = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };

  return { logout };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    grow: {
      flexGrow: 1
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 0,
      [theme.breakpoints.up('sm')]: {
        marginRight: 36
      }
    },
    menuIcon: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1)
      }
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex'
      }
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: 0,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3, 0),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3, 1)
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3, 3)
      }
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto'
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200
      }
    },
    chip: {
      margin: theme.spacing(1)
    },
    chipLabel: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'inline'
      }
    },
    footer: {
      marginTop: theme.spacing(4),
      textAlign: 'center'
    },
    pageTitle: {
      marginLeft: theme.spacing(1)
    },
    pageTitleBox: {
      display: 'flex',
      alignItems: 'center'
    }
  })
);

const PageLayout: FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles({});

  const email = useSelector(userSelector);
  const { logout } = useUser();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const router = useRouter();

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    handleMenuClose();
    logout();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>
        <IconButton aria-label="Logout" color="inherit">
          <PowerIcon />
        </IconButton>
        <p>Logout {email}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            CloudPass***
          </Typography>
          <div className={classes.grow} />
          <div className={classes.pageTitleBox}>
            {router.route === '/' && (
              <Fragment>
                <PasswordIcon fontSize="large" />
                <Typography
                  className={classes.pageTitle}
                  variant="h5"
                  component="p"
                >
                  Passwords
                </Typography>
              </Fragment>
            )}
            {router.route === '/secret_notes' && (
              <Fragment>
                <NoteIcon fontSize="large" />
                <Typography
                  className={classes.pageTitle}
                  variant="h5"
                  component="p"
                >
                  Secret Notes
                </Typography>
              </Fragment>
            )}
            {router.route === '/folders' && (
              <Fragment>
                <FolderIcon fontSize="large" />
                <Typography
                  className={classes.pageTitle}
                  variant="h5"
                  component="p"
                >
                  Folders
                </Typography>
              </Fragment>
            )}
            {router.route === '/settings' && (
              <Fragment>
                <SettingsIcon fontSize="large" />
                <Typography
                  className={classes.pageTitle}
                  variant="h5"
                  component="p"
                >
                  Settings
                </Typography>
              </Fragment>
            )}
          </div>
          <div className={classes.grow} />
          <div>
            <Chip
              icon={<AccountCircle />}
              label={<span className={classes.chipLabel}>{email}</span>}
              onClick={handleProfileMenuOpen}
              onDelete={handleProfileMenuOpen}
              className={classes.chip}
              color="primary"
              clickable
              deleteIcon={<ExpandMore />}
            />
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
        onMouseLeave={handleDrawerClose}
        onMouseEnter={handleDrawerOpen}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List onClick={handleDrawerClose}>
          <Link href="/" color="inherit">
            <ListItem button selected={router.route === '/'}>
              <ListItemIcon className={classes.menuIcon} title="Passwords">
                <PasswordIcon />
              </ListItemIcon>
              <ListItemText primary="Passwords" />
            </ListItem>
          </Link>
          <Link href="/secret_notes" color="inherit">
            <ListItem button selected={router.route === '/secret_notes'}>
              <ListItemIcon className={classes.menuIcon} title="Secret Notes">
                <NoteIcon />
              </ListItemIcon>
              <ListItemText primary="Secret Notes" />
            </ListItem>
          </Link>
          <Link href="/folders" color="inherit">
            <ListItem button selected={router.route === '/folders'}>
              <ListItemIcon className={classes.menuIcon} title="Folders">
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Folders" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List onClick={handleDrawerClose}>
          <Link href="/settings" color="inherit">
            <ListItem button selected={router.route === '/settings'}>
              <ListItemIcon className={classes.menuIcon} title="Settings">
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <main>{children}</main>
        <footer className={classes.footer}>
          <p>CloudPass &copy; 2019 Lameaux</p>
          <p>Built with Next.js, Typescript, Material-UI and MongoDB.</p>
        </footer>
      </div>
    </div>
  );
};

export default PageLayout;
