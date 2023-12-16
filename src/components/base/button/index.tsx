import { BaseProps } from '@/components/type';
import { PropsWithChildren } from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';

type ButtonType = PropsWithChildren<{
  active?: boolean;
}> &
  BaseProps;

export const BaseButton = function ({
  className,
  disabled,
  ...props
}: ButtonType) {
  return (
    <button
      {...props}
      className={clsx(styles.button, className, disabled)}
      style={{}}
    ></button>
  );
};
