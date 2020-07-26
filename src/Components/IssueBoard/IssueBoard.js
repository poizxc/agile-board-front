import React, { useContext } from 'react';
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
      showMessage('Successfully Edited Issue', 'success');
    } catch (e) {
      showMessage(e.message);
      console.error(e);
    }
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

  const handleModalClose = () => {
    setIssueModal({ opened: false });
  };

  return (
    <>
      <IssuesTable
        setIssueModal={setIssueModal}
        isLoading={isLoading}
        isError={isError}
        issues={issues}
        handleDelete={handleDelete}
        setIssues={setIssues}
      />
      <IssueModal
        modalData={issueModal}
        handleClose={handleModalClose}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
      />
    </>
  );
};

export default IssueBoard;
