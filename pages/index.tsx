import React from 'react';
import { NextPage } from 'next';
import fetch from 'isomorphic-unfetch';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PasswordIcon from '@material-ui/icons/LockOutlined';

import { SERVER } from "../config";
import PasswordFolderRowData from '../types/PasswordFolderRowData';
import PasswordTable from '../components/PasswordTable';
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

const Passwords: NextPage<{ passwordFolders: PasswordFolderRowData[] }> = ({ passwordFolders }) => {
    const classes = useStyles({});

    return (
        <div>
            <div className={classes.pageHeader}>
                <PasswordIcon fontSize="large" />
                <Typography className={classes.title} variant="h5" component="p">
                    My Passwords
                </Typography>
            </div>
            {
                passwordFolders.map(({ name, rows }) => {
                    return (
                        <PasswordTable
                            key={name}
                            title={name}
                            rows={rows}
                        />
                    )
                })
            }

            <FloatingAddButton title="Add Password" onClick={handleAddButtonClick} />
        </div>
    );
}

Passwords.getInitialProps = async function () {
    const res = await fetch(`${SERVER}/api/passwords`);
    const passwordFolders = await res.json();

    return { passwordFolders };
}

export default Passwords;
