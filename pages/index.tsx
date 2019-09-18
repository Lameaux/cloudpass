import React from 'react';
import { connect } from 'react-redux';
import { NextPage } from 'next';
import fetch from 'isomorphic-unfetch';
import {
  createStyles,
  makeStyles,
  Theme,
  fade
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { SERVER } from '../config';
import { loadUserData } from '../domain/store';

import FolderRowData from '../types/FolderRowData';
import PasswordRowData from '../types/PasswordRowData';
import MyNextPageContext from '../types/MyNextPageContext';

import FolderTabs from '../components/FolderTabs';
import FloatingAddButton from '../components/FloatingAddButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      flexGrow: 1,
      marginTop: theme.spacing(2)
    },
    search: {
      borderColor: theme.palette.primary.dark,
      borderWidth: theme.spacing(0.3),
      borderStyle: 'solid',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: 0,
      marginLeft: 0,
      marginBottom: theme.spacing(2),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
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
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
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
