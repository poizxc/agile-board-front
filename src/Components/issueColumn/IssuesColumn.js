import React from 'react';
import useIssues from 'Hooks/useIssues';
import { makeStyles, CircularProgress, Container, Box, Grid } from '@material-ui/core/';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
  },
  column: {
    padding: '15px',
    width: '30%',
  },
}));

const handleOnDragEnd = (...args) => {
  console.info({ args });
};
export default () => {
  const classes = useStyles();
  const { isLoading, isError, issues } = useIssues();
  return (
    <Container className={classes.container} maxWidth="md">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Grid container direction="row" justify="space-between" alignItems="stretch">
            {Object.keys(issues).map((column) => (
              <Droppable key={column} droppableId={column}>
                {() => (
                  <Box border={1} borderRadius={4} className={classes.column}>
                    {column}
                    {issues[column].map((issue, index) => (
                      <Draggable key={issue.uuid} draggableId={issue.uuid} index={index}>
                        {(provided, snapshot) => (
                          <Box border={1} key={issue.uuid}>
                            {issue.title}
                            {issue.description}
                            {issue.estimate}
                          </Box>
                        )}
                      </Draggable>
                    ))}
                  </Box>
                )}
              </Droppable>
            ))}
          </Grid>
        </DragDropContext>
      )}
    </Container>
  );
};
