import React from 'react';
import { connect } from 'react-redux';
import { NextPage } from 'next';
import fetch from 'isomorphic-unfetch';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import FolderSpecialOutlined from '@material-ui/icons/FolderSpecialOutlined';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { SERVER } from "../config";
import { loadUserData } from '../domain/store';

import FolderRowData from '../types/FolderRowData';
import MyNextPageContext from '../types/MyNextPageContext';

import FloatingAddButton from '../components/FloatingAddButton';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pageHeader: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing(3),
        },
        title: {
            marginLeft: theme.spacing(1),
        },
        list: {
            flexGrow: 1,
        },
    })
);

const handleAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('Clicked');
};

const Folders: NextPage<{ folders: FolderRowData[] }> = ({ folders }) => {
    const classes = useStyles({});

    return (
        <div>
            <div className={classes.pageHeader}>
                <FolderSpecialOutlined fontSize="large" />
                <Typography className={classes.title} variant="h5" component="p">
                    Folders
                </Typography>
            </div>

            <Paper className={classes.list}>
                <List>
                    {folders.map(
                        folder => (
                            <ListItem button key={folder.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        {folder.name.charAt(0)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={folder.name}
                                    secondary={folder.description}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    )}
                </List>
            </Paper>

            <FloatingAddButton title="Add Folder" onClick={handleAddButtonClick} />
        </div>
    );
}

Folders.getInitialProps = async function ({ store }: MyNextPageContext) {
    const res = await fetch(`${SERVER}/api/user_data`);
    const json = await res.json();
    store.dispatch(loadUserData(json));

    return { folders: [] };
}

const mapStateToProps = ({ folders }) => ({ folders })

export default connect(mapStateToProps)(Folders);
