import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import extractSiteContent from '../../utils/htmlextractor';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ArticleURL(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState();

  return (
    <Formik
      initialValues={{ articleURL: '' }}
      onSubmit={(data, { resetForm }) => {
        setLoading(true);
        // get text
        extractSiteContent(data.articleURL, (out) => {
          props.onClick(out.img);
          props.onExtract(out.text);
        });
        setLoading(false);
        resetForm();
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, resetForm }) => (
        <Form className={classes.form}>
          <Typography variant="h6">Article Input</Typography>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Field
                variant="outlined"
                margin="normal"
                fullWidth
                id="url"
                label="Article URL"
                name="articleURL"
                type="url"
                as={TextField}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Extract
              </Button>
            </Grid>
          </Grid>
          <Typography variant="body">or</Typography>
        </Form>
      )}
    </Formik>
  );
}

export default ArticleURL;
