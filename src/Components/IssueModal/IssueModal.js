import React from 'react';
import { Modal, Typography, Box, Container, Paper } from '@material-ui/core';
import IssueForm from 'Components/IssueForm';
const IssueModal = ({ ModalData: { issue }, handleClose, handleCreate, handleEdit }) => {
  const renderEdit = () => {
    return <IssueForm initialData={issue} handleOperation={handleEdit}></IssueForm>;
  };
  const renderCreate = () => {
    return <IssueForm initialData handleOperation={handleCreate}></IssueForm>;
  };

  return (
    <Modal
      style={{ display: 'flex', justifyContent: 'center' }}
      disableAutoFocus={true}
      open={true}
      onClose={handleClose}
      aria-labelledby="form-Modal-title"
    >
      <Container style={{ outline: 'none' }} maxWidth="sm" fixed>
        <Paper elevation={24}>
          <Box bgcolor="white" padding={3} marginTop={10}>
            <Box bgcolor="primary.main" color="primary.contrastText" borderRadius={2} p={1} mb={1}>
              <Typography align="center">{issue ? 'Edit Issue' : 'Create Issue'}</Typography>
            </Box>
            {issue ? renderEdit(issue) : renderCreate()}
          </Box>
        </Paper>
      </Container>
    </Modal>
  );
};

export default IssueModal;
