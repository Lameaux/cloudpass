import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            bottom: theme.spacing(3),
            right: theme.spacing(3),
        },
        tooltip: {
            fontSize: '1.5rem'
        }
    }),
);
export default function FloatingAddButton({
    title,
    onClick
}: {
    title: string,
    onClick: React.MouseEventHandler
}) {
    const classes = useStyles({});

    return (
        <Tooltip
            title={title}
            aria-label="add"
            placement="left"
            classes={{ tooltip: classes.tooltip }}
        >
            <Fab
                onClick={onClick}
                size="large"
                color="secondary"
                aria-label="add"
                className={classes.fab}
            >
                <AddIcon />
            </Fab>
        </Tooltip>
    );
}
