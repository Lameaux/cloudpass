import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import FolderRowData from '../types/FolderRowData';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1),
        },
    }),
);

interface FolderTabsProps {
    folders: FolderRowData[]
}

const buttonColor = (selected, current) => selected === current ? 'secondary' : 'default';

export default function FolderTabs({ folders }: FolderTabsProps) {
    const classes = useStyles({});
    const [value, setValue] = React.useState(null);

    function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
        setValue(newValue);
    }

    return (
        <Paper className={classes.root}>
            <Button color={buttonColor(value, null)} onClick={() => setValue(null)}>All</Button>
            {
                folders.map(
                    folder => (
                        <Button
                            color={buttonColor(value, folder.id)}
                            key={folder.id}
                            onClick={() => setValue(folder.id)}
                        >
                            {folder.name}
                        </Button>
                    )
                )
            }
        </Paper>
    );
}
