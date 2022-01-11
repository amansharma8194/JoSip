/* eslint-disable react/function-component-definition */
import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

const PrivateRoute = ({ children, ...routeProps }) => {
  const { Profile, isLoading } = useProfile();
  if (isLoading && !Profile) {
    return (
      <Container>
        <Loader vertical center size="md" content="Loading" speed="slow" />
      </Container>
    );
  }

  if (!isLoading && Profile) {
    return <Redirect to="/" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
