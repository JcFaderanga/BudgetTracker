import React, { createContext, useContext, useState } from 'react';


const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [bank, setSelectedBank] = useState(null);

  const setBank = (bank) => {
    setSelectedBank(bank);
  };

  return (
    <AccountContext.Provider value={{ bank, setBank }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);

