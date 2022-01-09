import { useCallback, useState } from 'react';

export const useModalToggle = (defaultvalue = false) => {
  const [isOpen, setisOpen] = useState(defaultvalue);
  const Open = useCallback(() => {
    setisOpen(true);
  }, []);
  const close = useCallback(() => {
    setisOpen(false);
  }, []);
  return { isOpen, Open, close };
};
