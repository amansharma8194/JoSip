/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/function-component-definition */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/Firebase';

const ProfileContext = createContext();
export const Profileprovider = ({ children }) => {
  const [Profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let userRef;
  useEffect(() => {
    const authunSub = auth.onAuthStateChanged(authObj => {
      userRef = database.ref(`/profiles/${authObj.uid}`);
      if (authObj) {
        userRef.on('value', snap => {
          const { name, CreatedAt } = snap.val();
          const data = {
            name,
            CreatedAt,
            uid: authObj.uid,
            email: authObj.email,
          };
          setIsLoading(false);
          setProfile(data);
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        setIsLoading(false);
        setProfile(null);
      }
    });
    return () => {
      authunSub();
      if (userRef) {
        userRef.off();
      }
    };
  }, []);
  return (
    <ProfileContext.Provider value={(Profile, isLoading)}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => useContext(ProfileContext);
