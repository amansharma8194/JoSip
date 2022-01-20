/* eslint-disable import/no-named-as-default */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Alert, Button, Drawer, Icon } from 'rsuite';
import Dashboard from '.';
import { isOfflineForDatabase } from '../../context/profile.context';
import { useMediaQuery, useModalToggle } from '../../misc/custom-hooks';
import { auth, database } from '../../misc/Firebase';

export const DashboardToggle = () => {
  const { isOpen, Open, close } = useModalToggle();
  const isMobile = useMediaQuery('(max-width: 992px)');
  const onSignOut = () => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        Alert.success('Signed Out', 4000);
        close();
      })
      .catch(err => {
        Alert.error(err.message, 3000);
      });
  };

  return (
    <>
      <Button block color="blue" onClick={Open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
