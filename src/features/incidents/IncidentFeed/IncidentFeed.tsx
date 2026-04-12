import { Panel } from '@/components/ui/Panel/Panel';
import { StatusBadge } from '@/components/ui/StatusBadge/StatusBadge';
import type { Incident } from '@/types/cws';
import styles from './IncidentFeed.module.scss';

type IncidentFeedProps = {
  incidents: Incident[];
};

const toneMap = {
  info: 'neutral',
  warning: 'warning',
  critical: 'critical'
} as const;

export const IncidentFeed = ({ incidents }: IncidentFeedProps) => {
  return (
    <Panel eyebrow="Recent alerts" title="ClawedWatch incident feed">
      <ul className={styles.feed}>
        {incidents.map((incident) => (
          <li key={incident.id} className={styles.item}>
            <div className={styles.itemHeader}>
              <StatusBadge label={incident.severity} tone={toneMap[incident.severity]} />
              <span className={styles.time}>{incident.timestamp}</span>
            </div>
            <p className={styles.message}>{incident.message}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
};
