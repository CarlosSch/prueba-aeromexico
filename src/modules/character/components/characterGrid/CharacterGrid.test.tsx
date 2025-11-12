/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import { CharacterGrid } from './CharacterGrid';
import type { Character } from '../../types';

const mockCharacterCard = jest.fn((props: any) => (
  <button data-testid={`character-card-${props.id}`} onClick={() => props.onSelect(props.id)}>
    {props.name}
  </button>
));

jest.mock('../characterCard/CharacterCard', () => ({
  CharacterCard: (props: any) => mockCharacterCard(props),
}));

jest.mock('@/core/components/ui/icons', () => ({
  SearchIcon: () => <span data-testid="search-icon" />,
}));

const createCharacter = (overrides: Partial<Character> = {}): Character => ({
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Citadel', url: '' },
  image: 'rick.png',
  episode: [],
  url: '',
  created: '',
  ...overrides,
});

describe('CharacterGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders CharacterCard entries and forwards the selection handler', () => {
    const onSelect = jest.fn();
    const characters = [
      createCharacter({ id: 1, name: 'Rick' }),
      createCharacter({ id: 2, name: 'Morty' }),
    ];

    render(
      <CharacterGrid
        characters={characters}
        selectedId={1}
        search=""
        onSelect={onSelect}
        onSearchChange={jest.fn()}
      />
    );

    expect(mockCharacterCard).toHaveBeenCalledTimes(2);
    expect(mockCharacterCard).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ id: 1, isSelected: true })
    );
    expect(mockCharacterCard).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ id: 2, isSelected: false })
    );

    fireEvent.click(screen.getByTestId('character-card-2'));

    expect(onSelect).toHaveBeenCalledWith(2);
  });

  it('propagates the search input changes through onSearchChange', () => {
    const onSearchChange = jest.fn();

    render(
      <CharacterGrid
        characters={[createCharacter()]}
        selectedId={1}
        search=""
        onSelect={jest.fn()}
        onSearchChange={onSearchChange}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Find your character...'), {
      target: { value: 'bird' },
    });

    expect(onSearchChange).toHaveBeenCalledWith('bird');
  });

  it('renders the empty state when no characters match the search term', () => {
    render(
      <CharacterGrid
        characters={[]}
        selectedId={null}
        search="Summer"
        onSelect={jest.fn()}
        onSearchChange={jest.fn()}
      />
    );

    expect(screen.getByText('No results were found for the term:')).toBeInTheDocument();
    expect(screen.getByText('Summer')).toBeInTheDocument();
    expect(mockCharacterCard).not.toHaveBeenCalled();
  });
});
