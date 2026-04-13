import { useEffect, useMemo, useState } from 'react';
import { Activity, CircleDot, TriangleAlert } from 'lucide-react';
import { Panel } from '@/components/ui/Panel/Panel';
import { ServiceLogo } from '@/components/ui/ServiceLogo/ServiceLogo';
import type { Incident } from '@/types/cws';
import styles from './IncidentFeed.module.scss';

type IncidentFeedProps = {
    incidents: Incident[];
};

const ambientPool = [
    'Low-priority sofa occupation drift detected.',
    'Background purring levels remain stable.',
    'Kitchen-west-1 shows suspicious drawer activity.',
    'Hallway traffic briefly increased after phantom zoomies.',
    'Human focus dropped during blanket reallocation.',
    'Treat expectation index recalculated successfully.'
];

const getNowTime = () =>
    new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    });

export const IncidentFeed = ({ incidents }: IncidentFeedProps) => {
    const [ambientIncidents, setAmbientIncidents] = useState<Incident[]>([]);

    useEffect(() => {
        const interval = window.setInterval(() => {
            const message = ambientPool[Math.floor(Math.random() * ambientPool.length)];

            const nextIncident: Incident = {
                id: `ambient-${Date.now()}`,
                message,
                severity: 'info',
                timestamp: getNowTime()
            };

            setAmbientIncidents((current) => [nextIncident, ...current].slice(0, 4));
        }, 4800);

        return () => window.clearInterval(interval);
    }, []);

    const feedItems = useMemo(() => {
        return [...ambientIncidents, ...incidents].slice(0, 7);
    }, [ambientIncidents, incidents]);

    return (
        <Panel
            title="Live incident feed"
            className={styles.panel}
            actions={
                <div className={styles.panelActions}>
          <span className={styles.livePill}>
            <Activity size={13} strokeWidth={2.1} />
            Live
          </span>
                    <ServiceLogo serviceKey="clawedwatch" serviceName="ClawedWatch" size="sm" />
                </div>
            }
        >
            <ul className={styles.feed} aria-live="polite">
                {feedItems.map((incident) => {
                    const isCritical = incident.severity === 'critical';
                    const isWarning = incident.severity === 'warning';
                    const Icon = isCritical || isWarning ? TriangleAlert : CircleDot;

                    return (
                        <li key={incident.id} className={styles.item}>
                            <div className={styles.itemHeader}>
                <span
                    className={[
                        styles.severityPill,
                        isCritical ? styles.critical : '',
                        isWarning ? styles.warning : '',
                        incident.severity === 'info' ? styles.info : ''
                    ]
                        .filter(Boolean)
                        .join(' ')}
                >
                  <Icon size={12} strokeWidth={2.1} />
                    {incident.severity}
                </span>

                                <span className={styles.time}>{incident.timestamp}</span>
                            </div>

                            <p className={styles.message}>{incident.message}</p>
                        </li>
                    );
                })}
            </ul>
        </Panel>
    );
};