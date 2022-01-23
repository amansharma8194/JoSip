/* eslint-disable react/function-component-definition */
import React from 'react';
import { Alert, Icon, InputGroup } from 'rsuite';
import { ReactMic } from 'react-mic';
import { useCallback, useState } from 'react/cjs/react.development';
import { useParams } from 'react-router';
import { Storage } from '../../../misc/Firebase';

const AudioMsgBtn = ({ afterUpload }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useParams();
  const onClick = useCallback(() => {
    setIsRecording(p => !p);
  }, []);

  const onUpload = useCallback(
    async data => {
      setIsLoading(true);
      try {
        const snap = await Storage.ref(`chat/${chatId}`)
          .child(`audio_${Date.now()}.mp3`)
          .put(data.blob, {
            cacheControl: `public , max-age=${3600 * 24 * 3}`,
          });
        const file = {
          ContentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
        afterUpload([file]);
        setIsLoading(false);
      } catch (err) {
        Alert.error(err.message, 3000);
        setIsLoading(false);
      }
    },
    [afterUpload, chatId]
  );
  return (
    <InputGroup.Button
      onClick={onClick}
      disabled={isLoading}
      className={isRecording ? 'animate-blink' : ''}
    >
      <Icon icon="microphone" />
      <ReactMic
        record={isRecording}
        className="d-none"
        onStop={onUpload}
        mimeType="audio/mp3"
      />
    </InputGroup.Button>
  );
};

export default AudioMsgBtn;
