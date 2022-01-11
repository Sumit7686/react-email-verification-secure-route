import * as React from "react";

// @mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// styles
import { useHistory } from "react-router";

// formik
import { Formik, Form } from "formik";
import * as Yup from "yup";

// axios - api call
import axios from "axios";

const SetPassword = (props) => {
  let history = useHistory();

  const forgotPasswordCheckPasswordvalidation = Yup.object().shape({
    password: Yup.string()
      .required("Required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: Yup.string()
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      })
      .required("Required"),
  });

  const setNewPassword = (value) => {
    let body = { password: value.password, email: props.emailSendPasswordpage };

    axios
      .post("http://localhost:7686/auth/forgot-password", body)
      .then((result) => {
        if (result.data.isValid) {
          console.log("result :::", result.data);
          history.push("/sign-in");
        } else {
          console.log("otp not verify :::", result.data);
        }
      })
      .catch((err) => {
        console.log("otp verify err :::", err);
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
          Add New Password
        </Typography>

        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={forgotPasswordCheckPasswordvalidation}
          onSubmit={(values) => {
            // console.log("value :::", values);
            setNewPassword(values);
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
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
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div style={{ color: "red" }}>{errors.confirmPassword}</div>
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
      </Grid>
    </>
  );
};

export default SetPassword;
