import { useEffect, useState } from 'react';
import { AlarmClock, BellRing, Hand, Zap } from 'lucide-react';
import type { ActionDefinition, ActionKey } from '@/types/cws';
import { Panel } from '@/components/ui/Panel/Panel';
import styles from './ActionCenter.module.scss';

type ActionCenterProps = {
    actions: ActionDefinition[];
    onAction: (actionKey: ActionKey) => void;
};

const actionMeta: Record<
    ActionKey,
    {
        icon: typeof BellRing;
        sticker: string;
    }
> = {
    deployMeow: {
        icon: BellRing,
        sticker: 'Priority meow deployed'
    },
    wakeHuman: {
        icon: AlarmClock,
        sticker: 'Human sleep interrupted'
    },
    requestTreat: {
        icon: Hand,
        sticker: 'Treat escalation acknowledged'
    },
    guiltStare: {
        icon: Hand,
        sticker: 'Guilt pressure increased'
    },
    zoomies: {
        icon: Zap,
        sticker: 'Zoomies initiated'
    }
};

const featuredOrder: ActionKey[] = ['deployMeow', 'requestTreat', 'wakeHuman', 'zoomies'];

export const ActionCenter = ({ actions, onAction }: ActionCenterProps) => {
    const [sticker, setSticker] = useState<string | null>(null);

    useEffect(() => {
        if (!sticker) {
            return;
        }

        const timeout = window.setTimeout(() => setSticker(null), 2200);
        return () => window.clearTimeout(timeout);
    }, [sticker]);

    const featuredActions = featuredOrder
        .map((key) => actions.find((action) => action.key === key))
        .filter(Boolean) as ActionDefinition[];

    const handleExecute = (actionKey: ActionKey) => {
        onAction(actionKey);
        setSticker(actionMeta[actionKey].sticker);
    };

    return (
        <Panel title="Run claw-approved actions" className={styles.panel}>
            {sticker ? (
                <div className={styles.sticker} aria-live="polite">
                    <span className={styles.stickerDot} />
                    <strong>{sticker}</strong>
                </div>
            ) : null}

            <div className={styles.grid}>
                {featuredActions.map((action) => {
                    const Icon = actionMeta[action.key].icon;

                    return (
                        <div key={action.key} className={styles.actionCard}>
                            <div className={styles.cardTop}>
                <span className={styles.iconWrap}>
                  <Icon size={16} strokeWidth={2.1} />
                </span>

                                <div className={styles.content}>
                                    <h3>{action.label}</h3>
                                    <p>{action.description}</p>
                                </div>
                            </div>

                            <button type="button" className={styles.executeButton} onClick={() => handleExecute(action.key)}>
                                Execute
                            </button>
                        </div>
                    );
                })}
            </div>
        </Panel>
    );
};