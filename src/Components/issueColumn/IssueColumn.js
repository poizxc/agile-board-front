import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Box, Divider } from '@material-ui/core/';
import { Droppable } from 'react-beautiful-dnd';
import useStyles from './issueColumnStyles';

const IssueColumn = ({ column, children }) => {
  const classes = useStyles();
  return (
    <Droppable droppableId={column}>
      {(provided) => (
        <Paper
          elevation={8}
          ref={provided.innerRef}
          {...provided.droppableProps}
          key={column}
          className={classes.column}
        >
          <Box>
            <Typography align="center">{column}</Typography>
            <Divider variant="fullWidth" />
          </Box>
          {children()}
          {provided.placeholder}
        </Paper>
      )}
    </Droppable>
  );
};

IssueColumn.propTypes = {
  column: PropTypes.string,
  children: PropTypes.func,
};

export default IssueColumn;
