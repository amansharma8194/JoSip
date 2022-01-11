/* eslint-disable react/function-component-definition */
import React from 'react';
import { Button, Divider, Drawer, Icon } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInput';

export const Dashboard = ({ onSignOut }) => {
  const { Profile } = useProfile();
  const onSave = async newData => {
    console.log(newData);
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey ,{Profile.name}</h3>
        <Divider />
        <EditableInput
          initialvalue={Profile.name}
          label={<h6 className="mb-2">Nickname</h6>}
          onSave={onSave}
          name="Nickname"
        />
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
