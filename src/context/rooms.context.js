/* eslint-disable react/function-component-definition */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../misc/Firebase';
import { transformToArray } from '../misc/helpers';

const RoomsContext = createContext();
export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const databaseRef = database.ref('rooms');
    databaseRef.on('value', snap => {
      const data = transformToArray(snap.val());
      setRooms(data);
    });
    return () => {
      databaseRef.off();
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};
export const useRooms = () => useContext(RoomsContext);
