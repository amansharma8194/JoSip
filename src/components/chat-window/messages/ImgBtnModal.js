/* eslint-disable react/function-component-definition */
import React from 'react';
import { Modal } from 'rsuite';
import { useModalToggle } from '../../../misc/custom-hooks';

const ImgBtnModal = ({ src, name }) => {
  const { isOpen, Open, close } = useModalToggle();
  return (
    <>
      <input
        type="image"
        alt="file"
        src={src}
        onClick={Open}
        className="mw-100 mh-100 w-auto"
      />
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img src={src} height="100%" width="100%" alt="file" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a href={src} target="_blank" rel="noopener noreferrer">
            View Original
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImgBtnModal;
