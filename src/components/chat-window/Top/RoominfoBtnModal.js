/* eslint-disable react/function-component-definition */
import React from 'react';
import { Button, Modal } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useModalToggle } from '../../../misc/custom-hooks';

const RoominfoBtnModal = () => {
  const { isOpen, Open, close } = useModalToggle();
  const description = useCurrentRoom(v => v.description);
  const name = useCurrentRoom(v => v.name);
  return (
    <>
      <Button className="px-0" appearance="link" onClick={Open}>
        Room information
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>About {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mb-1">Description</h6>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close} block>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoominfoBtnModal;
