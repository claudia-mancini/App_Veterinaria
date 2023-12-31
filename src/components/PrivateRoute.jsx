import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      Component={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Navigate to="/register" />
        )
      }
    />
  );
};

export default PrivateRoute;

