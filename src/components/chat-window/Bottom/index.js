/* eslint-disable react/function-component-definition */
import React, { useCallback, useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';
import firebase from 'firebase/app';
import { useParams } from 'react-router';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/Firebase';

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      CreatedAt: profile.CreatedAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    CreatedAt: firebase.database.ServerValue.TIMESTAMP,
    likeCount: 0,
  };
}
const BottomChatwindow = () => {
  const [input, setInput] = useState('');
  const { Profile } = useProfile();
  const { chatId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);
  const onSendClick = async () => {
    if (input.trim() === '') {
      return;
    }
    setIsLoading(true);
    const msgData = assembleMessage(Profile, chatId);
    msgData.text = input;
    const updates = {};
    const messageId = database.ref('messages').push().key;
    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastmessage`] = {
      ...msgData,
      msgId: messageId,
    };

    try {
      await database.ref().update(updates);
      setIsLoading(false);
      setInput('');
    } catch (err) {
      Alert.error(err.message, 3000);
      setIsLoading(false);
    }
  };
  const onMessageDown = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onSendClick();
    }
  };
  return (
    <div>
      <InputGroup>
        <Input
          placeholder="write a new message..."
          value={input}
          onChange={onInputChange}
          onKeyDown={onMessageDown}
        />
        <InputGroup.Button
          appearence="primary"
          color="blue"
          onClick={onSendClick}
          disabled={isLoading}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default BottomChatwindow;
