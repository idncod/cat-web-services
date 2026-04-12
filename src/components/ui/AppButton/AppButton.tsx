import type { ButtonHTMLAttributes } from 'react';
import styles from './AppButton.module.scss';

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  block?: boolean;
};

export const AppButton = ({ variant = 'primary', block = false, className, ...props }: AppButtonProps) => {
  return (
    <button
      className={[styles.button, styles[variant], block ? styles.block : '', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
};
