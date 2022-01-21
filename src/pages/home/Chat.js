/* eslint-disable react/function-component-definition */
import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import { CurrentRoomProvider } from '../../context/current-room.context';
import ChatBottom from '../../components/chat-window/Bottom';
import Messages from '../../components/chat-window/messages';
import ChatTop from '../../components/chat-window/Top';
import { useRooms } from '../../context/rooms.context';
import { transformToAdminsArr } from '../../misc/helpers';
import { auth } from '../../misc/Firebase';

const Chat = () => {
  const { chatId } = useParams();
  const rooms = useRooms();
  if (!rooms) {
    return <Loader content="Loading" center vertical size="md" speed="slow" />;
  }
  const currentRoom = rooms.find(room => room.id === chatId);
  if (!currentRoom) {
    return <h6 className="text-center mt-page">chat {chatId} not found</h6>;
  }
  const { name, description } = currentRoom;
  const admins = transformToAdminsArr(currentRoom.admins);
  const isAdmin = admins.includes(auth.currentUser.uid);
  const currentRoomdata = {
    name,
    description,
    admins,
    isAdmin,
  };

  return (
    <CurrentRoomProvider data={currentRoomdata}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
