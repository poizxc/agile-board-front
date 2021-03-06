import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import IssueBoard from 'Components/IssueBoard';
import * as serviceWorker from 'serviceWorker';
import MessageProvider from 'contexts/MessageContext';
import Message from 'Components/Message';
import Header from 'Components/Header';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <MessageProvider>
      <Header />
      <IssueBoard />
      <Message />
    </MessageProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
