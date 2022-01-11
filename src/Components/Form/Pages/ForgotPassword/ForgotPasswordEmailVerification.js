import * as React from "react";

// @mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// formik
import { Formik, Form } from "formik";
import * as Yup from "yup";

// axios - api call
import axios from "axios";

// styles & history
// import { useHistory } from "react-router";

const ForgotPasswordCheckEmailvalidation = (props) => {
  const otpValidation = Yup.object().shape({
    otp: Yup.string()
      .matches(
        /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/,
        "Must be only digits"
      )
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits")
      .required("Required"),
  });

  const checkOtp = (formOtp) => {
    const otp = parseInt(formOtp);
    const body = { otp };
    axios
      .post("http://localhost:7686/auth/otp-verify", body)
      .then((result) => {
        if (result.data.isValid) {
          console.log("result :::", result.data);
          props.getOtpIsValid(false);
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
          OTP
        </Typography>

        <Formik
          initialValues={{
            otp: "",
          }}
          validationSchema={otpValidation}
          onSubmit={async (values) => {
            checkOtp(values.otp);
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="otp"
                    name="otp"
                    label="Otp"
                    value={values.otp}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                  />
                  {errors.otp && touched.otp && (
                    <div style={{ color: "red" }}>{errors.otp}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} align="center">
                  <Button
                    type="submit"
                    sx={{ width: 200, m: 3 }}
                    variant="contained"
                    color="success"
                  >
                    Submit OTP
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

export default ForgotPasswordCheckEmailvalidation;
