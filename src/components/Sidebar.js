/* eslint-disable import/no-named-as-default */
/* eslint-disable react/function-component-definition */
import React from 'react';
import CreateNewRoomModal from './Dashboard/CreateNewRoomModal';
import DashboardToggle from './Dashboard/DashboardToggle';

const Sidebar = () => {
  return (
    <div className="h-100 pt-2">
      <div>
        <DashboardToggle />
        <CreateNewRoomModal />
      </div>
      <h3>bottom</h3>
    </div>
  );
};

export default Sidebar;
