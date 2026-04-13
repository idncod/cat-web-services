import { useEffect, useState } from 'react';
import { BellRing, Clock3, Gauge, Shield, Thermometer, TriangleAlert } from 'lucide-react';
import { Panel } from '@/components/ui/Panel/Panel';
import type { HumanStatus } from '@/types/cws';
import styles from './HumanStatusCard.module.scss';

type HumanStatusCardProps = {
  humanStatus: HumanStatus;
};

const stateMeta = {
  available: { label: 'available', tone: 'healthy', icon: Shield },
  distracted: { label: 'distracted', tone: 'warning', icon: TriangleAlert },
  sleeping: { label: 'sleeping', tone: 'warning', icon: TriangleAlert },
  compliant: { label: 'compliant', tone: 'healthy', icon: Shield },
  unreliable: { label: 'unreliable', tone: 'critical', icon: TriangleAlert }
} as const;

const threatMeta = {
  low: { label: 'low', tone: 'healthy', icon: Shield },
  elevated: { label: 'elevated', tone: 'warning', icon: TriangleAlert },
  critical: { label: 'critical', tone: 'critical', icon: TriangleAlert }
} as const;

export const HumanStatusCard = ({ humanStatus }: HumanStatusCardProps) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const timeout = window.setTimeout(() => setPulse(false), 650);
    return () => window.clearTimeout(timeout);
  }, [
    humanStatus.state,
    humanStatus.vacuumThreat,
    humanStatus.lapReadiness,
    humanStatus.treatLatency,
    humanStatus.meowAcknowledgement,
    humanStatus.blanketWarmth
  ]);

  const state = stateMeta[humanStatus.state];
  const threat = threatMeta[humanStatus.vacuumThreat];
  const StateIcon = state.icon;
  const ThreatIcon = threat.icon;

  const stats = [
    {
      label: 'Lap readiness',
      value: `${humanStatus.lapReadiness}%`,
      icon: Gauge
    },
    {
      label: 'Treat latency',
      value: `${humanStatus.treatLatency}s`,
      icon: Clock3
    },
    {
      label: 'Meow acknowledgement',
      value: `${humanStatus.meowAcknowledgement}%`,
      icon: BellRing
    },
    {
      label: 'Blanket warmth',
      value: `${humanStatus.blanketWarmth}%`,
      icon: Thermometer
    }
  ];

  return (
      <Panel
          title={humanStatus.name}
          className={styles.panel}
          actions={
            <div className={styles.topPills}>
          <span
              className={[
                styles.statusPill,
                styles[state.tone],
                pulse ? styles.pulsing : ''
              ].join(' ')}
          >
            <StateIcon size={12} strokeWidth={2.1} />
            {state.label}
          </span>

              <span
                  className={[
                    styles.statusPill,
                    styles[threat.tone],
                    pulse ? styles.pulsing : ''
                  ].join(' ')}
              >
            <ThreatIcon size={12} strokeWidth={2.1} />
                {threat.label}
          </span>
            </div>
          }
      >
        <div className={styles.stack}>
          <div className={styles.metricsGrid}>
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                  <div key={stat.label} className={[styles.statCard, pulse ? styles.pulsing : ''].join(' ')}>
                <span className={styles.statLabel}>
                  <Icon size={13} strokeWidth={2.1} />
                  {stat.label}
                </span>
                    <strong>{stat.value}</strong>
                  </div>
              );
            })}
          </div>
        </div>
      </Panel>
  );
};