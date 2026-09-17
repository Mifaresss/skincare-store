'use client';

import clsx from 'clsx';
import { useRef, useState } from 'react';
import type { CategoryWithProducts } from '@/lib/strapi/queries';
import type { Step } from '../../steps';
import { ProductsPanel } from '../products-panel/products-panel';
import { StepStack } from '../step-stack/step-stack';
import { useCardStack } from '../step-stack/use-card-stack';
import s from './steps-showcase.module.scss';

const DESKTOP_QUERY = '(min-width: 1024px)';

type StepsShowcaseProps = {
  steps: Step[];
  categories: CategoryWithProducts[];
  className?: string;
};

export function StepsShowcase({ steps, categories, className }: StepsShowcaseProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const revealStep = useCardStack(listRef, setActiveIndex);

  const selectStep = (index: number) => {
    setActiveIndex(index);
    revealStep(index);
  };

  const shopStep = (index: number) => {
    if (window.matchMedia(DESKTOP_QUERY).matches) selectStep(index);
  };

  return (
    <div className={clsx(s.showcase, className)}>
      <StepStack
        ref={listRef}
        steps={steps}
        activeIndex={activeIndex}
        onSelect={selectStep}
        onShop={shopStep}
      />
      <ProductsPanel
        title={steps[activeIndex].shopLabel}
        categories={categories}
        className={s.panel}
      />
    </div>
  );
}
