import { Ref, PropsWithChildren, forwardRef } from 'react';
import clsx from 'clsx';
import { BaseProps, OrNull } from '../../type';
import styles from '../style.module.scss';

export const Icon = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      className={clsx('material-icons', className, styles.icon)}
    />
  )
);
