/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Alert, Button, Modal } from 'rsuite';
import { useModalToggle } from '../../misc/custom-hooks';

const fileInputTypes = '.jpg,.png,.jpeg';
const acceptedFileInputTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isValidFile = file => acceptedFileInputTypes.includes(file.type);

const AvatarUploadButton = () => {
  const { isOpen, Open, close } = useModalToggle();
  const [img, setImg] = useState(null);

  const onInputfileChange = ev => {
    const currFiles = ev.target.files;
    if (currFiles.length === 1) {
      const file = currFiles[0];
      if (isValidFile(file)) {
        setImg(file);
        Open();
      } else {
        Alert.warning(`Wrong File Type ${file.type}`);
      }
    }
  };
  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block padded cursor-pointer"
        >
          Select new Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onInputfileChange}
          />
        </label>
        <Modal show={isOpen} close={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center">
              {img && (
                <AvatarEditor
                  image={img}
                  width={170}
                  height={170}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost">
              Upload Image
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadButton;
