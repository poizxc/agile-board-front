import React from 'react';
import { makeStyles, AppBar, Typography } from '@material-ui/core';
import IssuesTable from 'Components/IssuesTable';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className="App-header" position="relative">
        <Typography variant="h3" align="center">
          Recruitment Task - Agile Board
        </Typography>
      </AppBar>
      <IssuesTable />
    </div>
  );
}

export default App;
