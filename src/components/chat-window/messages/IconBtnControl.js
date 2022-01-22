/* eslint-disable react/function-component-definition */
import React from 'react';
import { Badge, Icon, IconButton, Tooltip, Whisper } from 'rsuite';

const ConditionalBadge = ({ condition, children }) => {
  return condition ? <Badge content={condition}>{children}</Badge> : children;
};

const IconBtnControl = ({
  iconName,
  isVisible,
  badgeContent,
  onClick,
  tooltip,
  ...props
}) => {
  return (
    <div
      className="ml-2"
      style={{ visibility: isVisible ? 'Visible' : 'hidden' }}
    >
      <ConditionalBadge condition={badgeContent}>
        <Whisper
          placement="top"
          delay={0}
          delayHide={0}
          delayShow={0}
          trigger="hover"
          speaker={<Tooltip>{tooltip}</Tooltip>}
        >
          <IconButton
            {...props}
            onClick={onClick}
            circle
            size="xs"
            icon={<Icon icon={iconName} />}
          />
        </Whisper>
      </ConditionalBadge>
    </div>
  );
};

export default IconBtnControl;
