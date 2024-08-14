import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
/* import { store, persistor } from './src/redux/store'; */
import { PersistGate } from 'redux-persist/integration/react';

import AuthStack from './navigations/AuthStack';

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
        <Toast />
      </PersistGate>
    </Provider>
  )

}