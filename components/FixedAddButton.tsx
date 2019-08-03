import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: 380,
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
        fontSize: '2rem',
    },
    tooltip: {
        tooltip: {
            fontSize: "1.5rem",
        },
    },
}));

const useTooltipStyles = makeStyles(() => ({
    tooltip: {
        fontSize: "1.5rem",
    },
}));

type buttonSize = 'small' | 'medium' | 'large' | undefined;

const actions = [
    { icon: <FileCopyIcon />, name: 'Add Password', size: 'large' as buttonSize },
    { icon: <SaveIcon />, name: 'Add Note', size: "medium" as buttonSize },
    { icon: <PrintIcon />, name: 'Add Folder', size: "medium" as buttonSize },
    { icon: <PrintIcon />, name: 'Share Item', size: "medium" as buttonSize },
];

export default function FixedAddButton() {
    const classes = useStyles();
    const tooltipClasses = useTooltipStyles();

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onBlur={handleClose}
                onClick={handleClick}
                onClose={handleClose}
                onFocus={handleOpen}
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                open={open}
            >
                {actions.map(action => (
                    <SpeedDialAction
                        ButtonProps={{
                            size: action.size,
                        }}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        TooltipClasses={tooltipClasses}
                        onClick={handleClick}
                    />
                ))}
            </SpeedDial>
        </div>
    );
}
