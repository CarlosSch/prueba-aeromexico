/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { CharacterDetail } from './CharacterDetail';
import type { Character } from '@/modules/character/types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img data-testid="status-icon" {...props} />,
}));

jest.mock('@/assets/icons', () => ({
  icons: {
    alive: 'alive-icon',
    dead: 'dead-icon',
    unknown: 'unknown-icon',
  },
}));

const buildCharacter = (overrides: Partial<Character> = {}): Character => ({
  id: 1,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Citadel', url: '' },
  image: 'morty.png',
  episode: ['S01E01', 'S01E02', 'S01E03'],
  url: '',
  created: '',
  ...overrides,
});

describe('CharacterDetail', () => {
  it('renders all relevant character data and fallbacks', () => {
    const character = buildCharacter({ type: '' });

    render(<CharacterDetail {...character} />);

    expect(screen.getByRole('img', { name: character.name })).toBeInTheDocument();
    expect(screen.getByText(character.status)).toBeInTheDocument();
    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.species)).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByText(character.origin.name)).toBeInTheDocument();
    expect(screen.getByText(character.location.name)).toBeInTheDocument();
    expect(screen.getByText(character.gender)).toBeInTheDocument();
    expect(screen.getByText(String(character.episode.length))).toBeInTheDocument();
  });

  it('uses the proper status icon for the provided status', () => {
    const character = buildCharacter({ status: 'Dead' });

    render(<CharacterDetail {...character} />);

    const statusIcon = screen.getByTestId('status-icon');
    expect(statusIcon).toHaveAttribute('src', 'dead-icon');
    expect(statusIcon).toHaveAttribute('alt', 'Dead');
  });
});
