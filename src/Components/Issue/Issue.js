import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Typography, Button, Paper, Box, Divider } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
const Issue = ({ issue, index, setIssueModal, handleDelete, column }) => {
  const handleEdit = () => {
    setIssueModal({ opened: true, issue, openedForColumn: column });
  };

  return (
    <Draggable draggableId={issue.uuid} index={index}>
      {(provided, snapshot) => (
        <Box mb={1}>
          <Paper elevation={6} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Box p={3}>
              <Typography variant="h6" align="center">
                {issue.title}
              </Typography>
              <Typography variant="body2"> {issue.description} </Typography>
              <Divider variant="fullWidth" style={{ marginBottom: 10, marginTop: 10 }} />
              <Typography variant="body2">Estimate: {issue.estimate} </Typography>
              <Box margin={1} display="flex" justifyContent="space-around" flexDirection="row">
                <Button onClick={handleEdit} size="small" color="primary" variant="contained">
                  <Icon fontSize="small">edit</Icon>
                </Button>

                <Button
                  onClick={() => handleDelete(issue.uuid, column)}
                  size="small"
                  color="secondary"
                  variant="contained"
                >
                  <Icon fontSize="small">delete</Icon>
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </Draggable>
  );
};

Issue.propTypes = {
  column: PropTypes.string,
  handleDelete: PropTypes.func,
  index: PropTypes.number,
  issue: PropTypes.shape({
    description: PropTypes.string,
    estimate: PropTypes.number,
    title: PropTypes.string,
    uuid: PropTypes.string,
  }),
  setIssueModal: PropTypes.func,
};

export default Issue;
