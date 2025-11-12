'use client';

import styles from './characterGrid.module.scss';
import { TextField } from '@/core/components/ui';
import { SearchIcon } from '@/core/components/ui/icons';
import { CharacterCard } from '@/modules/character/components';
import type { Character } from '../../types';

interface CharacterGridProps {
  characters: Character[];
  selectedId: number | null;
  search: string;
  onSelect: (id: number) => void;
  onSearchChange: (value: string) => void;
}

export const CharacterGrid = ({
  characters,
  selectedId,
  onSelect,
  search,
  onSearchChange,
}: CharacterGridProps) => {
  return (
    <section className={styles['character-grid']}>
      <TextField
        name="search"
        placeholder="Find your character..."
        startIcon={<SearchIcon size={15} />}
        maxLength={40}
        onChange={event => onSearchChange(event.target.value)}
      />
      {characters.length ? (
        <div className={styles['character-grid__list']}>
          {characters.map(character => (
            <CharacterCard
              key={character.name}
              isSelected={selectedId === character.id}
              onSelect={onSelect}
              {...character}
            />
          ))}
        </div>
      ) : (
        <div className={styles['not-found']}>
          <p>{'No results were found for the term:'}</p>
          <p className={styles['not-found__term']}>{`${search}`}</p>
        </div>
      )}
    </section>
  );
};
