const splitIssuesIntoColumns = (issues) =>
  issues.reduce(
    (acc, curr) => {
      acc[curr.status] = [...acc[curr.status], curr];
      return acc;
    },
    { TODO: [], PENDING: [], CLOSED: [] },
  );

export { splitIssuesIntoColumns };
