import * as React from "react";
import "./App.css";
// import FormPage from "./Components/Form/FormPage";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import {AppContext} from './Lib/ContextLib'

function App() {

  const [isAuthenticated, userHasAuthenticated] = React.useState(false);
  const [isAuthToken, setIsAuthToken] = React.useState(null);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        userHasAuthenticated,
        isAuthToken,
        setIsAuthToken,
      }}
    >
      <Router>
        <Routes />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
