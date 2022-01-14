/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/Firebase';

const ProfileContext = createContext();
export const ProfileProvider = ({ children }) => {
  const [Profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let userRef;
    const authunsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on('value', snap => {
          const { name, CreatedAt, avatar } = snap.val();
          const data = {
            name,
            CreatedAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setIsLoading(false);
        });
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      if (userRef) {
        userRef.off();
      }
      authunsub();
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ Profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => useContext(ProfileContext);
