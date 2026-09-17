'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import type { CategoryWithProducts } from '@/lib/strapi/queries';
import type { Step } from '../../steps';
import { ProductsDialog } from '../products-dialog/products-dialog';
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
  const [dialogStepIndex, setDialogStepIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const revealStep = useCardStack(listRef, setActiveIndex);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = () => {
      if (desktop.matches) setIsDialogOpen(false);
    };

    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  const selectStep = (index: number) => {
    setActiveIndex(index);
    revealStep(index);
  };

  const shopStep = (index: number) => {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      selectStep(index);
      return;
    }

    setDialogStepIndex(index);
    setIsDialogOpen(true);
  };

  return (
    <div className={clsx(s.showcase, className)}>
      <StepStack
        ref={listRef}
        steps={steps}
        activeIndex={activeIndex}
        onSelect={selectStep}
        onShop={shopStep}
        className={s.stack}
      />
      <ProductsPanel
        title={steps[activeIndex].shopLabel}
        categories={categories}
        className={s.panel}
      />
      <ProductsDialog
        open={isDialogOpen}
        steps={steps}
        activeStepIndex={dialogStepIndex}
        categories={categories}
        onStepChange={setDialogStepIndex}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
