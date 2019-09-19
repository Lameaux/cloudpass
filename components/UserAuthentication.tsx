import React, { FunctionComponent, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../types/StoreState';
import { loginUser, DEMO_EMAIL, DEMO_JWT } from '../domain/store';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import ResetPasswordDialog from './ResetPasswordDialog';

const userSelector = (state: StoreState) => state.email;

const useUser = () => {
  const dispatch = useDispatch();
  const login = (email, jwt) => {
    dispatch(loginUser(email, jwt));
  };

  return { login };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(2, 2)
      },
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    title: {
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(2, 2)
    },
    subtitle: {
      padding: theme.spacing(4, 2, 4, 2)
    },
    cardActions: {
      padding: theme.spacing(3, 2)
    },
    demoAccountButton: {
      marginLeft: 'auto'
    },
    footer: {
      marginTop: theme.spacing(5),
      textAlign: 'center'
    }
  })
);

const UserAuthentication: FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles({});
  const email = useSelector(userSelector);
  const { login } = useUser();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);

  if (email !== null) {
    return <Fragment>{children}</Fragment>;
  }

  const handleLogin = () => {
    login(DEMO_EMAIL, DEMO_JWT);
  };

  const handleLoginDialogClose = () => {
    setOpenLoginDialog(false);
  };

  const handleRegisterDialogClose = () => {
    setOpenRegisterDialog(false);
  };

  const handleResetPasswordDialogClose = () => {
    setOpenResetPasswordDialog(false);
  };

  const handleResetPasswordDialogOpen = () => {
    setOpenResetPasswordDialog(true);
  };

  return (
    <Container className={classes.root} fixed>
      <div>
        <Card>
          <CardMedia className={classes.title}>
            <Typography variant="h5" component="h1">
              Welcome to CloudPass ***
            </Typography>
          </CardMedia>

          <CardMedia className={classes.subtitle}>
            <Typography gutterBottom variant="h5" component="h2">
              My Secret Vault in the Cloud.
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              Store your passwords and other secrets securely in the cloud.
            </Typography>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              Please login or create a new account.
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              There is also a demo account if you want to see CloudPass in
              action.
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              onClick={() => setOpenLoginDialog(true)}
              size="small"
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
            <Button
              onClick={() => setOpenRegisterDialog(true)}
              size="small"
              variant="outlined"
              color="secondary"
            >
              Create Account
            </Button>
            <Button
              className={classes.demoAccountButton}
              size="small"
              color="secondary"
              onClick={handleLogin}
            >
              Try Demo
            </Button>
          </CardActions>
        </Card>
        <footer className={classes.footer}>
          <p>CloudPass &copy; 2019 Lameaux</p>
          <p>Built with Next.js, Typescript, Material-UI and MongoDB.</p>
        </footer>
      </div>
      <LoginDialog
        open={openLoginDialog}
        handleClose={handleLoginDialogClose}
        handleOpenResetDialog={handleResetPasswordDialogOpen}
      />
      <RegisterDialog
        open={openRegisterDialog}
        handleClose={handleRegisterDialogClose}
      />
      <ResetPasswordDialog
        open={openResetPasswordDialog}
        handleClose={handleResetPasswordDialogClose}
      />
    </Container>
  );
};

export default UserAuthentication;
