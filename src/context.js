import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import isJson from './utils/isJson';

const GeneralContext = React.createContext({
  tools: {},
  localUser: {},
  setTools: () => {},
  setAuthUser: () => {},
  updateAuthUser: () => {},
  destroyAuthUser: () => {}
});

export const GeneralContextProvider = ({ children }) => {
  const [localUser, setLocalUser] = React.useState({
    isLogged: false,
    currentUser: null,
    currentEmail: null,
  });

  const [tools, setTools] = React.useState({
    navigation: null,
    bsRef: React.createRef(),
  });

  async function setAuthUser(user, email) {
    await AsyncStorage.setItem('@USER', isJson(user) ? user : JSON.stringify(user));
    await AsyncStorage.setItem('@EMAIL', email);

    setLocalUser({
      isLogged: true,
      currentUser: isJson(user) ? user : JSON.stringify(user),
      currentEmail: email,
    });
  }

  async function updateAuthUser(user) {
    await AsyncStorage.setItem('@USER', isJson(user) ? user : JSON.stringify(user));
    setLocalUser({
      ...localUser,
      currentUser: isJson(user) ? user : JSON.stringify(user),
    });
  }

  async function destroyAuthUser() {
    await AsyncStorage.removeItem('@USER');
    await AsyncStorage.removeItem('@EMAIL');

    setLocalUser({
      isLogged: false,
      currentUser: null,
      currentEmail: null
    })
  }

  return (
    <GeneralContext.Provider value={{ tools, localUser, setTools, setAuthUser, updateAuthUser, destroyAuthUser }}>
      { children }
    </GeneralContext.Provider>
  );
}

export default GeneralContext;