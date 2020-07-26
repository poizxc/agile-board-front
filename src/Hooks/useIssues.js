import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ISSUES_URL } from 'Config/constants';
import { splitIssuesIntoColumns } from 'Utils';
import { MessageContext } from 'contexts/MessageContext';

export default () => {
  const [issues, setIssues] = useState({
    TODO: [],
    PENDING: [],
    CLOSED: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { showMessage: showErrorMessage } = useContext(MessageContext);
  useEffect(() => {
    const fetchIssues = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const { data } = await axios.get(ISSUES_URL);

        setIssues(splitIssuesIntoColumns(data));
      } catch (error) {
        showErrorMessage(error.message);
        setIsError(true);
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { issues, setIssues, isLoading, isError };
};
