import * as React from "react";

// @mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// styles
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";

// formik
import { Formik, Form } from "formik";
import * as Yup from "yup";

// axios-api call
import axios from "axios";

const useStyles = makeStyles({
  link: {
    cursor: "pointer",
    "&:hover": {
      color: "#2e7d32",
    },
  },
});

function SignUpData(props) {
  let history = useHistory();

  const classes = useStyles();

  const signUpvalidation = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Allow only Alphabets")
      .required("Required"),
    lastName: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Allow only Alphabets")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    userName: Yup.string().min(5, "Min 5 allow").required("Required"),
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
    phoneNumber: Yup.string()
      .matches(
        /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/,
        "Must be only digits"
      )
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Required"),
    city: Yup.string().required("Required"),
    zip: Yup.string()
      .matches(
        /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/,
        "Must be only digits"
      )
      .min(6, "Must be exactly 6 Digits")
      .max(6, "Must be exactly 6 digits")
      .required("Required"),
  });

  const sendOtp = (values) => {
    // console.log("value :::", values);
    const body = { email:values.email, userName:values.userName };
    axios
      .post("http://localhost:7686/auth/send-otp", body)
      .then((result) => {
        // console.log("send-otp result :::", result);
        if(result.data.isValid){
          props.signUpDataIsValid(false, values, result);
          // console.log('result true :::', result.data)
        }else{
          console.log('result :::', result.data);
        }
      })
      .catch((err) => {
        console.log("send-otp err :::", err);
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
          Sign-Up
        </Typography>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            city: "",
            zip: "",
          }}
          validationSchema={signUpvalidation}
          onSubmit={(values) => {
            sendOtp(values);
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    value={values.firstName}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                  />
                  {errors.firstName && touched.firstName && (
                    <div style={{ color: "red" }}>{errors.firstName}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    value={values.lastName}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                  />
                  {errors.lastName && touched.lastName && (
                    <div style={{ color: "red" }}>{errors.lastName}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="userName"
                    name="userName"
                    label="User Name"
                    value={values.userName}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                  />
                  {errors.userName && touched.userName && (
                    <div style={{ color: "red" }}>{errors.userName}</div>
                  )}
                </Grid>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="phoneNumber"
                    name="phoneNumber"
                    label="phone Number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div style={{ color: "red" }}>{errors.phoneNumber}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">
                      City
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="city"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Surat">Surat</MenuItem>
                      <MenuItem value="Ahemadabad">Ahemadabad</MenuItem>
                      <MenuItem value="Vadodra">Vadodra</MenuItem>
                    </Select>
                    {errors.city && touched.city && (
                      <div style={{ color: "red" }}>{errors.city}</div>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    value={values.zip}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                  />
                  {errors.zip && touched.zip && (
                    <div style={{ color: "red" }}>{errors.zip}</div>
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
          onClick={() => history.push("/sign-in")}
          className={classes.link}
        >
          Sign In
        </Typography>
      </Grid>
    </>
  );
}

export default SignUpData;
