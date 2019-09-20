import React, { FunctionComponent } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import FolderRowData from '../types/FolderRowData';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

type DialogProps = {
  open: boolean;
  handleClose: VoidFunction;
  folders: FolderRowData[];
};

const PasswordDialog: FunctionComponent<DialogProps> = ({
  open,
  handleClose,
  folders
}) => {
  const classes = useStyles({});

  const [selectedFolder, setSelectedFolder] = React.useState('default');

  function handleFolderChange(event: React.ChangeEvent<{ value: string }>) {
    setSelectedFolder(event.target.value);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Password</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          required
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel htmlFor="folder">Folder</InputLabel>
          <Select value={selectedFolder} onChange={handleFolderChange}>
            <MenuItem value="default">Default</MenuItem>
            {folders.map(folder => (
              <MenuItem key={folder.id} value={folder.id}>
                {folder.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField margin="dense" id="url" label="URL" type="text" fullWidth />
        <TextField
          margin="dense"
          id="username"
          label="Username"
          type="text"
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
          id="description"
          label="Description"
          type="text"
          rows={5}
          fullWidth
          multiline
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

export default PasswordDialog;
