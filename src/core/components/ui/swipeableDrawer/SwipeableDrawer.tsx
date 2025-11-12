import styles from './swipeableDrawer.module.scss';
import { CSSProperties, PropsWithChildren, useState } from 'react';
import { createBem } from '@/core/utils';

interface Props extends PropsWithChildren {
  title?: string;
  sx?: CSSProperties;
}

export const SwipeableDrawer = ({ children, title, sx }: Props) => {
  const [open, setOpen] = useState(false);
  const bem = createBem(styles, 'swipeable-drawer');

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className={bem()} style={sx}>
      <div
        className={bem('sheet')}
        style={{ transform: open ? `translateY(0)` : 'translateY(150px)' }}
        role="dialog"
        aria-modal="true">
        <div className={bem('title')} onClick={toggle}>
          {title}
        </div>

        <div className={bem('content')}>{children}</div>
      </div>
    </div>
  );
};
