import React from 'react';
import { AppBar, Typography, Button } from '@material-ui/core';
import IssuesTable from 'Components/IssuesTable';
import IssueModal from 'Components/IssueModal';

const IssueBoard = () => {
  const [issueModal, setIssueModal] = React.useState({ opened: false });
  const handleModalClose = () => {
    setIssueModal({ opened: false });
  };
  return (
    <>
      <AppBar className="App-header" position="relative">
        <Typography variant="h3" align="center">
          Recruitment Task - Agile Board
        </Typography>
      </AppBar>
      <IssuesTable setIssueModal={setIssueModal} />
      {issueModal.opened && <IssueModal ModalData={issueModal} handleClose={handleModalClose} />}
      <Button
        size="small"
        color="primary"
        variant="contained"
        onClick={() => {
          setIssueModal({ opened: true });
        }}
      >
        Create
      </Button>
    </>
  );
};

export default IssueBoard;
