import React, { useContext, useEffect } from 'react';
import { Snackbar, Slide } from '@material-ui/core';
import { MessageContext } from 'contexts/MessageContext';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './MessageStyles';

const ErrorMessage = () => {
  const { open, severity, message, hideMessage } = useContext(MessageContext);
  const classes = useStyles();
  useEffect(() => {
    const interval = setInterval(() => {
      hideMessage();
    }, 3000);

    return () => clearInterval(interval);
  }, [hideMessage]);

  return (
    <Snackbar
      className={classes.message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      TransitionComponent={(props) => <Slide {...props} direction="left" />}
      open={open}
    >
      <MuiAlert severity={severity}>{typeof message === 'string' ? message : JSON.stringify(message)}</MuiAlert>
    </Snackbar>
  );
};

export default ErrorMessage;
