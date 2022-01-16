/* eslint-disable react/function-component-definition */
import React from 'react';
import { Nav } from 'rsuite';
import RoomItem from './RoomItem';

const ChatroomList = ({ topSidebarRef }) => {
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${topSidebarRef}px)`,
      }}
    >
      <Nav.Item>
        <RoomItem />
      </Nav.Item>
    </Nav>
  );
};

export default ChatroomList;
