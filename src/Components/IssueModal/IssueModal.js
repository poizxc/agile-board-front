import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Typography, Box, Container, Paper } from '@material-ui/core';
import IssueForm from 'Components/IssueForm';
import useStyles from 'Components/IssuesTable/IssuesTableStyles';
const IssueModal = ({ modalData: { issue }, handleClose, handleCreate, handleEdit }) => {
  const classes = useStyles();

  const renderEdit = () => {
    return <IssueForm initialData={issue} handleOperation={handleEdit}></IssueForm>;
  };
  const renderCreate = () => {
    return <IssueForm initialData handleOperation={handleCreate}></IssueForm>;
  };

  return (
    <Modal
      className={classes.modal}
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

IssueModal.propTypes = {
  modalData: PropTypes.shape({
    description: PropTypes.string,
    estimate: PropTypes.number,
    title: PropTypes.string,
    uuid: PropTypes.string,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default IssueModal;
