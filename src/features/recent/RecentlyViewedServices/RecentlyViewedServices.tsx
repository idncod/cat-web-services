import { Panel } from '@/components/ui/Panel/Panel';
import type { ServiceDefinition, ServiceKey } from '@/types/cws';
import styles from './RecentlyViewedServices.module.scss';

type RecentlyViewedServicesProps = {
  services: ServiceDefinition[];
  activeKey: ServiceKey;
  recentKeys: ServiceKey[];
  onSelect: (serviceKey: ServiceKey) => void;
};

export const RecentlyViewedServices = ({ services, activeKey, recentKeys, onSelect }: RecentlyViewedServicesProps) => {
  const recentServices = recentKeys
    .map((key) => services.find((service) => service.key === key))
    .filter((service): service is ServiceDefinition => Boolean(service));

  return (
    <Panel eyebrow="History" title="Recently viewed services">
      <div className={styles.list}>
        {recentServices.map((service) => (
          <button
            key={service.key}
            type="button"
            className={[styles.item, service.key === activeKey ? styles.active : ''].filter(Boolean).join(' ')}
            onClick={() => onSelect(service.key)}
          >
            <span className={styles.icon}>{service.icon}</span>
            <div className={styles.meta}>
              <strong>{service.shortName}</strong>
              <span>{service.category}</span>
            </div>
          </button>
        ))}
      </div>
    </Panel>
  );
};
