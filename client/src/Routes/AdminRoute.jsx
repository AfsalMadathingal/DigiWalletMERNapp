import React from 'react';
import { Route } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
  // Add your authentication logic here
  const isAuthenticated = true; // Example: Check if user is authenticated as admin

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          ""
        )
      }
    />
  );
}

export default AdminRoute;
