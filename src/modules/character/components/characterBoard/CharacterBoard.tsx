'use client';

import styles from './characterBoard.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { CharacterGrid, CharacterDetail, FavoriteList } from '@/modules/character/components';
import { SwipeableDrawer } from '@/core/components/ui';
import { createBem } from '@/core/utils';
import { fetchCharactersThunk, fetchFavorites } from '../../store';
import type { Character } from '../../types';

export const CharacterBoard = () => {
  const { items: characters } = useAppSelector(state => state.characters);
  const { items: favorites } = useAppSelector(state => state.favorites);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const bem = createBem(styles, 'character-board');

  useEffect(() => {
    dispatch(fetchCharactersThunk());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const filteredCharacters: Character[] = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return characters;

    return characters.filter(c => c.name.toLowerCase().includes(term));
  }, [characters, search]);

  const effectiveSelectedId = useMemo<number | null>(() => {
    if (selectedId != null) return selectedId;
    return characters.length ? characters[0].id : null;
  }, [selectedId, characters]);

  const selectedCharacter = useMemo(
    () => characters.find(c => c.id === effectiveSelectedId) ?? null,
    [characters, effectiveSelectedId]
  );

  const handleSelect = (id: number) => setSelectedId(id);
  const handleSearchChange = (value: string) => setSearch(value);

  return (
    <div className={bem()}>
      <div className={bem('left')}>
        {selectedCharacter && <CharacterDetail {...selectedCharacter} />}
      </div>

      <div className={bem('right')}>
        <CharacterGrid
          characters={filteredCharacters}
          selectedId={effectiveSelectedId}
          search={search}
          onSelect={handleSelect}
          onSearchChange={handleSearchChange}
        />

        <SwipeableDrawer title={'FAVS'} sx={{ width: '250px' }}>
          <FavoriteList favorites={favorites} />
        </SwipeableDrawer>
      </div>
    </div>
  );
};
