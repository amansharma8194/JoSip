/* eslint-disable react/function-component-definition */
import React from 'react';
import { Alert, Button, Divider, Drawer, Icon } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/Firebase';
import EditableInput from '../EditableInput';
import ProviderBlock from './ProviderBlock';

export const Dashboard = ({ onSignOut }) => {
  const { Profile } = useProfile();
  const onSave = async newData => {
    const nameUserRef = database.ref(`/profiles/${Profile.uid}`).child('name');
    try {
      await nameUserRef.set(newData);
      Alert.success('Nickname has been changed', 3000);
    } catch (err) {
      Alert.error(err.message, 3000);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey ,{Profile.name}</h3>
        <ProviderBlock />
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
