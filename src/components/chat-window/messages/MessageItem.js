/* eslint-disable react/function-component-definition */
import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../Dashboard/ProfileAvatar';
import PresenceDot from '../../PresenceDot';
import ProfileinfoBtnModal from './ProfileinfoBtnModal';

const MessageItem = ({ message }) => {
  const { author, CreatedAt, text } = message;
  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        <ProfileinfoBtnModal
          profile={author}
          className="ml-1 p-0 text-black"
          appearance="link"
        />
        <TimeAgo
          datetime={CreatedAt}
          className="font-normal text-black-45 ml-2"
        />
      </div>
      <div>
        <span className="word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default MessageItem;
