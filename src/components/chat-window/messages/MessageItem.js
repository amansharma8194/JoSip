/* eslint-disable react/function-component-definition */
import React from 'react';
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useHover, useMediaQuery } from '../../../misc/custom-hooks';
import { auth } from '../../../misc/Firebase';
import ProfileAvatar from '../../Dashboard/ProfileAvatar';
import PresenceDot from '../../PresenceDot';
import IconBtnControl from './IconBtnControl';
import ImgBtnModal from './ImgBtnModal';
import ProfileinfoBtnModal from './ProfileinfoBtnModal';

const renderFile = file => {
  if (file.ContentType.includes('image')) {
    return (
      <div className="height-200">
        <ImgBtnModal src={file.url} name={file.name} />
      </div>
    );
  }
  return <a href={file.url}>Download {file.name}</a>;
};

const MessageItem = ({ message, onAdminClick, handleLike, handleDelete }) => {
  const { author, CreatedAt, text, file, likes, likeCount } = message;
  const isMobile = useMediaQuery('(max-width:992px)');
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;
  const [SelfRef, isHovered] = useHover();
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);
  const canShowIcons = isMobile || isHovered;
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
        <IconBtnControl
          {...(isLiked ? { color: 'red' } : {})}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="Like"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
        {isAuthor && (
          <IconBtnControl
            isVisible={canShowIcons}
            iconName="close"
            tooltip="Delete"
            onClick={() => handleDelete(message.id)}
          />
        )}
      </div>
      <div>
        {text && <span className="word-break-all">{text}</span>}
        {file && renderFile(file)}
      </div>
    </li>
  );
};

export default MessageItem;
