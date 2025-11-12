/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CharacterBoard } from './CharacterBoard';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { fetchCharactersThunk, fetchFavorites } from '@/modules/character/store';
import type { Character, Favorite } from '../../types';

const mockCharacterGridProps = jest.fn();

jest.mock('@/core/store/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('@/modules/character/store', () => ({
  fetchCharactersThunk: jest.fn(() => ({ type: 'fetch-characters' })),
  fetchFavorites: jest.fn(() => ({ type: 'fetch-favorites' })),
}));

jest.mock('../characterDetail/CharacterDetail', () => ({
  CharacterDetail: (props: any) => <div data-testid="character-detail">{props.name}</div>,
}));

jest.mock('../favoriteList/FavoriteList', () => ({
  FavoriteList: ({ favorites }: any) => (
    <ul data-testid="favorite-list">
      {favorites.map((favorite: any) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}
    </ul>
  ),
}));

jest.mock('../../../../core/components/ui/swipeableDrawer/SwipeableDrawer', () => ({
  SwipeableDrawer: ({ children }: any) => <div data-testid="swipeable-drawer">{children}</div>,
}));

jest.mock('../characterGrid/CharacterGrid', () => ({
  CharacterGrid: (props: any) => {
    mockCharacterGridProps(props);
    return (
      <div data-testid="character-grid">
        <button
          type="button"
          data-testid="select-second"
          onClick={() => props.onSelect(props.characters[1]?.id ?? props.characters[0]?.id ?? 0)}>
          select-second
        </button>

        <button
          type="button"
          data-testid="search-morty"
          onClick={() => props.onSearchChange('morty')}>
          search-morty
        </button>
      </div>
    );
  },
}));

const mockUseAppDispatch = useAppDispatch as jest.Mock;
const mockUseAppSelector = useAppSelector as jest.Mock;
const mockFetchCharactersThunk = fetchCharactersThunk as unknown as jest.Mock;
const mockFetchFavorites = fetchFavorites as unknown as jest.Mock;

const buildCharacter = (overrides: Partial<Character> = {}): Character => ({
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: 'Scientist',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Citadel', url: '' },
  image: 'rick.png',
  episode: [],
  url: '',
  created: '',
  ...overrides,
});

const defaultCharacters = [buildCharacter(), buildCharacter({ id: 2, name: 'Morty Smith' })];
const defaultFavorites: Favorite[] = [{ id: 1, characterId: 1, name: 'Rick' }];

const setSelectorState = (overrides?: { characters?: Character[]; favorites?: Favorite[] }) => {
  mockUseAppSelector.mockImplementation(selector =>
    selector({
      characters: { items: overrides?.characters ?? defaultCharacters },
      favorites: { items: overrides?.favorites ?? defaultFavorites },
    })
  );
};

describe('CharacterBoard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCharacterGridProps.mockClear();
    mockUseAppDispatch.mockReturnValue(jest.fn());
    setSelectorState();
  });

  it('dispatches the character and favorite fetch thunks on mount', async () => {
    const dispatch = jest.fn();
    mockUseAppDispatch.mockReturnValue(dispatch);

    render(<CharacterBoard />);

    await waitFor(() => {
      expect(mockFetchCharactersThunk).toHaveBeenCalledTimes(1);
      expect(mockFetchFavorites).toHaveBeenCalledTimes(1);
    });

    expect(dispatch).toHaveBeenCalledWith({ type: 'fetch-characters' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'fetch-favorites' });
  });

  it('shows the first character details by default', () => {
    render(<CharacterBoard />);

    expect(screen.getByTestId('character-detail')).toHaveTextContent('Rick Sanchez');
  });

  it('updates the selected character when the grid requests a new selection', () => {
    render(<CharacterBoard />);

    fireEvent.click(screen.getByTestId('select-second'));

    expect(screen.getByTestId('character-detail')).toHaveTextContent('Morty Smith');
  });

  it('filters characters according to the search term and forwards the props to the grid', () => {
    render(<CharacterBoard />);

    fireEvent.click(screen.getByTestId('search-morty'));

    const lastCall =
      mockCharacterGridProps.mock.calls[mockCharacterGridProps.mock.calls.length - 1][0];

    expect(lastCall.search).toBe('morty');
    expect(lastCall.characters).toHaveLength(1);
    expect(lastCall.characters[0].name).toBe('Morty Smith');
  });

  it('passes favorites to the drawer list', () => {
    render(<CharacterBoard />);

    expect(screen.getByTestId('favorite-list')).toHaveTextContent('Rick');
  });
});
