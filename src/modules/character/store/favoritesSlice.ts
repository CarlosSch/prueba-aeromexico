import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavorites, toggleFavorite } from './favoriteThunks';
import type { Favorite, FavoritesState } from '../types';

const initialState: FavoritesState = {
  items: [],
  isLoading: false,
  error: undefined,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: state => {
      state.items = [];
      state.error = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<Favorite[]>) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(toggleFavorite.pending, state => {
        state.isLoading = true;
      })
      .addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<Favorite[]>) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Error al actualizar favoritos';
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
