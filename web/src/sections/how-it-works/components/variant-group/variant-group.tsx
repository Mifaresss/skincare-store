import clsx from 'clsx';
import Image from 'next/image';
import { useId } from 'react';
import type { VariantGroup as VariantGroupData } from '@/lib/strapi/schemas';
import s from './variant-group.module.scss';

const LONG_LABEL_LENGTH = 12;

type VariantGroupProps = {
  group: VariantGroupData;
  selectedOptionId: number | undefined;
  onSelect: (optionId: number) => void;
};

export function VariantGroup({ group, selectedOptionId, onSelect }: VariantGroupProps) {
  const id = useId();
  const isList = group.options.some(
    (option) => option.image || option.label.length > LONG_LABEL_LENGTH,
  );

  return (
    <div role="radiogroup" aria-labelledby={`${id}-label`} className={s.group}>
      <p id={`${id}-label`} className={s.label}>
        {group.name}:
      </p>
      <div className={clsx(s.options, isList && s.list)}>
        {group.options.map((option) => (
          <label key={option.id} className={s.option}>
            <input
              type="radio"
              name={id}
              checked={option.id === selectedOptionId}
              onChange={() => onSelect(option.id)}
              className={s.input}
            />
            {option.image && (
              <Image
                src={option.image.src}
                alt=""
                width={28}
                height={28}
                sizes="28px"
                className={s.thumbnail}
              />
            )}
            {option.label}
            {option.discountPercent && (
              <span className={s.discount}>-{option.discountPercent}%</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
