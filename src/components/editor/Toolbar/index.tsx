import { forwardRef, Ref, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from '../style.module.scss';
import { BaseProps, OrNull } from '../../type';

export const Toolbar = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => <Menu {...props} ref={ref} className={clsx(className, styles.toolbar)} />
);

export const Menu = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={clsx(className, styles.menu)}
    />
  )
);
