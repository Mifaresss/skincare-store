'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Icon } from '@/components/ui/icon/icon';
import type { CategoryWithProducts } from '@/lib/strapi/queries';
import type { Step } from '../../steps';
import { ProductsPanel } from '../products-panel/products-panel';
import { StepNumber } from '../step-number/step-number';
import s from './products-dialog.module.scss';

type ProductsDialogProps = {
  open: boolean;
  steps: Step[];
  activeStepIndex: number;
  categories: CategoryWithProducts[];
  onStepChange: (index: number) => void;
  onClose: () => void;
};

export function ProductsDialog({
  open,
  steps,
  activeStepIndex,
  categories,
  onStepChange,
  onClose,
}: ProductsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stepsLabelId = useId();
  const [hasOpened, setHasOpened] = useState(open);
  if (open && !hasOpened) setHasOpened(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const activeStep = steps[activeStepIndex];

  return (
    <dialog
      ref={dialogRef}
      aria-label={activeStep.shopLabel}
      onClose={onClose}
      className={s.dialog}
    >
      {hasOpened && (
        <div className={s.content}>
          <button type="button" aria-label="Close products" onClick={onClose} className={s.close}>
            <Icon name="x" />
          </button>

          <ProductsPanel title={activeStep.shopLabel} categories={categories} className={s.panel} />

          <div className={s.steps}>
            <p id={stepsLabelId} className={s.stepsLabel}>
              Shop products for:
            </p>
            <ul aria-labelledby={stepsLabelId} className={s.stepList}>
              {steps.map((step, index) => (
                <li key={step.id}>
                  <button
                    type="button"
                    aria-pressed={index === activeStepIndex}
                    onClick={() => onStepChange(index)}
                    className={s.step}
                  >
                    <StepNumber value={index + 1} className={s.stepNumber} /> {step.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </dialog>
  );
}
