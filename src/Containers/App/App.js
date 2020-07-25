import React from 'react';

import { AppHeader, AppTitle } from './AppStyles';
import useIssues from 'Hooks/useIssues';

function App() {
  const { issues, isError, isLoading } = useIssues();
  return (
    <>
      <AppHeader className="App-header">
        <AppTitle>Recruitment Task - Agile Board</AppTitle>
      </AppHeader>
    </>
  );
}

export default App;
