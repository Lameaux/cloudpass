import React, { FunctionComponent } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    forgotPasswordButton: {
      marginRight: 'auto'
    }
  })
);

type DialogProps = {
  open: boolean;
  handleClose: VoidFunction;
  handleOpenResetDialog: VoidFunction;
};

const LoginDialog: FunctionComponent<DialogProps> = ({
  open,
  handleClose,
  handleOpenResetDialog
}) => {
  const classes = useStyles({});

  const openResetDialog = () => {
    handleOpenResetDialog();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Login</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To sign in to CloudPass, please enter your email address and password.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.forgotPasswordButton}
          onClick={openResetDialog}
          color="secondary"
          variant="outlined"
        >
          Reset password
        </Button>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
