import { StatusBadge } from '@/components/ui/StatusBadge/StatusBadge';
import styles from './TopBar.module.scss';

type TopBarProps = {
  consoleTitle: string;
  consoleSubtitle: string;
};

export const TopBar = ({ consoleTitle, consoleSubtitle }: TopBarProps) => {
  return (
    <header className={styles.topBar}>
      <div className={styles.copyBlock}>
        <p className={styles.product}>CWS Console</p>
        <h1 className={styles.title}>{consoleTitle}</h1>
        <p className={styles.subtitle}>{consoleSubtitle}</p>
      </div>

      <div className={styles.metaGrid}>
        <div className={styles.metaCard}>
          <span className={styles.metaLabel}>Region</span>
          <strong className={styles.metaValue}>eu-west-cat-1</strong>
          <StatusBadge label="Stable purring" tone="healthy" />
        </div>
        <div className={styles.metaCard}>
          <span className={styles.metaLabel}>Control plane</span>
          <strong className={styles.metaValue}>Build 418.0</strong>
          <StatusBadge label="Human-safe-ish" tone="warning" />
        </div>
        <div className={styles.metaCard}>
          <span className={styles.metaLabel}>Tier</span>
          <strong className={styles.metaValue}>Feline enterprise</strong>
          <StatusBadge label="Treat-backed" tone="neutral" />
        </div>
      </div>
    </header>
  );
};
