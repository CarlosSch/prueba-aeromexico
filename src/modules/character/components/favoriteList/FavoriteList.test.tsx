/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import { FavoriteList } from './FavoriteList';
import { useAppDispatch } from '@/core/store';
import { toggleFavorite } from '@/modules/character/store';
import type { Favorite } from '../../types';

jest.mock('@/core/store', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('@/modules/character/store', () => ({
  toggleFavorite: jest.fn((id: number) => ({ type: 'toggle-favorite', payload: id })),
}));

jest.mock('@/core/components/ui/icons', () => ({
  DeleteIcon: ({ onClick }: any) => (
    <button data-testid="delete-favorite" onClick={onClick}>
      delete
    </button>
  ),
}));

const mockUseAppDispatch = useAppDispatch as jest.Mock;
const mockToggleFavorite = toggleFavorite as unknown as jest.Mock;

describe('FavoriteList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(jest.fn());
  });

  it('renders a fallback message when there are no favorites', () => {
    render(<FavoriteList favorites={[]} />);

    expect(screen.getByText('No favorites selected')).toBeInTheDocument();
  });

  it('lists favorites and dispatches toggleFavorite when deleting one', () => {
    const dispatch = jest.fn();
    mockUseAppDispatch.mockReturnValue(dispatch);

    const favorites: Favorite[] = [
      { id: 1, characterId: 42, name: 'Rick' },
      { id: 2, characterId: 99, name: 'Morty' },
    ];

    render(<FavoriteList favorites={favorites} />);

    expect(screen.getByText('Rick')).toBeInTheDocument();
    expect(screen.getByText('Morty')).toBeInTheDocument();

    fireEvent.click(screen.getAllByTestId('delete-favorite')[0]);

    expect(mockToggleFavorite).toHaveBeenCalledWith(42);
    expect(dispatch).toHaveBeenCalledWith({ type: 'toggle-favorite', payload: 42 });
  });
});
