'use client';

import clsx from 'clsx';
import { type Ref, useId, useState } from 'react';
import type { CategoryWithProducts } from '@/lib/strapi/queries';
import { CategoryTabs } from '../category-tabs/category-tabs';
import { ProductCard } from '../product-card/product-card';
import s from './products-panel.module.scss';

type ProductsPanelProps = {
  ref?: Ref<HTMLDivElement>;
  title: string;
  categories: CategoryWithProducts[];
  className?: string;
};

export function ProductsPanel({ ref, title, categories, className }: ProductsPanelProps) {
  const id = useId();
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id);
  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ?? categories[0];
  const getTabId = (categoryId: string) => `${id}-tab-${categoryId}`;

  return (
    <div ref={ref} className={clsx(s.panel, className)}>
      <p id={`${id}-title`} className={s.title}>
        {title}
      </p>

      {activeCategory ? (
        <>
          <CategoryTabs
            categories={categories}
            activeId={activeCategory.id}
            onChange={setActiveCategoryId}
            getTabId={getTabId}
            panelId={`${id}-panel`}
            labelledBy={`${id}-title`}
          />
          <div
            key={activeCategory.id}
            role="tabpanel"
            id={`${id}-panel`}
            aria-labelledby={getTabId(activeCategory.id)}
            className={s.rail}
          >
            {activeCategory.products.length > 0 ? (
              <ul className={s.products}>
                {activeCategory.products.map((product) => (
                  <li key={product.id} className={s.product}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={s.empty}>No products in this category yet. Please check back soon.</p>
            )}
          </div>
        </>
      ) : (
        <p className={s.empty}>Products are coming soon.</p>
      )}
    </div>
  );
}
