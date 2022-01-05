/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Col, Container, Grid, Icon, Panel, Row, Button, Alert } from 'rsuite';
import firebase from 'firebase/app';

import { auth, database } from '../misc/Firebase';

const SignIn = () => {
  const signInWithProvider = async Provider => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(Provider);

    try {
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          CreatedAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      Alert.success('Signed In', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  const GoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };
  const FacebookSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };
  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to JoSip</h2>
                <p>Progressive Chat Platform for neophytes</p>
              </div>

              <div className="mt-3">
                <Button block color="blue" onClick={FacebookSignIn}>
                  <Icon icon="facebook" /> Continue with Facebook
                </Button>
                <Button block color="green" onClick={GoogleSignIn}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
