import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient, ENDPOINTS } from '@/core/http';
import { RootState } from '@/core/store';
import type { Favorite } from '../types';

export const fetchFavorites = createAsyncThunk<Favorite[]>('favorites/fetchAll', async () => {
  const { data } = await apiClient.get<Favorite[]>(ENDPOINTS.FAVORITES);
  return data;
});

export const toggleFavorite = createAsyncThunk<
  Favorite[],
  number,
  { state: RootState; rejectValue: string }
>('favorites/toggle', async (characterId, { getState, rejectWithValue }) => {
  const { characters } = getState();

  const character = characters.items.find(c => c.id === characterId);
  if (!character) return rejectWithValue('Character not found');

  try {
    const { data: existing } = await apiClient.get<Favorite[]>(
      `${ENDPOINTS.FAVORITES}?characterId=${characterId}`
    );

    if (existing.length > 0) {
      const favId = existing[0].id;
      await apiClient.delete(`${ENDPOINTS.FAVORITES}/${favId}`);
    } else {
      const { data: currentFavs } = await apiClient.get<Favorite[]>(ENDPOINTS.FAVORITES);
      if (currentFavs.length >= 4) {
        return rejectWithValue('No puedes agregar más de 4 favoritos');
      }

      await apiClient.post(ENDPOINTS.FAVORITES, {
        characterId,
        name: character.name,
      });
    }

    const { data: refreshed } = await apiClient.get<Favorite[]>(ENDPOINTS.FAVORITES);
    return refreshed;
  } catch (error) {
    return rejectWithValue(`Error al actualizar favoritos: ${error}`);
  }
});
