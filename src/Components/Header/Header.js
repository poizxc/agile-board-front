import React from 'react';
import { Paper, Box, Typography } from '@material-ui/core';

const Header = () => (
  <Paper variant="elevation">
    <Box p={2}>
      <Typography variant="h4" align="center">
        Recruitment Task - Agile Board
      </Typography>
    </Box>
  </Paper>
);

export default Header;
