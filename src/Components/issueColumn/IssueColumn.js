import React from 'react';
import { makeStyles, Paper, Typography, Box, Divider } from '@material-ui/core/';
import { Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  column: {
    padding: '15px',
    width: '31.5%',
  },
}));
export default ({ column, children }) => {
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
          <Box borderRadius={2} p={1} mb={2}>
            <Typography align="center">{column}</Typography>
            <Divider variant="fullwidth" />
          </Box>
          {children()}
          {provided.placeholder}
        </Paper>
      )}
    </Droppable>
  );
};
