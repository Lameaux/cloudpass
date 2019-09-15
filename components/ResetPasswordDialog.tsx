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
};

const ResetPasswordDialog: FunctionComponent<DialogProps> = ({
  open,
  handleClose
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To reset password in CloudPass, please enter your email address.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Reset password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPasswordDialog;
