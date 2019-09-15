import React from 'react';
import { connect } from 'react-redux';
import { NextPage } from 'next';
import fetch from 'isomorphic-unfetch';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PasswordIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

import { SERVER } from '../config';
import { loadUserData } from '../domain/store';

import FolderRowData from '../types/FolderRowData';
import PasswordRowData from '../types/PasswordRowData';
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

const Passwords: NextPage<{
  folders: FolderRowData[];
  passwords: PasswordRowData[];
}> = ({ folders, passwords }) => {
  const classes = useStyles({});

  return (
    <div>
      <div className={classes.pageHeader}>
        <PasswordIcon fontSize="large" />
        <Typography className={classes.title} variant="h5" component="p">
          Passwords
        </Typography>
      </div>

      <FolderTabs folders={folders} />

      <Paper className={classes.list}>
        <List>
          {passwords.map(password => (
            <ListItem button key={password.id}>
              <ListItemAvatar>
                <Avatar>{password.resourceName.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={password.resourceName}
                secondary={password.resourceLocation}
              />
              <ListItemSecondaryAction>
                <IconButton
                  title={`Edit ${password.resourceName}`}
                  edge="end"
                  aria-label="edit"
                >
                  <SettingsIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <FloatingAddButton title="Add Password" onClick={handleAddButtonClick} />
    </div>
  );
};

Passwords.getInitialProps = async function({ store }: MyNextPageContext) {
  const res = await fetch(`${SERVER}/api/user_data`);
  const json = await res.json();
  store.dispatch(loadUserData(json));

  return { folders: [], passwords: [] };
};

const mapStateToProps = ({ folders, passwords }) => ({ folders, passwords });

export default connect(mapStateToProps)(Passwords);
