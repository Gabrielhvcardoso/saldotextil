import React from 'react';
import { StatusBar } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';

import Routes from './src/routes';
import BottomSheet from './src/components/BottomSheet'

import { GeneralContextProvider } from './src/context';

export default function App() {
  // Custom fonts
  let [fontsLoaded] = useFonts({
    'Poppins Light': require('./assets/fonts/Poppins-Light.otf'),
    'Poppins Regular': require('./assets/fonts/Poppins-Regular.otf'),
    'Poppins Medium': require('./assets/fonts/Poppins-Medium.otf'),
    'Poppins SemiBold': require('./assets/fonts/Poppins-SemiBold.otf'),
    'Poppins Bold': require('./assets/fonts/Poppins-Bold.otf'),
  })

  return (
    <>
      {
        !fontsLoaded ? (
          <AppLoading />
        ) : (
          <GeneralContextProvider>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <MenuProvider>
              <BottomSheet />
              <Routes />
            </MenuProvider>
          </GeneralContextProvider>
        )
      }
    </>
  );
}
