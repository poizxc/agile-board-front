import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button } from '@material-ui/core';
const IssueForm = ({ initialData, operation }) => {
  const formik = useFormik({
    initialValues: {
      status: 'TODO',
      ...initialData,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="title"
        label="title"
        name="title"
        type="text"
        fullWidth
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      <TextField
        id="description"
        name="description"
        fullWidth
        label="description"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      <TextField
        id="estimate"
        name="estimate"
        label="estimate"
        fullWidth
        min={1}
        type="number"
        onChange={formik.handleChange}
        value={formik.values.estimate}
      />
      <TextField
        id="status"
        label="status"
        name="status"
        disabled
        type="select"
        fullWidth
        onChange={formik.handleChange}
        value={formik.values.status}
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        {operation}
      </Button>
    </form>
  );
};

export default IssueForm;
