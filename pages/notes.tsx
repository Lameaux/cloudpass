import React from 'react';
import { NextPage } from 'next';
import fetch from 'isomorphic-unfetch';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import NoteIcon from '@material-ui/icons/ListAltOutlined';

import { SERVER } from "../config";
import SecretNoteFolderRowData from '../types/SecretNoteFolderRowData';
import SecretNoteTable from '../components/SecretNoteTable';
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
        }
    })
);

const handleAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('Clicked');
};

const Notes: NextPage<{ notesFolders: SecretNoteFolderRowData[] }> = ({ notesFolders }) => {
    const classes = useStyles({});

    return (
        <div>
            <div className={classes.pageHeader}>
                <NoteIcon fontSize="large" />
                <Typography className={classes.title} variant="h5" component="p">
                    My Secret Notes
                </Typography>
            </div>

            {notesFolders.map(({ name, rows }) => {
                return (
                    <SecretNoteTable
                        key={name}
                        title={name}
                        rows={rows}
                    />
                )
            })}

            <FloatingAddButton title="Add Secret Note" onClick={handleAddButtonClick} />
        </div>
    );
}

Notes.getInitialProps = async function () {
    const res = await fetch(`${SERVER}/api/notes`);
    const notesFolders = await res.json();

    return { notesFolders };
}

export default Notes;
