import { Panel } from '@/components/ui/Panel/Panel';
import type { UsageSummary as UsageSummaryType } from '@/types/cws';
import styles from './UsageSummary.module.scss';

type UsageSummaryProps = {
  usageSummary: UsageSummaryType;
};

export const UsageSummary = ({ usageSummary }: UsageSummaryProps) => {
  const stats = [
    { label: 'Active humans', value: usageSummary.activeHumans, width: 32 },
    { label: 'Snack requests', value: usageSummary.snackRequests, width: 76 },
    { label: 'Successful pets', value: usageSummary.successfulPets, width: 58 },
    { label: 'Open incidents', value: usageSummary.openIncidents, width: 41 }
  ];

  return (
    <Panel eyebrow="Metrics" title="Household stats and graphs">
      <div className={styles.stack}>
        <div className={styles.grid}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.card}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>

        <div className={styles.chart}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.chartRow}>
              <div className={styles.chartLabel}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${stat.width}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
};
