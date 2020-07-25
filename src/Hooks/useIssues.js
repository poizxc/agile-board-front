import { useState, useEffect } from 'react';
import axios from 'axios';
import { ISSUES_URL } from 'Config/constants';
import { splitIssuesIntoColumns } from 'Utils';

export default () => {
  const [issues, setIssues] = useState({
    TODO: [],
    PENDING: [],
    CLOSED: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchIssues = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const { data } = await axios.get(ISSUES_URL);

        setIssues(splitIssuesIntoColumns(data));
      } catch (error) {
        setIsError(true);
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchIssues();
  }, []);

  return { issues, isLoading, isError, setIssues };
};
