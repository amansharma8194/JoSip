/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Alert, Button, Icon, Tag } from 'rsuite';
import firebase from 'firebase/app';
import { auth } from '../../misc/Firebase';

const ProviderBlock = () => {
  const [isConnected, setisConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });
  const updateIsConnected = (ProviderId, value) => {
    setisConnected(p => {
      return { ...p, [ProviderId]: value };
    });
  };
  const unlink = async ProviderId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error('You need to have Atleast one Account');
      }
      await auth.currentUser.unlink(ProviderId);
      Alert.success(`Disconnected from ${ProviderId}`);
      updateIsConnected(ProviderId, false);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  const unlinkfacebook = () => {
    unlink('facebook.com');
  };
  const unlinkgoogle = () => {
    unlink('google.com');
  };
  const link = provider => {
    auth.currentUser.linkWithPopup(provider);
  };
  const linkfacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };
  const linkgoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div>
      {isConnected['google.com'] && (
        <Tag closable color="green" onClose={unlinkgoogle}>
          <Icon icon="google" />
          Connected
        </Tag>
      )}
      {isConnected['facebook.com'] && (
        <Tag closable color="blue" onClose={unlinkfacebook}>
          <Icon icon="facebook" />
          Connected
        </Tag>
      )}

      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button color="green" block onClick={linkgoogle}>
            <Icon icon="google" /> Link to Google
          </Button>
        )}
        {!isConnected['facebook.com'] && (
          <Button color="blue" block onClick={linkfacebook}>
            <Icon icon="facebook" /> Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
