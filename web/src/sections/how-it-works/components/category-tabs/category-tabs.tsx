import clsx from 'clsx';
import type { KeyboardEvent } from 'react';
import type { Category } from '@/lib/strapi/schemas';
import s from './category-tabs.module.scss';

type CategoryTabsProps = {
  categories: Category[];
  activeId: string;
  onChange: (categoryId: string) => void;
  getTabId: (categoryId: string) => string;
  panelId: string;
  labelledBy: string;
  className?: string;
};

export function CategoryTabs({
  categories,
  activeId,
  onChange,
  getTabId,
  panelId,
  labelledBy,
  className,
}: CategoryTabsProps) {
  const selectTab = (index: number) => {
    const category = categories.at(index % categories.length);
    if (!category) return;

    onChange(category.id);
    document.getElementById(getTabId(category.id))?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const targetIndex = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: categories.length - 1,
    }[event.key];
    if (targetIndex === undefined) return;

    event.preventDefault();
    selectTab(targetIndex);
  };

  return (
    <div className={clsx(s.scroller, className)}>
      <div role="tablist" aria-labelledby={labelledBy} className={s.tabs}>
        {categories.map((category, index) => {
          const isActive = category.id === activeId;

          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              id={getTabId(category.id)}
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(category.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={s.tab}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
