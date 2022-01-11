import * as React from "react";

// @mui
import Container from "@mui/material/Container";

// axios - api call
import axios from "axios";

// Components
import UnauthenticationHeader from "../Header/UnauthenticationHeader";
import SignUpData from "./Pages/SignUpData";
import EmailOtpVerification from "./Pages/EmailOtpVerification";

const SignUp = () => {
  const [signUpDataSubmitAndGoToOtp, setSignUpDataSubmitAndGoToOtp] =
    React.useState(true);
  const [dataStore, setDataStore] = React.useState();
  const [otpResult, setOtpResult] = React.useState();

  const signUpDataIsValid = (isValidForm, data, result) => {
    // console.log("value sign up data is valid :::", isValidForm, data, result);
    setSignUpDataSubmitAndGoToOtp(isValidForm);
    setDataStore(data);
    setOtpResult(result);
  };

  const getOtpVerification = (value) => {
    // console.log("otp verification :::", value);
    if (value) {
      const body = {
        firstName: dataStore.firstName,
        lastName: dataStore.lastName,
        userName: dataStore.userName,
        email: dataStore.email,
        password: dataStore.password,
        phoneNumber: dataStore.phoneNumber,
        city: dataStore.city,
        pincode: dataStore.zip,
      };
      // console.log("final data :::", body);
      axios
        .post("http://localhost:7686/auth/sign-up-user", body)
        .then((result) => {
          if (result.data.isValid) {
            console.log("sign up data result :::", result.data);
          } else {
            console.log("sign up data :::", result.data);
          }
        })
        .catch((err) => {
          console.log("sign-up-data err :::", err);
        });
    } else {
      console.log("not a data store.");
    }
  };

  return (
    <>
      <UnauthenticationHeader />
      <Container maxWidth="sm" sx={{ my: 3 }}>
        {signUpDataSubmitAndGoToOtp ? (
          <SignUpData signUpDataIsValid={signUpDataIsValid} />
        ) : (
          <EmailOtpVerification
            getOtpVerification={getOtpVerification}
            signUpDataIsValid={otpResult}
          />
        )}
      </Container>
    </>
  );
};

export default SignUp;
