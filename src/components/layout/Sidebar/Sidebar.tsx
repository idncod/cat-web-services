import type { ServiceDefinition, ServiceKey } from '@/types/cws';
import { StatusBadge } from '@/components/ui/StatusBadge/StatusBadge';
import styles from './Sidebar.module.scss';

type SidebarProps = {
  services: ServiceDefinition[];
  activeKey: ServiceKey;
  onSelect: (serviceKey: ServiceKey) => void;
};

const toneMap = {
  healthy: 'healthy',
  degraded: 'warning',
  chaotic: 'critical'
} as const;

export const Sidebar = ({ services, activeKey, onSelect }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandBlock}>
        <div className={styles.logo}>CWS</div>
        <div>
          <p className={styles.brandName}>Cat Web Services</p>
          <p className={styles.brandTag}>Cloud infrastructure for managing humans.</p>
        </div>
      </div>

      <nav className={styles.nav}>
        {services.map((service) => {
          const active = service.key === activeKey;

          return (
            <button
              key={service.key}
              type="button"
              className={[styles.navItem, active ? styles.active : ''].filter(Boolean).join(' ')}
              onClick={() => onSelect(service.key)}
            >
              <div className={styles.navHeader}>
                <span className={styles.shortName}>{service.shortName}</span>
                <StatusBadge label={service.status} tone={toneMap[service.status]} />
              </div>
              <p className={styles.navTitle}>{service.name}</p>
              <p className={styles.navCopy}>{service.tagline}</p>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
