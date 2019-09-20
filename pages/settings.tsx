import React from 'react';
import { connect } from 'react-redux';
import { NextPage } from 'next';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { closeDrawerAction } from '../domain/store';

import MyNextPageContext from '../types/MyNextPageContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      flexGrow: 1,
      padding: theme.spacing(2),
      marginTop: theme.spacing(2)
    }
  })
);

const Settings: NextPage<{}> = () => {
  const classes = useStyles({});

  return (
    <div>
      <Paper className={classes.list}>
        <Typography variant="h5" component="p">
          Change Password
        </Typography>
      </Paper>

      <Paper className={classes.list}>
        <Typography variant="h5" component="p">
          API Access
        </Typography>
      </Paper>
    </div>
  );
};

Settings.getInitialProps = async function({ store }: MyNextPageContext) {
  store.dispatch(closeDrawerAction());
  return {};
};

export default connect()(Settings);
