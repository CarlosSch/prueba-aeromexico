import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCharactersThunk } from './characterThunk';
import type { Character, CharacterState } from '../types/character';

const initialState: CharacterState = {
  items: [],
  isLoading: false,
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCharactersThunk.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchCharactersThunk.fulfilled, (state, action: PayloadAction<Character[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCharactersThunk.rejected, state => {
        state.isLoading = false;
        state.error = 'Error loading characters';
      });
  },
});

export default characterSlice.reducer;
