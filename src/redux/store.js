import { configureStore } from '@reduxjs/toolkit'
import userProfilReducer from './features/userProfilSlice'
import userAuthReducer from './features/authUserSlice'
import {persistReducer, persistStore} from 'redux-persist'
import storage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: 'root',
  storage,
  version: 1
}

const persistReducerAuth = persistReducer(persistConfig, userAuthReducer);
const persistReducerUserProfil = persistReducer(persistConfig, userProfilReducer);

export const store = configureStore({
  reducer: {
    userProfil: persistReducerUserProfil,
    userAuth: persistReducerAuth
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})


export const persistor = persistStore(store)