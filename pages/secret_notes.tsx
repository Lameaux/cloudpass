import React from 'react';
import { connect } from 'react-redux';
import { NextPage } from 'next';
import fetch from 'isomorphic-unfetch';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import NoteIcon from '@material-ui/icons/ListAltOutlined';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { SERVER } from '../config';
import { loadUserData } from '../domain/store';

import FolderRowData from '../types/FolderRowData';
import SecretNoteRowData from '../types/SecretNoteRowData';
import MyNextPageContext from '../types/MyNextPageContext';

import FolderTabs from '../components/FolderTabs';
import FloatingAddButton from '../components/FloatingAddButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(3)
    },
    title: {
      marginLeft: theme.spacing(1)
    },
    list: {
      flexGrow: 1,
      marginTop: theme.spacing(2)
    }
  })
);

const handleAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  console.log('Clicked');
};

interface PageProps {
  folders: FolderRowData[];
  secretNotes: SecretNoteRowData[];
}

const SecretNotes: NextPage<PageProps> = ({ folders, secretNotes }) => {
  const classes = useStyles({});

  return (
    <div>
      <div className={classes.pageHeader}>
        <NoteIcon fontSize="large" />
        <Typography className={classes.title} variant="h5" component="p">
          Secret Notes
        </Typography>
      </div>

      <FolderTabs folders={folders} />

      <Paper className={classes.list}>
        <List>
          {secretNotes.map(secretNote => (
            <ListItem button key={secretNote.id}>
              <ListItemAvatar>
                <Avatar>{secretNote.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={secretNote.name}
                secondary="Updated 2019-02-02"
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <FloatingAddButton
        title="Add Secret Note"
        onClick={handleAddButtonClick}
      />
    </div>
  );
};

SecretNotes.getInitialProps = async function({ store }: MyNextPageContext) {
  const res = await fetch(`${SERVER}/api/user_data`);
  const json = await res.json();
  store.dispatch(loadUserData(json));

  return { folders: [], secretNotes: [] };
};

const mapStateToProps = ({ folders, secretNotes }) => ({
  folders,
  secretNotes
});

export default connect(mapStateToProps)(SecretNotes);
