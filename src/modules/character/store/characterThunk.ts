import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCharacters } from '../api';
import type { Character } from '../types';

export const fetchCharactersThunk = createAsyncThunk<Character[]>(
  'characters/fetchAll',
  async () => {
    const characters = await fetchCharacters();
    return characters;
  }
);
