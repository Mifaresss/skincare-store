import clsx from 'clsx';
import s from './icon.module.scss';

export type IconName = 'arrow-up-right' | 'heart' | 'list' | 'magnifying-glass' | 'shopping-cart';

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  return <span className={clsx(s.icon, s[name], className)} aria-hidden="true" />;
}
