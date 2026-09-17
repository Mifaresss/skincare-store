'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useId, useState } from 'react';
import { useCart } from '@/components/cart/cart-provider';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import { formatPrice, resolvePrice } from '@/lib/pricing';
import type { Product } from '@/lib/strapi/schemas';
import { VariantGroup } from '../variant-group/variant-group';
import s from './product-card.module.scss';

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const titleId = useId();
  const { addItem } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedOptionIds, setSelectedOptionIds] = useState<Record<number, number>>(() =>
    Object.fromEntries(product.variantGroups.map((group) => [group.id, group.options[0]?.id])),
  );

  const optionDiscounts = product.variantGroups.flatMap(
    (group) =>
      group.options.find((option) => option.id === selectedOptionIds[group.id])?.discountPercent ??
      [],
  );
  const price = resolvePrice(
    product,
    optionDiscounts.length > 0 ? Math.max(...optionDiscounts) : null,
  );

  return (
    <article aria-labelledby={titleId} className={clsx(s.card, className)}>
      <div className={s.media}>
        <Image
          src={product.image.src}
          alt={product.image.alt}
          width={product.image.width}
          height={product.image.height}
          sizes="(min-width: 1024px) 248px, 152px"
          className={s.image}
        />
        {product.badges.length > 0 && (
          <ul aria-label="Badges" className={s.badges}>
            {product.badges.map((badge) => (
              <li key={badge} className={s.badge}>
                {badge}
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          aria-pressed={isWishlisted}
          onClick={() => setIsWishlisted((value) => !value)}
          className={s.wishlist}
        >
          <Icon name={isWishlisted ? 'heart-fill' : 'heart'} />
        </button>
      </div>

      <h3 id={titleId} className={s.name}>
        {product.name} {product.size && <span className={s.size}>{product.size}</span>}
      </h3>

      {product.variantGroups.length > 0 && (
        <div className={s.variants}>
          {product.variantGroups.map((group) => (
            <VariantGroup
              key={group.id}
              group={group}
              selectedOptionId={selectedOptionIds[group.id]}
              onSelect={(optionId) =>
                setSelectedOptionIds((ids) => ({ ...ids, [group.id]: optionId }))
              }
            />
          ))}
        </div>
      )}

      <div className={s.footer}>
        <div className={s.price}>
          {price.original !== null && (
            <del className={s.originalPrice}>
              <span className="visually-hidden">Original price: </span>
              {formatPrice(price.original)}
            </del>
          )}
          <p className={s.currentPrice}>
            <span className={s.priceLabel}>Price</span> {formatPrice(price.current)}
          </p>
          {price.discountPercent !== null && (
            <span className={s.discount}>-{price.discountPercent}%</span>
          )}
        </div>

        <Button
          variant="green"
          endIcon={<Icon name="arrow-up-right" />}
          onClick={addItem}
          className={s.action}
        >
          Add to bag
        </Button>
        <Button variant="light" className={s.action}>
          View details
        </Button>
      </div>
    </article>
  );
}
