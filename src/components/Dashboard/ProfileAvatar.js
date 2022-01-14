/* eslint-disable react/function-component-definition */
import React from 'react';
import { Avatar } from 'rsuite';
import { getnameInitials } from '../../misc/helpers';

const ProfileAvatar = ({ name, ...avatarProps }) => {
  return (
    <div>
      <Avatar circle {...avatarProps}>
        {getnameInitials(name)}
      </Avatar>
    </div>
  );
};

export default ProfileAvatar;
