import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '@/modules/character/store/characterSlice';
import favoritesReducer from '@/modules/character/store/favoritesSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
