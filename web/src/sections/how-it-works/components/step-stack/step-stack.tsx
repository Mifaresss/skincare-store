import clsx from 'clsx';
import type { CSSProperties, Ref } from 'react';
import type { Step } from '../../steps';
import { StepCard } from '../step-card/step-card';
import s from './step-stack.module.scss';

type StepStackProps = {
  ref: Ref<HTMLOListElement>;
  steps: Step[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onShop: (index: number) => void;
  className?: string;
};

export function StepStack({
  ref,
  steps,
  activeIndex,
  onSelect,
  onShop,
  className,
}: StepStackProps) {
  return (
    <ol ref={ref} className={clsx(s.list, className)}>
      {steps.map((step, index) => (
        <li
          key={step.id}
          className={s.item}
          style={{ '--index': index } as CSSProperties}
          aria-current={index === activeIndex ? 'step' : undefined}
        >
          <StepCard
            step={step}
            number={index + 1}
            onReveal={() => onSelect(index)}
            onShop={() => onShop(index)}
          />
        </li>
      ))}
    </ol>
  );
}
