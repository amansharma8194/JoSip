/* eslint-disable react/function-component-definition */
import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Alert, Button, Modal } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { useModalToggle } from '../../misc/custom-hooks';
import { database, Storage } from '../../misc/Firebase';
import ProfileAvatar from './ProfileAvatar';

const fileInputTypes = '.jpg,.png,.jpeg';
const acceptedFileInputTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isValidFile = file => acceptedFileInputTypes.includes(file.type);
const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(Blob => {
      if (Blob) {
        resolve(Blob);
      } else {
        reject(new Error('File process Error'));
      }
    });
  });
};

const AvatarUploadButton = () => {
  const { isOpen, Open, close } = useModalToggle();
  const [img, setImg] = useState(null);
  const avatarEditorRef = useRef();
  const { Profile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);

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
  const onUploadClick = async () => {
    setIsLoading(true);
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    try {
      const blob = await getBlob(canvas);
      const avatarFileRef = Storage.ref(`/profiles/${Profile.uid}`).child(
        'avatar'
      );
      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public,max-age=${3600 * 24 * 3}`,
      });
      const downloadAvatarUrl = await uploadAvatarResult.ref.getDownloadURL();
      const databaseRef = database
        .ref(`/profiles/${Profile.uid}`)
        .child('avatar');
      databaseRef.set(downloadAvatarUrl);
      Alert.success('Avatar has been uploaded', 3000);
      setIsLoading(false);
      close();
    } catch (err) {
      Alert.error(err.message, 3000);
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={Profile.avatar}
        name={Profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />
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
        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center">
              {img && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              appearance="ghost"
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload Image
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadButton;
