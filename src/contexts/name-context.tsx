import React, { type ReactNode, useState, useEffect } from 'react';

export const NameContext = React.createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>(['', () => {}]);

export const NameContextProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>(localStorage.getItem('name') ?? '');

  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  return (
    <NameContext.Provider value={[name, setName]}>
      {children}
    </NameContext.Provider>
  );
};
