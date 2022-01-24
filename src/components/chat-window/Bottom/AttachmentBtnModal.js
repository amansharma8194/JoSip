/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from 'rsuite';
import { useModalToggle } from '../../../misc/custom-hooks';
import { Storage } from '../../../misc/Firebase';

const MAX_SIZE = 1000 * 1024 * 5;
const AttachmentBtnModal = ({ afterUpload }) => {
  const { isOpen, Open, close } = useModalToggle();
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useParams();
  const onFileChange = files => {
    const filtered = files
      .filter(el => el.blobFile.size <= MAX_SIZE)
      .slice(0, 5);
    setFileList(filtered);
  };
  const onUpload = async () => {
    setIsLoading(true);
    try {
      const uploadPromises = fileList.map(f => {
        return Storage.ref(`chat/${chatId}`)
          .child(Date.now() + f.name)
          .put(f.blobFile, {
            cacheControl: `public max-age=${3600 * 24 * 3}`,
          });
      });
      const uploadSnaps = await Promise.all(uploadPromises);
      const snapsPromises = uploadSnaps.map(async snap => {
        return {
          ContentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
      });
      const files = await Promise.all(snapsPromises);
      await afterUpload(files);
      setIsLoading(false);
      close();
    } catch (err) {
      Alert.error(err.message, 3000);
      setIsLoading(false);
    }
  };
  return (
    <>
      <InputGroup.Button onClick={Open}>
        <Icon icon="attachment" />
      </InputGroup.Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Uploader
            value={fileList}
            fileList={fileList}
            autoUpload={false}
            action=""
            onChange={onFileChange}
            multiple
            listType="picture-text"
            className="w-100"
            disabled={isLoading}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block disabled={isLoading} onClick={onUpload}>
            <Icon icon="upload" />
            Send
          </Button>
          <div className="text-right mt-2">
            <small>*Files Size should be less than 5mb</small>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AttachmentBtnModal;
