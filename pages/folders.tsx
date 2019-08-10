import React from 'react';
import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/FolderSpecialOutlined';

import { SERVER } from "../config";
import FolderRowData from '../types/FolderRowData';

import FloatingAddButton from '../components/FloatingAddButton';
import FolderTable from '../components/FolderTable';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pageHeader: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing(3),
        },
        title: {
            marginLeft: theme.spacing(1),
        }
    })
);

const handleAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('Clicked');
};

const Folders: NextPage<{ folders: FolderRowData[] }> = ({ folders }) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.pageHeader}>
                <FolderIcon fontSize="large" />
                <Typography className={classes.title} variant="h5" component="p">
                    Manage Folders
                </Typography>
            </div>

            <FolderTable rows={folders} />

            <FloatingAddButton title="Add Folder" onClick={handleAddButtonClick} />
        </div>
    );
}

Folders.getInitialProps = async function () {
    const res = await fetch(`${SERVER}/api/folders`);
    const folders = await res.json();

    return { folders };
}

export default Folders;
