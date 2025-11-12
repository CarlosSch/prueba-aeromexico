import styles from './characterDetail.module.scss';
import Image from 'next/image';
import { icons } from '@/assets/icons';
import { createBem } from '@/core/utils';
import type { Character } from '@/modules/character/types';

export const CharacterDetail = ({ ...props }: Character) => {
  const { image, name, status, species, type, origin, location, gender, episode } = props;
  const bem = createBem(styles, 'character-detail');

  const statusIcons: Record<string, string> = {
    alive: icons.alive,
    dead: icons.dead,
    unknown: icons.unknown,
  };

  return (
    <figure className={bem()}>
      <picture className={bem('image-wrapper')}>
        <img src={image} className={bem('image')} alt={name} />
      </picture>

      <div className={bem('status-badge')}>
        <Image src={statusIcons[status.toLocaleLowerCase()]} alt={status} />
        <span className={bem('status-badge-label')}>{status}</span>
      </div>

      <figcaption className={bem('details')}>
        <div>
          <h1 className={bem('name')}>{name}</h1>

          <div className={bem('meta')}>
            <p>{species}</p>
            <p>{type || 'Unknown'}</p>
          </div>
        </div>

        <div className={bem('info')}>
          <div className={bem('info-item')}>
            <p className={bem('info__label')}>Origin</p>
            <p className={bem('info__value')}>{origin.name}</p>
          </div>

          <div className={bem('info-item')}>
            <p className={bem('info__label')}>Location</p>
            <p className={bem('info__value')}>{location.name}</p>
          </div>

          <div className={bem('info-item')}>
            <p className={bem('info__label')}>Gender</p>
            <p className={bem('info__value')}>{gender}</p>
          </div>

          <div className={bem('info-item')}>
            <p className={bem('info__label')}>Episodes</p>
            <p className={bem('info__value')}>{episode.length}</p>
          </div>
        </div>
      </figcaption>
    </figure>
  );
};
