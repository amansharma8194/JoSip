/* eslint-disable react/function-component-definition */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { database } from '../../../misc/Firebase';
import { transformToArray } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMesages] = useState(null);
  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;
  useEffect(() => {
    const MessagesRef = database.ref('/messages');
    MessagesRef.orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transformToArray(snap.val());
        setMesages(data);
      });
    return () => {
      MessagesRef.off('value');
    };
  }, [chatId]);
  const onAdminClick = useCallback(
    async uid => {
      const adminsRef = database.ref(`/rooms/${chatId}/admins`);
      await adminsRef.transaction(admins => {
        if (admins) {
          let alertMsg;
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = 'Admin Granted Removed';
          } else {
            admins[uid] = true;
            alertMsg = 'Given Admin Granted';
          }
          Alert.success(alertMsg, 3000);
        }

        return admins;
      });
    },
    [chatId]
  );

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No Messages yet</li>}
      {canShowMessages &&
        messages.map(msg => (
          <MessageItem key={msg.id} message={msg} onAdminClick={onAdminClick} />
        ))}
    </ul>
  );
};

export default Messages;
