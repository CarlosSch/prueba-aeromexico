'use client';

import styles from './characterCard.module.scss';
import { BaseSyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/store';
import { FavoriteIcon } from '@/core/components/ui/icons';
import { createBem } from '@/core/utils';
import { toggleFavorite } from '@/modules/character/store';
import type { Character } from '@/modules/character/types';

type Props = Pick<Character, 'id' | 'name' | 'image'> & {
  onSelect: (id: number) => void;
  isSelected?: boolean;
};

export const CharacterCard = ({ id, name, image, isSelected, onSelect }: Props) => {
  const dispatch = useAppDispatch();
  const { items: favorites } = useAppSelector(state => state.favorites);

  const bem = createBem(styles, 'character-card');
  const classes = `${bem()} ${isSelected ? bem('', 'selected') : ''}`;

  const isFavorite = favorites.some(fav => fav.characterId === id);

  const handleToggleFavorite = (event: BaseSyntheticEvent) => {
    event.stopPropagation();
    dispatch(toggleFavorite(id));
  };

  return (
    <article className={classes.trim()} onClick={() => onSelect(id)}>
      <p className={bem('name')}>{name}</p>
      <picture>
        <img src={image} alt={name} width="100%" height="auto" />
      </picture>

      <button className={bem('favorite')} onClick={handleToggleFavorite}>
        <FavoriteIcon className={isFavorite ? bem('favorite--active') : undefined} />
        <span className={bem('favorite-label')}> {isFavorite ? 'Liked' : 'Like'} </span>
      </button>
    </article>
  );
};
