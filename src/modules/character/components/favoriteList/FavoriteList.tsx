import styles from './favoriteList.module.scss';
import { useAppDispatch } from '@/core/store';
import { DeleteIcon } from '@/core/components/ui/icons';
import { toggleFavorite } from '@/modules/character/store';
import type { Favorite } from '@/modules/character/types';

interface Props {
  favorites: Favorite[];
}

export const FavoriteList = ({ favorites }: Props) => {
  const dispatch = useAppDispatch();

  if (!favorites.length) {
    return (
      <div style={{ padding: '0 1rem' }}>
        <p>No favorites selected</p>
      </div>
    );
  }

  return (
    <ul className={styles['favorite-list']}>
      {favorites.map(({ id, characterId, name }) => (
        <li key={id} className={styles['favorite-list__item']}>
          <span className={styles['favorite-list__item-text']}>{name}</span>
          <DeleteIcon
            className={styles['favorite-list__item-icon']}
            size={20}
            onClick={() => dispatch(toggleFavorite(characterId))}
          />
        </li>
      ))}
    </ul>
  );
};
