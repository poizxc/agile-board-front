import React, { useContext } from 'react';
import { CircularProgress, Container, Box, Button, Icon } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import IssueColumn from 'Components/issueColumn';
import { reorderIssues, validateDropPossibility } from 'Utils';
import { ISSUES_URL } from 'Config/constants';
import Issue from 'Components/Issue';
import { MessageContext } from 'contexts/MessageContext';
import useStyles from './IssuesTableStyles';

export default ({ setIssueModal, setIssues, issues, isLoading, isError, handleDelete }) => {
  const classes = useStyles();
  const { showMessage } = useContext(MessageContext);

  const handleOnDragEnd = async ({ draggableId, source, destination }) => {
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
        showMessage(e.message, 'error');
        console.error(e);
        setIssues(backup);
        return;
      }
    } else {
      showMessage('Issues Cannot Be Moved Back', 'warning');
      return;
    }
  };
  const renderColumns = () =>
    Object.keys(issues).map((column) => (
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
    ));
  const renderAddButton = () => (
    <Button
      size="small"
      color="primary"
      variant="contained"
      className={classes.addButton}
      onClick={() => {
        setIssueModal({ opened: true });
      }}
    >
      <Icon fontSize="small">add</Icon>
    </Button>
  );
  return (
    <Container className={classes.container} maxWidth="md">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Box className={classes.tableWrapper}>
            {isError ? (
              'Cannot fetch Issue Data :/'
            ) : (
              <>
                {renderColumns()}
                {renderAddButton()}
              </>
            )}
          </Box>
        </DragDropContext>
      )}
    </Container>
  );
};
