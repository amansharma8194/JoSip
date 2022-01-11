/* eslint-disable react/function-component-definition */
import React from 'react';
import { Button, Drawer, Icon } from 'rsuite';
import { useProfile } from '../../context/profile.context';

export const Dashboard = ({ onSignOut }) => {
  const { Profile } = useProfile();
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey ,{Profile.name}</h3>
      </Drawer.Body>
      <Drawer.Footer>
        <Button onClick={onSignOut} block color="red">
          <Icon icon="sign-out" />
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
