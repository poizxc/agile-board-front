import React, { useState } from 'react';

export const MessageContext = React.createContext();

const MessageProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('error');
  const showMessage = (message, severity = 'error') => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
  };
  const hideMessage = (message, severity = 'error') => {
    setOpen(false);
    setMessage('message');
    setSeverity('error');
  };
  return (
    <MessageContext.Provider value={{ open, message, severity, showMessage, hideMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
