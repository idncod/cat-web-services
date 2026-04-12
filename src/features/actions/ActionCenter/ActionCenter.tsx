import type { ActionDefinition, ActionKey } from '@/types/cws';
import { Panel } from '@/components/ui/Panel/Panel';
import { AppButton } from '@/components/ui/AppButton/AppButton';
import styles from './ActionCenter.module.scss';

type ActionCenterProps = {
  actions: ActionDefinition[];
  onAction: (actionKey: ActionKey) => void;
};

export const ActionCenter = ({ actions, onAction }: ActionCenterProps) => {
  return (
    <Panel eyebrow="Quick controls" title="Run claw-approved actions">
      <div className={styles.grid}>
        {actions.map((action) => (
          <div key={action.key} className={styles.actionCard}>
            <div className={styles.content}>
              <h3>{action.label}</h3>
              <p>{action.description}</p>
            </div>
            <AppButton block onClick={() => onAction(action.key)}>
              Execute
            </AppButton>
          </div>
        ))}
      </div>
    </Panel>
  );
};
