import * as React from "react";

// @mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// styles
import { useHistory } from "react-router";
import { makeStyles } from "@mui/styles";

// formik
import { Formik, Form } from "formik";
import * as Yup from "yup";

// axios - api call
import axios from "axios";

const useStyles = makeStyles({
  link: {
    cursor: "pointer",
    "&:hover": {
      color: "#2e7d32",
    },
  },
});

const CheckEmail = (props) => {
  let history = useHistory();

  const classes = useStyles();

  const forgotPasswordCheckEmailvalidation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const checkEmailValue = (value) => {
    const body = { email: value.email };
    axios
      .post("http://localhost:7686/auth/forgot-password-check-email", body)
      .then((result) => {
        if (result.data.isValid) {
          console.log('result :::', result.data)
          props.getEmailIsValid(false);
          props.getEmail(result.data);
        } else {
          console.log("result :::", result);
        }
      })
      .catch((err) => {
        console.log("err :::", err);
      });
  };

  return (
    <>
      <Grid
        sx={{
          borderRadius: "25px",
          p: 2,
          boxShadow: 5,
        }}
      >
        <Typography variant="h4" align="center" sx={{ m: 1 }}>
          Forgot Password
        </Typography>

        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={forgotPasswordCheckEmailvalidation}
          onSubmit={(values) => {
            // console.log("value :::", values);
            checkEmailValue(values);
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="E-mail"
                    value={values.email}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                  />
                  {errors.email && touched.email && (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} align="center">
                  <Button
                    type="submit"
                    sx={{ width: 200, m: 3 }}
                    variant="contained"
                    color="success"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

        <Typography
          align="center"
          sx={{ m: 1 }}
          onClick={() => history.push("/sign-up")}
          className={classes.link}
        >
          Create New Account
        </Typography>
      </Grid>
    </>
  );
};

export default CheckEmail;
