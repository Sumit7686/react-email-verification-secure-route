import * as React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// authorized Components
import Dashboard from "./Components/Dashboard/Dashboard";

// unauthorized Components
import SignIn from "./Components/Form/Pages/SignIn";
import SignUp from "./Components/Form/SignUp";
import ForgotPassword from "./Components/Form/Pages/ForgotPassword";

// Authorize
import AuthenticatedRoute from "./Authorize/AuthenticatedRoute";
import UnauthenticatedRoute from "./Authorize/UnauthenticatedRoute";
import { useAppContext } from "./Lib/ContextLib";

// axios - api call
import axios from "axios";

const Routes = () => {
  const { isAuthenticated, isAuthToken } = useAppContext();

  const checkTokenAuth = () => {
    axios
      .get("http://localhost:7686/auth/login-verify", {
        headers: { isAuthToken },
      })
      .then((result) => {
        if (result.data.isValid) {
          isAuthenticated(true);
        }
      })
      .catch((err) => {
        console.log("err login-verify :::", err);
      });
  };

  React.useEffect(() => {
    checkTokenAuth();
  });

  return (
    <Router>
      <Switch>
        <AuthenticatedRoute exact path="/">
          <Dashboard />
        </AuthenticatedRoute>
        <UnauthenticatedRoute path="/sign-in">
          <SignIn />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute path="/sign-up">
          <SignUp />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute path="/forgot-password">
          <ForgotPassword />
        </UnauthenticatedRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
