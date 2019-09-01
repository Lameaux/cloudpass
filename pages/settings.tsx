import React from 'react';
import { NextPage } from 'next';
import { Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

const Settings: NextPage<{}> = () => {
    const classes = useStyles({});

    return (
        <div>
            <div className={classes.pageHeader}>
                <SettingsIcon fontSize="large" />
                <Typography className={classes.title} variant="h5" component="p">
                    Settings
                </Typography>
            </div>

            <Typography variant="h6" component="p">
                API Access
            </Typography>

        </div>
    );
}

export default Settings;
