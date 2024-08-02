import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {INote} from '../interfaces';

export interface NoteState {
  notesList: INote[];
}

const initialState: NoteState = {
  notesList: [
    {
      id: '1',
      text: 'My first note',
      selectedColor: '',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      text: 'My second note',
      selectedColor: '',
      createdAt: new Date(
        new Date().getTime() - 1000 * 60 * 60 * 24 * 30 * 6,
      ).toISOString(),
    },
    {
      id: '3',
      text: 'My third note',
      selectedColor: '',
      createdAt: new Date(
        new Date().getTime() - 1000 * 60 * 60 * 24 * 30 * 6 * 12,
      ).toISOString(),
    },
  ],
};

export const noteListSlice = createSlice({
  name: 'notesList',
  initialState,
  reducers: {
    setNote: (
      state,
      action: PayloadAction<{text: string; selectedColor: string}>,
    ) => {
      state.notesList.push({
        id: state.notesList.length.toString() + 1,
        createdAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    deleteNote: (state, action: PayloadAction<{id: string}>) => {
      state.notesList = state.notesList.filter(
        (item: INote) => item.id !== action.payload.id,
      );
    },
    deleteAll: state => {
      state.notesList = [];
    },
    editNote: (
      state,
      action: PayloadAction<{id: string; changes: Partial<INote>}>,
    ) => {
      const {id, changes} = action.payload;
      const index = state.notesList.findIndex((item: INote) => item.id === id);
      if (index !== -1) {
        state.notesList[index] = {
          ...state.notesList[index],
          ...changes,
        };
      }
    },
  },
});

export const {setNote, deleteNote, deleteAll, editNote} = noteListSlice.actions;

export default noteListSlice.reducer;
