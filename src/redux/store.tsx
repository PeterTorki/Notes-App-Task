import {combineReducers, configureStore} from '@reduxjs/toolkit';
import LanguageReducer from './Language';
import UserReducer from './User';
import NotesReducer from './Notes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

// const createNoopStorage = () => {
//     return {
//         getItem(_key) {
//             return Promise.resolve(null);
//         },
//         setItem(_key, value) {
//             return Promise.resolve(value);
//         },
//         removeItem(_key) {
//             return Promise.resolve();
//         },
//     };
// };
// const storage =
//     typeof window === 'undefined' ? createNoopStorage('local') : AsyncStorage;
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const reducers = combineReducers({
  Language: LanguageReducer,
  User: UserReducer,
  NotesList: NotesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
