import clsx from 'clsx';
import s from './hero-backdrop.module.scss';

type HeroBackdropProps = {
  className?: string;
};

export function HeroBackdrop({ className }: HeroBackdropProps) {
  return <div aria-hidden="true" className={clsx(s.backdrop, className)} />;
}
