/* eslint-disable react/function-component-definition */
import React from 'react';
import { Button, Drawer, Icon } from 'rsuite';
import Dashboard from '.';
import { useModalToggle } from '../misc/custom-hooks';

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalToggle();
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
