const splitIssuesIntoColumns = (issues) =>
  issues.reduce(
    (acc, curr) => {
      acc[curr.status] = [...acc[curr.status], curr];
      return acc;
    },
    { TODO: [], PENDING: [], CLOSED: [] },
  );

const reorderIssues = (issues, source, dest, issueUuid) => {
  const destColumnKey = dest.droppableId;
  const destIndex = dest.index;
  const sourceColumnKey = source.droppableId;
  const sourceIndex = source.index;
  const sourceColumnCopy = [...issues[sourceColumnKey]];
  const isMovedBetweenColumns = sourceColumnKey !== destColumnKey;
  if (isMovedBetweenColumns) {
    const destColumnCopy = [...issues[destColumnKey]];
    const [issueToChangeColumn] = sourceColumnCopy.splice(
      sourceColumnCopy.findIndex((x) => x.uuid === issueUuid),
      1,
    );
    destColumnCopy.splice(destIndex, 0, { ...issueToChangeColumn, status: destColumnKey });
    return {
      ...issues,
      [sourceColumnKey]: sourceColumnCopy,
      [destColumnKey]: destColumnCopy,
    };
  }

  const [removed] = sourceColumnCopy.splice(sourceIndex, 1);
  sourceColumnCopy.splice(destIndex, 0, removed);
  return {
    ...issues,
    [sourceColumnKey]: sourceColumnCopy,
  };
};

const validateDropPossibility = (source, destination) => {
  if (!destination) {
    return false;
  }
  if (source.droppableId === 'PENDING' && destination.droppableId === 'TODO') {
    return false;
  }
  if (source.droppableId === 'CLOSED' && destination.droppableId !== 'CLOSED') {
    return false;
  }
  return true;
};
export { validateDropPossibility, reorderIssues, splitIssuesIntoColumns };
