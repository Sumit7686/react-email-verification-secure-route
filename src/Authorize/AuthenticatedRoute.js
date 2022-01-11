import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../Lib/ContextLib";

// axios - api call
// import axios from "axios";

export default function AuthenticatedRoute({
  routeIsValid,
  children,
  ...rest
}) {
  const isAuthenticated = useAppContext().isAuthenticated;
  console.log("auth :::", useAppContext());

  return (
    <>
      <Route {...rest}>
        {isAuthenticated ? children : <Redirect to="/sign-in" />}
      </Route>
    </>
  );
}
