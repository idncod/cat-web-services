import { getServiceLogo } from '@/config/serviceLogos';
import styles from './ServiceLogo.module.scss';

type ServiceLogoProps = {
    serviceKey?: string | null;
    serviceName?: string;
    size?: 'sm' | 'md' | 'lg';
    framed?: boolean;
};

export const ServiceLogo = ({
                                serviceKey,
                                serviceName,
                                size = 'md',
                                framed = true
                            }: ServiceLogoProps) => {
    const logo = getServiceLogo(serviceKey);

    return (
        <span
            className={[styles.root, styles[size], framed ? styles.framed : styles.plain].join(' ')}
            aria-label={serviceName ?? logo.label}
        >
      <img src={logo.src} alt={serviceName ?? logo.label} className={styles.image} />
    </span>
    );
};