import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface LanguageState {
  user: null;
  token: null;
  userId: null;
}

const initialState: LanguageState = {
  user: null,
  token: null,
  userId: null,
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.user.id || action.payload.id;
    },
    deleteUser(state) {
      state.user = null;
      state.token = null;
      state.userId = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser, deleteUser} = userSlice.actions;

export default userSlice.reducer;
