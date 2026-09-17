import clsx from 'clsx';
import s from './step-number.module.scss';

type StepNumberProps = {
  value: number;
  className?: string;
};

export function StepNumber({ value, className }: StepNumberProps) {
  return (
    <span className={clsx(s.number, className)}>
      <span className={s.glyphs}>{String(value).padStart(2, '0')}</span>
    </span>
  );
}
