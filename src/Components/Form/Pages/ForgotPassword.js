import * as React from "react";

// @mui
import Container from "@mui/material/Container";

// styles
// import { useHistory } from "react-router";
// import { makeStyles } from "@mui/styles";

// Components
import UnauthenticationHeader from "../../Header/UnauthenticationHeader";
import CheckEmail from "./ForgotPassword/CheckEmail";
import SetPassword from "./ForgotPassword/SetPassword";
import ForgotPasswordEmailVerification from "./ForgotPassword/ForgotPasswordEmailVerification";

const ForgotPassword = () => {
  const [emailIsValid, setEmailIsvalid] = React.useState(true);
  const [otpIsValid, setOtpIsValid] = React.useState(false);
  const [emailSendPasswordpage, setEmailSendPasswordpage] = React.useState()

  const getEmailIsValid = (value) => {
    console.log("res value false :::", value);
    setEmailIsvalid(value);
    setOtpIsValid(true);
  };

  const getEmail = (value) => {
    console.log("email :::", value.result.email);
    setEmailSendPasswordpage(value.result.email);
  }

  const getOtpIsValid = (value) => {
    console.log("get otp is valid :::", value);
    setOtpIsValid(value);
  };

  return (
    <>
      <UnauthenticationHeader />
      <Container maxWidth="sm" sx={{ my: 3 }}>
        {emailIsValid === true && otpIsValid === false ? (
          <CheckEmail getEmailIsValid={getEmailIsValid} getEmail={getEmail} />
        ) : emailIsValid === false && otpIsValid === true ? (
          <ForgotPasswordEmailVerification getOtpIsValid={getOtpIsValid} />
        ) : (
          <SetPassword emailSendPasswordpage={emailSendPasswordpage} />
        )}
      </Container>
    </>
  );
};

export default ForgotPassword;
