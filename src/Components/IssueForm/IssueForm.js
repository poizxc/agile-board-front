import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { TextField, Button, Icon, Box } from '@material-ui/core';
import * as Yup from 'yup';

const issueSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').required('Required'),
  description: Yup.string().min(2, 'Too Short!').required('Required'),
  estimate: Yup.number().integer().min(1).required('Required'),
  status: Yup.string().oneOf(['TODO', 'PENDING', 'CLOSED']),
});

const IssueForm = ({ initialData, handleOperation }) => {
  const { handleSubmit, errors, values, handleChange } = useFormik({
    initialValues: {
      status: 'TODO',
      ...initialData,
    },
    onSubmit: (values) => {
      handleOperation(values);
    },
    validationSchema: issueSchema,
  });
  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <TextField
          error={errors.title && true}
          margin="normal"
          id="title"
          label="Title"
          name="title"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleChange}
          value={values.title}
          helperText={errors.title}
        />
        <TextField
          error={errors.description && true}
          margin="normal"
          id="description"
          name="description"
          fullWidth
          variant="outlined"
          multiline
          rows={2}
          rowsMax={5}
          label="Description"
          type="text"
          onChange={handleChange}
          value={values.description}
          helperText={errors.description && errors.description}
        />
        <TextField
          error={errors.estimate && true}
          margin="normal"
          variant="outlined"
          id="estimate"
          name="estimate"
          label="Estimate"
          fullWidth
          type="number"
          onChange={handleChange}
          value={values.estimate}
          helperText={errors.estimate && errors.estimate}
        />
        <TextField
          error={errors.status && true}
          margin="normal"
          id="status"
          label="Status"
          name="status"
          disabled
          type="select"
          fullWidth
          variant="outlined"
          onChange={handleChange}
          value={values.status}
          helperText={errors.status && errors.status}
        />
        <Button type="submit" variant="contained" color="primary">
          <Icon>save_alt</Icon>
        </Button>
      </Box>
    </form>
  );
};

IssueForm.propTypes = {
  initialData: PropTypes.oneOfType([
    PropTypes.shape({
      description: PropTypes.string,
      estimate: PropTypes.number,
      title: PropTypes.string,
      status: PropTypes.oneOf(['TODO', 'PENDING', 'CLOSED']).isRequired,
      uuid: PropTypes.string,
    }).isRequired,
    PropTypes.bool.isRequired,
  ]).isRequired,
};

export default IssueForm;
