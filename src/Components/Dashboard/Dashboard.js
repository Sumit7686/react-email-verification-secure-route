import * as React from "react";

// socket.io
import socketIO from 'socket.io-client'

// Components
import Header from '../Header/Header';

const Dashboard = () => {
  React.useEffect(() => {

  }, [])
  return (
    <>
        <Header />
        <h3>Dashboard</h3>
    </>
  );
};

export default Dashboard;
