import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EleitorContext = createContext({});

export const EleitorProvider = ({ children }) => {
  const [eleitorData, setEleitorData] = useState({});

  const putEleitorData = async (userInfo) => {
    setEleitorData(userInfo);
    await AsyncStorage.setItem('eleitorData', JSON.stringify(userInfo));
  };

  const logout = async () => {
    await AsyncStorage.removeItem('eleitorData');
    setEleitorData({});
  };

  useEffect(() => {
    const loadEleitorData = async () => {
      const storedEleitorData = await AsyncStorage.getItem('eleitorData');
      if (storedEleitorData) {
        setEleitorData(JSON.parse(storedEleitorData));
      }
    };
    loadEleitorData();
  }, []);

  return (
    <EleitorContext.Provider value={{ putEleitorData, eleitorData, logout }}>
      {children}
    </EleitorContext.Provider>
  );
};

export const useEleitor = () => {
  const context = useContext(EleitorContext);

  if (!context) {
    throw new Error('useEleitor deve ser usado dentro de um EleitorProvider');
  }

  return context;
};
