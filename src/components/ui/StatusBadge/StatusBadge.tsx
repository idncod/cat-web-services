import styles from './StatusBadge.module.scss';

type StatusBadgeProps = {
  label: string;
  tone: 'neutral' | 'healthy' | 'warning' | 'critical';
};

export const StatusBadge = ({ label, tone }: StatusBadgeProps) => {
  return <span className={[styles.badge, styles[tone]].join(' ')}>{label}</span>;
};
