/* eslint-disable react/function-component-definition */
import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

const PrivateRoute = ({ children, ...routeProps }) => {
  const { Profile, isLoading } = useProfile();
  if (!Profile && isLoading) {
    return (
      <Container>
        <Loader
          center
          vertical
          color="blue"
          content="Loading"
          size="md"
          speed="slow"
        />
      </Container>
    );
  }
  if (!isLoading && !Profile) {
    return <Redirect to="/signin" />;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
