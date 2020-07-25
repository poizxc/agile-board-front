import React from 'react';
import { makeStyles, Box } from '@material-ui/core/';
import { Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  column: {
    padding: '15px',
    width: '30%',
  },
}));
export default ({ column, children }) => {
  const classes = useStyles();
  return (
    <Droppable droppableId={column}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          key={column}
          border={1}
          borderRadius={4}
          className={classes.column}
        >
          {column}
          {children()}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
