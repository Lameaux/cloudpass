import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type DialogProps = {
  open: boolean;
  handleClose: VoidFunction;
};

const RegisterDialog: FunctionComponent<DialogProps> = ({
  open,
  handleClose
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new account in CloudPass, please enter your email address
          and password.
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
        <TextField
          margin="dense"
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Create Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterDialog;
