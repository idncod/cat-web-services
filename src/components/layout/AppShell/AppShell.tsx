import type { PropsWithChildren, ReactNode } from 'react';
import styles from './AppShell.module.scss';

type AppShellProps = PropsWithChildren<{
  topBar: ReactNode;
}>;

export const AppShell = ({ topBar, children }: AppShellProps) => {
  return (
    <div className={styles.shell}>
      <div className={styles.main}>
        <div className={styles.topBar}>{topBar}</div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
