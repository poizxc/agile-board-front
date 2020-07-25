import React from 'react';
import { Modal, Button, Box, Container } from '@material-ui/core';
import IssueForm from 'Components/IssueForm';
const IssueModal = ({ ModalData: { issue }, handleClose }) => {
  const renderEdit = () => {
    return <IssueForm initialData={issue} operation="edit"></IssueForm>;
  };
  const renderCreate = () => {
    return <IssueForm initialData operation="create"></IssueForm>;
  };
  const handleCreate = () => {};
  const handleEdit = () => {};
  return (
    <Modal
      style={{ display: 'flex', justifyContent: 'center' }}
      disableAutoFocus={true}
      open={true}
      onClose={handleClose}
      aria-labelledby="form-Modal-title"
    >
      <Container style={{ outline: 'none' }} maxWidth="sm" fixed display="flex">
        <Box bgcolor="white" padding={3} marginTop={10}>
          {issue ? renderEdit(issue) : renderCreate()}
        </Box>
      </Container>
    </Modal>
  );
};

export default IssueModal;
