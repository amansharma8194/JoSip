/* eslint-disable import/no-named-as-default */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Button, Drawer, Icon } from 'rsuite';
import Dashboard from '.';
import { useMediaQuery, useModalToggle } from '../../misc/custom-hooks';

export const DashboardToggle = () => {
  const { isOpen, Open, close } = useModalToggle();
  const isMobile = useMediaQuery('(max-width: 650px)');

  return (
    <>
      <Button block color="blue" onClick={Open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
