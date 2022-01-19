/* eslint-disable react/function-component-definition */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Icon } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery } from '../../../misc/custom-hooks';
import RoominfoBtnModal from './RoominfoBtnModal';

const TopChatWindow = () => {
  const name = useCurrentRoom(v => v.name);
  const isMobile = useMediaQuery('(max-width:992px)');
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Icon
            componentClass={Link}
            icon="arrow-circle-left"
            size="2x"
            to="/"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-0 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">Todo</ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span>Todo</span>
        <RoominfoBtnModal />
      </div>
    </div>
  );
};

export default memo(TopChatWindow);
