/* eslint-disable react/function-component-definition */
import React, { memo } from 'react';
import { useCurrentRoom } from '../../../context/current-room.context';

const TopChatWindow = () => {
  const name = useCurrentRoom(v => v.name);
  return <div>To{name}</div>;
};

export default memo(TopChatWindow);
