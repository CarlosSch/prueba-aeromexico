/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import { CharacterCard } from './CharacterCard';
import { useAppDispatch, useAppSelector } from '@/core/store';
import * as characterStore from '@/modules/character/store';

jest.mock('@/core/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('@/modules/character/store', () => ({
  toggleFavorite: jest.fn((id: number) => ({ type: 'toggle-favorite', payload: id })),
}));

jest
  .spyOn(characterStore, 'toggleFavorite')
  .mockImplementation(((id: number) => ({ type: 'toggle-favorite', payload: id })) as any);

const mockUseAppDispatch = useAppDispatch as jest.Mock;
const mockUseAppSelector = useAppSelector as jest.Mock;
const mockToggleFavorite = characterStore.toggleFavorite as unknown as jest.Mock;

describe('CharacterCard', () => {
  const baseProps = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'rick.png',
    onSelect: jest.fn(),
    isSelected: false,
  };

  const renderComponent = (overrideProps: Partial<typeof baseProps> = {}) => {
    const props = { ...baseProps, ...overrideProps };
    return render(<CharacterCard {...props} />);
  };

  const mockSelectorWithFavorites = (favoriteIds: number[] = []) => {
    mockUseAppSelector.mockImplementation(selector =>
      selector({
        favorites: {
          items: favoriteIds.map((characterId, index) => ({
            id: index + 1,
            characterId,
            name: `favorite-${characterId}`,
          })),
        },
      })
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(jest.fn());
    mockSelectorWithFavorites([]);
  });

  it('renders character info and triggers onSelect when the card is clicked', () => {
    const onSelect = jest.fn();
    renderComponent({ onSelect, isSelected: true });

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute('src', 'rick.png');

    fireEvent.click(screen.getByRole('article'));

    expect(onSelect).toHaveBeenCalledWith(1);
    expect(screen.getByRole('article')).toHaveClass('character-card--selected');
  });

  it('shows liked state when the character exists in favorites', () => {
    mockSelectorWithFavorites([1]);

    renderComponent();

    expect(screen.getByText(/Liked/i)).toBeInTheDocument();
  });

  it('dispatches toggleFavorite without triggering card selection when clicking the like button', () => {
    const onSelect = jest.fn();
    const dispatch = jest.fn();

    mockUseAppDispatch.mockReturnValue(dispatch);

    renderComponent({ onSelect });

    fireEvent.click(screen.getByRole('button', { name: /like/i }));

    expect(mockToggleFavorite).toHaveBeenCalledWith(1);
    expect(dispatch).toHaveBeenCalledWith({ type: 'toggle-favorite', payload: 1 });
    expect(onSelect).not.toHaveBeenCalled();
  });
});
