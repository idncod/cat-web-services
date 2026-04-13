import { Panel } from '@/components/ui/Panel/Panel';
import { ServiceLogo } from '@/components/ui/ServiceLogo/ServiceLogo';
import type { ServiceDefinition, ViewerAccount } from '@/types/cws';
import styles from './HeroOverview.module.scss';

type HeroOverviewProps = {
  selectedService: ServiceDefinition;
  account: ViewerAccount | null;
};

const platformStats = [
  { label: 'Household regions', value: '03' },
  { label: 'Active paws', value: '09' },
  { label: 'Toy drift', value: 'Low' }
];

export const HeroOverview = ({ selectedService, account }: HeroOverviewProps) => {
  return (
      <Panel title="One panel for your pink, premium cat cloud.">
        <div className={styles.root}>
          <div className={styles.copyColumn}>
            <p className={styles.lead}>
              Review household health, snack latency, and suspicious human behaviour from one polished feline console.
            </p>

            <div className={styles.statsRow}>
              {platformStats.map((stat) => (
                  <div key={stat.label} className={styles.statCard}>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </div>
              ))}
            </div>
          </div>

          <div className={styles.focusCard}>
            <div className={styles.focusHeader}>
              <ServiceLogo serviceKey={selectedService.key} serviceName={selectedService.name} size="md" />
              <div className={styles.focusMeta}>
                <span className={styles.focusLabel}>Focused service</span>
                <strong>{selectedService.name}</strong>
              </div>
            </div>

            <p className={styles.focusTagline}>{selectedService.tagline}</p>

            <div className={styles.viewerMeta}>
              <span>{account ? `Viewer: ${account.displayName}` : 'Viewer: guest mode'}</span>
              <span>{account ? account.breedName : 'Sphynx sandbox'}</span>
            </div>
          </div>
        </div>
      </Panel>
  );
};