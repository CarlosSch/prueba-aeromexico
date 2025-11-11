import { apiClient, ENDPOINTS } from '@/core/http';
import type { Character } from '@/modules/character/types';

export const fetchCharacters = async (): Promise<Character[]> => {
  const { data } = await apiClient.get<Character[]>(ENDPOINTS.CHARACTERS);
  return data;
};

export const toggleFavoriteRequest = async (character: Character): Promise<void> => {
  await apiClient.post(ENDPOINTS.FAVORITES, { characterId: character.id });
};
