/* eslint-disable react/function-component-definition */
import React from 'react';
import { Button, Modal } from 'rsuite';
import { useModalToggle } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../Dashboard/ProfileAvatar';

const ProfileinfoBtnModal = ({ profile, ...btnProps }) => {
  const shortName = profile.name.split(' ')[0];
  const { isOpen, Open, close } = useModalToggle();
  const { name, avatar, CreatedAt } = profile;
  const MemberSince = new Date(CreatedAt).toLocaleDateString();
  return (
    <>
      <Button {...btnProps} onClick={Open}>
        {shortName}
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProfileAvatar
            src={avatar}
            name={name}
            className="width-200 height-200 img-fullsize font-huge"
          />
          <h4 className="mt-2">{name}</h4>
          <p>Member Since {MemberSince}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfileinfoBtnModal;
