/* eslint-disable react/function-component-definition */
import React from 'react';
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useHover } from '../../../misc/custom-hooks';
import { auth } from '../../../misc/Firebase';
import ProfileAvatar from '../../Dashboard/ProfileAvatar';
import PresenceDot from '../../PresenceDot';
import ProfileinfoBtnModal from './ProfileinfoBtnModal';

const MessageItem = ({ message, onAdminClick }) => {
  const { author, CreatedAt, text } = message;
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;
  const [SelfRef, isHovered] = useHover();
  return (
    <li
      className={`cursor-pointer padded mb-1 ${isHovered ? 'bg-black-02' : ''}`}
      ref={SelfRef}
    >
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
        >
          {canGrantAdmin && (
            <Button block color="blue" onClick={() => onAdminClick(author.uid)}>
              {isMsgAuthorAdmin ? 'Remove Admin Granted' : 'Give Admin Granted'}
            </Button>
          )}
        </ProfileinfoBtnModal>
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
