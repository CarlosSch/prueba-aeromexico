import { InputHTMLAttributes, ReactNode } from 'react';
import styles from './textField.module.scss';
import { createBem } from '@/core/utils';

export interface TextField extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const TextField = ({ startIcon, endIcon, ...props }: TextField) => {
  const bem = createBem(styles, 'text-field');

  return (
    <div className={bem()}>
      {startIcon && <span>{startIcon}</span>}

      <input className={bem('input')} {...props} />

      {endIcon && <span>{endIcon}</span>}
    </div>
  );
};
