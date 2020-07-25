import React from 'react';
import useIssues from 'Hooks/useIssues';
import { makeStyles, CircularProgress, Container, Box, Grid } from '@material-ui/core/';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import IssueColumn from 'Components/issueColumn';
import { reorderIssues } from 'Utils';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
  },
}));

export default () => {
  const classes = useStyles();

  const { isLoading, isError, issues, setIssues } = useIssues();
  const handleOnDragEnd = ({ draggableId, source, destination }) => {
    if (!destination) {
      return;
    }

    const isTheSameColumn = destination.droppableId === source.droppableId;
    if (isTheSameColumn) {
      return;
    }

    const reorderedItems = reorderIssues(issues, source.droppableId, destination.droppableId, draggableId);
    setIssues(reorderedItems);
  };
  return (
    <Container className={classes.container} maxWidth="md">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Grid container direction="row" justify="space-between" alignItems="stretch">
            {Object.keys(issues).map((column) => (
              <IssueColumn key={column} column={column}>
                {() =>
                  issues[column].map((issue, index) => (
                    <Draggable key={issue.uuid} draggableId={issue.uuid} index={index}>
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          border={1}
                          key={issue.uuid}
                        >
                          {issue.title}
                          {issue.description}
                          {issue.estimate}
                        </Box>
                      )}
                    </Draggable>
                  ))
                }
              </IssueColumn>
            ))}
          </Grid>
        </DragDropContext>
      )}
    </Container>
  );
};
