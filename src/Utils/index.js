const splitIssuesIntoColumns = (issues) =>
  issues.reduce(
    (acc, curr) => {
      acc[curr.status] = [...acc[curr.status], curr];
      return acc;
    },
    { TODO: [], PENDING: [], CLOSED: [] },
  );

const reorderIssues = (issues, sourceColumnKey, destColumnKey, issueUuid) => {
  const sourceColumnCopy = [...issues[sourceColumnKey]];
  const issueToChangeCulumn = sourceColumnCopy.splice(
    sourceColumnCopy.findIndex((x) => x.uuid === issueUuid),
    1,
  )[0];

  return {
    ...issues,
    [sourceColumnKey]: sourceColumnCopy,
    [destColumnKey]: [...issues[destColumnKey], issueToChangeCulumn],
  };
};

export { reorderIssues, splitIssuesIntoColumns };
