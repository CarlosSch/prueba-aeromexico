import styles from './layout.module.scss';
import { PropsWithChildren } from 'react';
import { Header, Footer } from '@/core/components/ui';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles['layout']}>
      <Header />
      <main className={styles['layout__main']}>{children}</main>
      <Footer />
    </div>
  );
};
