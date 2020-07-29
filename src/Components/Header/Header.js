import React from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import useStyles from './HeaderStyles';

const Header = () => {
  const classes = useStyles();

  return (
    <Paper variant="elevation">
      <Box p={2}>
        <Typography variant="h1" className={classes.heading} align="center">
          Recruitment Task - Agile Board
        </Typography>
        <Typography variant="body2" className={classes.smallInfo} align="center">
          The first data loading can take a while - api goes to sleep after 30 minutes in idle mode
        </Typography>
      </Box>
    </Paper>
  );
};

export default Header;
