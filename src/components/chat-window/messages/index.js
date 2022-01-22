/* eslint-disable react/function-component-definition */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { auth, database } from '../../../misc/Firebase';
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
  const handleLike = useCallback(async msgId => {
    const messageRef = database.ref(`messages/${msgId}`);
    const { uid } = auth.currentUser;
    let alertMsg;
    await messageRef.transaction(msg => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          alertMsg = 'Like Removed';
        } else {
          msg.likeCount += 1;
          if (!msg.likes) {
            msg.likes = {};
          }
          msg.likes[uid] = true;
          alertMsg = 'Like added';
        }
      }
      return msg;
    });
    Alert.success(alertMsg, 3000);
  }, []);

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No Messages yet</li>}
      {canShowMessages &&
        messages.map(msg => (
          <MessageItem
            key={msg.id}
            message={msg}
            onAdminClick={onAdminClick}
            handleLike={handleLike}
          />
        ))}
    </ul>
  );
};

export default Messages;
