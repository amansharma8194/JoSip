/* eslint-disable react/function-component-definition */
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Loader, Nav } from 'rsuite';
import { useRooms } from '../../context/rooms.context';
import RoomItem from './RoomItem';

const ChatroomList = ({ topSidebarRef }) => {
  const rooms = useRooms();
  const location = useLocation();
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${topSidebarRef}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical size="md" speed="slow" content="Loading" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map(room => {
          return (
            <Nav.Item
              componentClass={Link}
              to={`/chat/${room.id}`}
              key={room.id}
              eventKey={`/chat/${room.id}`}
            >
              <RoomItem room={room} />
            </Nav.Item>
          );
        })}
    </Nav>
  );
};

export default ChatroomList;
