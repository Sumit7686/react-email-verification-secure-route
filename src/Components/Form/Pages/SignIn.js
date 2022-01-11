import * as React from "react";

// @mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

// styles
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";

// formik
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Components
import UnauthenticationHeader from "../../Header/UnauthenticationHeader";

// axios - api call
import axios from "axios";
import { useAppContext } from "../../../Lib/ContextLib";

const useStyles = makeStyles({
  link: {
    cursor: "pointer",
    "&:hover": {
      color: "#2e7d32",
    },
  },
});

const SignIn = () => {
  const { userHasAuthenticated, setIsAuthToken } = useAppContext();

  let history = useHistory();

  const classes = useStyles();

  const signInvalidation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
  });

  const getData = (values) => {
    let body = { email: values.email, password: values.password };
    axios
      .post("http://localhost:7686/auth/sign-in", body)
      .then((result) => {
        if (result.data.isValid) {
          userHasAuthenticated(true);
          setIsAuthToken(result.data.token);
          history.push("/");
        } else {
          console.log("sign in result :::", result.data);
        }
      })
      .catch((err) => {
        console.log("err sign in :::", err);
      });
  };

  return (
    <>
      <UnauthenticationHeader />
      <Container maxWidth="sm" sx={{ my: 3 }}>
        <Grid
          sx={{
            borderRadius: "25px",
            p: 2,
            boxShadow: 5,
          }}
        >
          <Typography variant="h4" align="center" sx={{ m: 1 }}>
            Sign-In
          </Typography>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={signInvalidation}
            onSubmit={(values) => {
              getData(values);
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
                  <Grid item xs={12} sm={12}>
                    <TextField
                      id="password"
                      name="password"
                      label="password"
                      value={values.password}
                      onChange={handleChange}
                      fullWidth
                      variant="standard"
                    />
                    {errors.password && touched.password && (
                      <div style={{ color: "red" }}>{errors.password}</div>
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
          <Typography
            align="center"
            sx={{ m: 1 }}
            onClick={() => history.push("/forgot-password")}
            className={classes.link}
          >
            Forgot Password
          </Typography>
        </Grid>
      </Container>
    </>
  );
};

export default SignIn;
