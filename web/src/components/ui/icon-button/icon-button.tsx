import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { Icon, type IconName } from '../icon/icon';
import s from './icon-button.module.scss';

type IconButtonProps = Omit<ComponentProps<'button'>, 'children'> & {
  icon: IconName;
  label: string;
};

export function IconButton({ icon, label, className, ...rest }: IconButtonProps) {
  return (
    <button type="button" aria-label={label} className={clsx(s.button, className)} {...rest}>
      <Icon name={icon} />
    </button>
  );
}
