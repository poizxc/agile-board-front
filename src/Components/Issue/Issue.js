import React from 'react';
import { Icon, Typography, Button, Box } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';

const Issue = ({ issue, index, setIssueModal }) => {
  const handleEdit = () => {
    setIssueModal({ opened: true, issue });
  };
  return (
    <Draggable draggableId={issue.uuid} index={index}>
      {(provided, snapshot) => (
        <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} border={1}>
          <Typography variant="h6" align="center">
            {issue.title}
          </Typography>
          <Typography variant="body2">description: {issue.description} </Typography>
          <Typography variant="body2">estimate: {issue.estimate} </Typography>

          <Box margin={1} display="flex" justifyContent="space-around" flexDirection="row">
            <Button onClick={handleEdit} size="small" color="primary" variant="contained">
              Edit
              <Icon fontSize="small">edit</Icon>
            </Button>

            <Button size="small" color="secondary" variant="contained">
              Delete
              <Icon fontSize="small">delete</Icon>
            </Button>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

export default Issue;
