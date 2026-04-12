import { Panel } from '@/components/ui/Panel/Panel';
import { StatusBadge } from '@/components/ui/StatusBadge/StatusBadge';
import type { HumanStatus } from '@/types/cws';
import styles from './HumanStatusCard.module.scss';

type HumanStatusCardProps = {
  humanStatus: HumanStatus;
};

const stateToneMap = {
  available: 'healthy',
  distracted: 'warning',
  sleeping: 'warning',
  compliant: 'healthy',
  unreliable: 'critical'
} as const;

export const HumanStatusCard = ({ humanStatus }: HumanStatusCardProps) => {
  const stats = [
    { label: 'Lap readiness', value: `${humanStatus.lapReadiness}%` },
    { label: 'Treat latency', value: `${humanStatus.treatLatency}s` },
    { label: 'Meow ack', value: `${humanStatus.meowAcknowledgement}%` },
    { label: 'Blanket warmth', value: `${humanStatus.blanketWarmth}%` }
  ];

  return (
    <Panel
      eyebrow="Human monitor"
      title={humanStatus.name}
      actions={<StatusBadge label={humanStatus.state} tone={stateToneMap[humanStatus.state]} />}
    >
      <div className={styles.stack}>
        <div className={styles.threatRow}>
          <span>Vacuum threat</span>
          <StatusBadge
            label={humanStatus.vacuumThreat}
            tone={humanStatus.vacuumThreat === 'low' ? 'healthy' : humanStatus.vacuumThreat === 'elevated' ? 'warning' : 'critical'}
          />
        </div>

        <div className={styles.grid}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
};
