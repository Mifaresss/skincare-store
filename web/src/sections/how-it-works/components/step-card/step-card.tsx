import clsx from 'clsx';
import Image from 'next/image';
import type { FocusEvent } from 'react';
import { Icon } from '@/components/ui/icon/icon';
import type { Step } from '../../steps';
import s from './step-card.module.scss';

type StepCardProps = {
  step: Step;
  number: number;
  onReveal: () => void;
  onShop: () => void;
};

export function StepCard({ step, number, onReveal, onShop }: StepCardProps) {
  const revealOnKeyboardFocus = (event: FocusEvent<HTMLButtonElement>) => {
    if (event.currentTarget.matches(':focus-visible')) onReveal();
  };

  return (
    <article className={clsx(s.card, s[step.id])}>
      <h3 className={s.heading}>
        <button
          type="button"
          className={s.reveal}
          onClick={onReveal}
          onFocus={revealOnKeyboardFocus}
        >
          <span className={s.number}>
            <span className={s.numberGlyphs}>{String(number).padStart(2, '0')}</span>
          </span>{' '}
          <span className={s.title}>{step.title}</span>
        </button>
      </h3>
      <p className={s.tagline}>{step.tagline}</p>
      <p className={s.description}>{step.description}</p>
      <button type="button" className={s.shop} onClick={onShop}>
        {step.shopLabel}
        <Icon name="arrow-up-right" className={s.shopIcon} />
      </button>
      <Image
        src={step.image.src}
        alt={step.image.alt}
        width={1000}
        height={1500}
        sizes="(min-width: 1024px) 400px, 300px"
        className={s.image}
      />
    </article>
  );
}
