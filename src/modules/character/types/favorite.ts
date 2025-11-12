export type Favorite = {
  id: number;
  characterId: number;
  name: string;
};

export type FavoritesState = {
  items: Favorite[];
  isLoading: boolean;
  error?: string;
};
