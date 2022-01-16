/* eslint-disable import/no-named-as-default */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Alert, Button, Drawer, Icon } from 'rsuite';
import Dashboard from '.';
import { useMediaQuery, useModalToggle } from '../../misc/custom-hooks';
import { auth } from '../../misc/Firebase';

export const DashboardToggle = () => {
  const { isOpen, Open, close } = useModalToggle();
  const isMobile = useMediaQuery('(max-width: 992px)');
  const onSignOut = () => {
    auth.signOut();
    Alert.success('Signed Out', 4000);
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
