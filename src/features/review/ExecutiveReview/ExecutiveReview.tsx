import { Panel } from '@/components/ui/Panel/Panel';
import { AppButton } from '@/components/ui/AppButton/AppButton';
import styles from './ExecutiveReview.module.scss';

type ExecutiveReviewProps = {
  review: string;
  onGenerate: () => void;
};

export const ExecutiveReview = ({ review, onGenerate }: ExecutiveReviewProps) => {
  return (
    <Panel
      eyebrow="Review"
      title="Quarterly human performance summary"
      actions={
        <AppButton variant="secondary" onClick={onGenerate}>
          Regenerate verdict
        </AppButton>
      }
    >
      <div className={styles.reviewBox}>
        <p>{review}</p>
      </div>
    </Panel>
  );
};
