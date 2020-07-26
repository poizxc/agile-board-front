import React, { useContext } from 'react';
import { Typography, Box, Paper } from '@material-ui/core';
import IssuesTable from 'Components/IssuesTable';
import IssueModal from 'Components/IssueModal';
import useIssues from 'Hooks/useIssues';
import axios from 'axios';
import { ISSUES_URL } from 'Config/constants';
import { MessageContext } from 'contexts/MessageContext';
const IssueBoard = () => {
  const [issueModal, setIssueModal] = React.useState({ opened: false });
  const { isLoading, isError, issues, setIssues } = useIssues();
  const { showMessage } = useContext(MessageContext);
  const handleCreate = async (newIssue) => {
    try {
      const { data } = await axios.post(ISSUES_URL, newIssue);
      setIssues({ ...issues, TODO: [...issues.TODO, data] });
      handleModalClose();
      showMessage('Successfully Created Issue', 'success');
    } catch (e) {
      showMessage(e.message);
      console.error(e);
    }
  };
  const handleEdit = async (newIssue) => {
    try {
      await axios.put(`${ISSUES_URL}/${newIssue.uuid}`, {
        title: newIssue.title,
        description: newIssue.description,
        status: newIssue.status,
        estimate: newIssue.estimate,
      });
      const columnCopy = [...issues[newIssue.status]];
      const indexOfChangedIssue = columnCopy.findIndex((issue) => issue.uuid === newIssue.uuid);
      columnCopy[indexOfChangedIssue] = newIssue;
      setIssues({ ...issues, [newIssue.status]: columnCopy });
      handleModalClose();
      showMessage('Successfully Created Issue', 'success');
    } catch (e) {
      showMessage(e.message);
      console.error(e);
    }
  };
  const handleModalClose = () => {
    setIssueModal({ opened: false });
  };
  const handleDelete = async (uuid, column) => {
    try {
      await axios.delete(`${ISSUES_URL}/${uuid}`);
      setIssues({ ...issues, [column]: issues[column].filter((issue) => issue.uuid !== uuid) });
      showMessage('Successfully Deleted Issue', 'success');
    } catch (e) {
      showMessage(e.message);
      console.log(e);
    }
  };
  return (
    <>
      <Paper variant="elevation">
        <Box p={2}>
          <Typography variant="h4" align="center">
            Recruitment Task - Agile Board
          </Typography>
        </Box>
      </Paper>
      <IssuesTable
        setIssueModal={setIssueModal}
        isLoading={isLoading}
        isError={isError}
        issues={issues}
        handleDelete={handleDelete}
        setIssues={setIssues}
      />
      {issueModal.opened && (
        <IssueModal
          ModalData={issueModal}
          handleClose={handleModalClose}
          handleEdit={handleEdit}
          handleCreate={handleCreate}
        />
      )}
    </>
  );
};

export default IssueBoard;
