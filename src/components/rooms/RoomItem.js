/* eslint-disable react/function-component-definition */
import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../Dashboard/ProfileAvatar';

const RoomItem = ({ room }) => {
  const { name, CreatedAt, lastmessage } = room;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear">{name}</h4>
        <TimeAgo
          datetime={
            lastmessage ? new Date(lastmessage.CreatedAt) : new Date(CreatedAt)
          }
          className="font-normal text-black-45"
        />
      </div>
      <div className="d-flex align-items-center text-black-70">
        {lastmessage ? (
          <>
            <div className="d-flex align-items-center">
              <ProfileAvatar
                src={lastmessage.author.avatar}
                name={lastmessage.author.name}
                size="sm"
              />
            </div>
            <div className="text-disappear ml-2">
              <div className="italic">{lastmessage.author.name}</div>
              <span>{lastmessage.text || lastmessage.file.name}</span>
            </div>
          </>
        ) : (
          <span>No messages yet...</span>
        )}{' '}
      </div>
    </div>
  );
};

export default RoomItem;
