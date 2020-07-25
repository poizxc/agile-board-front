import React from 'react';
import useIssues from 'Hooks/useIssues';
import { makeStyles, CircularProgress, Container, Grid } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import IssueColumn from 'Components/issueColumn';
import { reorderIssues } from 'Utils';
import { ISSUES_URL } from 'Config/constants';
import Issue from 'Components/Issue';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
  },
}));

export default ({ setIssueModal }) => {
  const classes = useStyles();

  const { isLoading, isError, issues, setIssues } = useIssues();
  const handleOnDragEnd = async ({ draggableId, source, destination }) => {
    const backup = { ...issues };
    if (!destination) {
      return;
    }

    const isTheSameColumn = destination.droppableId === source.droppableId;
    if (isTheSameColumn) {
      return;
    }

    try {
      const reorderedItems = reorderIssues(issues, source.droppableId, destination.droppableId, draggableId);
      setIssues(reorderedItems);
      await axios.patch(`${ISSUES_URL}/${draggableId}`, {
        status: destination.droppableId,
      });
    } catch (e) {
      console.error(e);
      setIssues(backup);
      //todo errorHandle
      return;
    }
  };
  return (
    <Container className={classes.container} maxWidth="md">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Grid container direction="row" justify="space-between" alignItems="stretch">
            {isError
              ? 'Cannot fetch Issue Data'
              : Object.keys(issues).map((column) => (
                  <IssueColumn key={column} column={column}>
                    {() =>
                      issues[column].map((issue, index) => (
                        <Issue setIssueModal={setIssueModal} key={issue.uuid} index={index} issue={issue}></Issue>
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
