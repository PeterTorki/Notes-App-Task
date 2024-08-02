/* eslint-disable prettier/prettier */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface LanguageState {
  lang: string;
  isRtl: boolean;
}

const initialState: LanguageState = {
  lang: 'en',
  isRtl: false,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
      state.isRtl = action.payload === 'ar';
    },
  },
});

export const {changeLanguage} = languageSlice.actions;
export default languageSlice.reducer;
