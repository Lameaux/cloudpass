import React, { FunctionComponent } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

type DialogProps = {
  open: boolean;
  handleClose: VoidFunction;
};

const FolderDialog: FunctionComponent<DialogProps> = ({
  open,
  handleClose
}) => {
  const classes = useStyles({});

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Folder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Folder Name"
          type="text"
          required
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FolderDialog;
