import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Icon, Box } from '@material-ui/core';
const IssueForm = ({ initialData, handleOperation }) => {
  const formik = useFormik({
    initialValues: {
      status: 'TODO',
      ...initialData,
    },
    onSubmit: (values) => {
      handleOperation(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <TextField
          margin="normal"
          id="title"
          label="Title"
          name="title"
          type="text"
          fullWidth
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        <TextField
          margin="normal"
          id="description"
          name="description"
          fullWidth
          variant="outlined"
          label="Description"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <TextField
          margin="normal"
          variant="outlined"
          id="estimate"
          name="estimate"
          label="Estimate"
          fullWidth
          min={1}
          type="number"
          onChange={formik.handleChange}
          value={formik.values.estimate}
        />
        <TextField
          margin="normal"
          id="status"
          label="Status"
          name="status"
          disabled
          type="select"
          fullWidth
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.status}
        />
        <Button type="submit" variant="contained" color="primary">
          <Icon>save_alt</Icon>
        </Button>
      </Box>
    </form>
  );
};

export default IssueForm;
