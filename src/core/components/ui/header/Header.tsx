import Image from 'next/image';
import styles from './header.module.scss';
import logo from '@/assets/images/rick-morty-logo.png';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Image
        src={logo}
        width={300}
        alt="Rick & Morty"
        className={styles['header__logo']}
        loading="eager"
      />
    </header>
  );
};
