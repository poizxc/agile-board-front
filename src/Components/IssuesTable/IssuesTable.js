import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Container, Box, Button, Icon } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import IssueColumn from 'Components/issueColumn';
import { reorderIssues, validateDropPossibility } from 'Utils';
import { ISSUES_URL } from 'Config/constants';
import Issue from 'Components/Issue';
import { MessageContext } from 'contexts/MessageContext';
import useStyles from './IssuesTableStyles';

const IssuesTable = ({ setIssueModal, setIssues, issues, isLoading, isError, handleDelete }) => {
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
      }
    } else {
      showMessage('Issues Cannot Be Moved Back', 'warning');
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
IssuesTable.propTypes = {
  setIssueModal: PropTypes.func.isRequired,
  setIssues: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  issues: PropTypes.shape({
    PENDING: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        estimate: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['TODO', 'PENDING', 'CLOSED']).isRequired,
      }),
    ),
    TODO: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        estimate: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['TODO', 'PENDING', 'CLOSED']).isRequired,
      }),
    ),
    CLOSED: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        estimate: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['TODO', 'PENDING', 'CLOSED']).isRequired,
      }),
    ),
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};
export default IssuesTable;
