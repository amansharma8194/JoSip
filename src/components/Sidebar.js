/* eslint-disable import/no-named-as-default */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useRef, useState } from 'react';
import { Divider } from 'rsuite';
import CreateNewRoomModal from './Dashboard/CreateNewRoomModal';
import DashboardToggle from './Dashboard/DashboardToggle';
import ChatroomList from './rooms/ChatroomList';

const Sidebar = () => {
  const sidebarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (sidebarRef.current) {
      setHeight(sidebarRef.current.scrollHeight);
    }
  }, [sidebarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={sidebarRef}>
        <DashboardToggle />
        <CreateNewRoomModal />
        <Divider>Join Conversation</Divider>
      </div>
      <ChatroomList topSidebarRef={height} />
    </div>
  );
};

export default Sidebar;
