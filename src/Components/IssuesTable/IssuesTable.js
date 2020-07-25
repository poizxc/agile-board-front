import React from 'react';
import { makeStyles, CircularProgress, Container, Box, Button, Icon } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import IssueColumn from 'Components/issueColumn';
import { reorderIssues, validateDropPossibility } from 'Utils';
import { ISSUES_URL } from 'Config/constants';
import Issue from 'Components/Issue';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
    paddingBottom: 50,
    marginBottom: 20,
    position: 'relative',
  },
}));

export default ({ setIssueModal, setIssues, issues, isLoading, isError }) => {
  const classes = useStyles();

  const handleOnDragEnd = async ({ draggableId, source, destination }) => {
    console.log({ draggableId, source, destination });
    const backup = { ...issues };
    const canBeMoved = validateDropPossibility(source, destination);
    if (canBeMoved) {
      try {
        const reorderedItems = reorderIssues(issues, source, destination, draggableId);
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
    } else {
      return;
    }
  };
  const handleDelete = async (uuid, column) => {
    try {
      await axios.delete(`${ISSUES_URL}/${uuid}`);
      setIssues({ ...issues, [column]: issues[column].filter((issue) => issue.uuid !== uuid) });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container className={classes.container} maxWidth="md">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Box flexWrap="nowrap" display="flex" direction="row" justifyContent="space-between" alignItems="stretch">
            {isError ? (
              'Cannot fetch Issue Data'
            ) : (
              <>
                {Object.keys(issues).map((column) => (
                  <IssueColumn key={column} column={column}>
                    {() =>
                      issues[column].map((issue, index) => (
                        <Issue
                          setIssueModal={setIssueModal}
                          key={issue.uuid}
                          index={index}
                          handleDelete={handleDelete}
                          issue={issue}
                          column={column}
                        ></Issue>
                      ))
                    }
                  </IssueColumn>
                ))}
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  style={{ position: 'absolute', bottom: 0, right: 0 }}
                  onClick={() => {
                    setIssueModal({ opened: true });
                  }}
                >
                  <Icon fontSize="small">add</Icon>
                </Button>
              </>
            )}
          </Box>
        </DragDropContext>
      )}
    </Container>
  );
};
