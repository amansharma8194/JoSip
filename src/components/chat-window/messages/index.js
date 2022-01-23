/* eslint-disable consistent-return */
/* eslint-disable react/function-component-definition */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Alert, Button } from 'rsuite';
import { auth, database, Storage } from '../../../misc/Firebase';
import { GroupBy, transformToArray } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const PAGE_SIZE = 15;
const MessagesRef = database.ref('/messages');
function shouldScrollToBottom(node, threshold = 30) {
  const percentage =
    (100 * node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0;
  return percentage > threshold;
}

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMesages] = useState(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;
  const ulRef = useRef();

  const loadMessages = useCallback(
    limitToLast => {
      const node = ulRef.current;
      MessagesRef.off();
      MessagesRef.orderByChild('roomId')
        .equalTo(chatId)
        .limitToLast(limitToLast || PAGE_SIZE)
        .on('value', snap => {
          const data = transformToArray(snap.val());
          setMesages(data);
          if (shouldScrollToBottom(node)) {
            node.scrollTop = node.scrollHeight;
          }
        });
      setLimit(p => p + PAGE_SIZE);
    },
    [chatId]
  );
  const onLoadmore = useCallback(() => {
    const node = ulRef.current;
    const oldHeight = node.scrollHeight;
    setTimeout(() => {
      const newHeight = node.scrollHeight;
      node.scrollTop = newHeight - oldHeight;
    }, 400);
    loadMessages(limit);
  }, [loadMessages, limit]);
  useEffect(() => {
    const node = ulRef.current;

    loadMessages();
    setTimeout(() => {
      node.scrollTop = node.scrollHeight;
    }, 400);
    return () => {
      MessagesRef.off('value');
    };
  }, [loadMessages]);
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
  const handleDelete = useCallback(
    async (msgId, file) => {
      // eslint-disable-next-line no-alert
      if (!window.confirm('Delte this Message')) {
        return;
      }
      const isLast = messages[messages.length - 1].id === msgId;
      const updates = {};
      updates[`/messages/${msgId}`] = null;
      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastmessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id,
        };
      }
      if (isLast && messages.length === 1) {
        updates[`/rooms/${chatId}/lastmessage`] = null;
      }
      try {
        await database.ref().update(updates);
        Alert.success('Message has been deleted', 3000);
      } catch (err) {
        return Alert.error(err.message, 3000);
      }
      if (file) {
        try {
          const fileRef = Storage.refFromURL(file.url);
          await fileRef.delete();
        } catch (err) {
          Alert.error(err.message, 3000);
        }
      }
    },
    [chatId, messages]
  );
  const renderMessages = () => {
    const Groups = GroupBy(messages, item =>
      new Date(item.CreatedAt).toDateString()
    );
    const items = [];
    Object.keys(Groups).forEach(date => {
      items.push(
        <li key={date} className="text-center mb-1">
          {date}
        </li>
      );
      const msgs = Groups[date].map(msg => (
        <MessageItem
          key={msg.id}
          message={msg}
          onAdminClick={onAdminClick}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ));
      items.push(...msgs);
    });
    return items;
  };
  return (
    <ul ref={ulRef} className="msg-list custom-scroll">
      {messages && messages.length >= PAGE_SIZE && (
        <li className="text-center mt-2 mb-2">
          <Button onClick={onLoadmore} color="green">
            Load more
          </Button>
        </li>
      )}
      {isChatEmpty && <li>No Messages yet</li>}
      {canShowMessages && renderMessages()}
    </ul>
  );
};

export default Messages;
