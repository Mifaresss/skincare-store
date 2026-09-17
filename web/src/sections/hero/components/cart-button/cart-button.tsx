'use client';

import { useCart } from '@/components/cart/cart-provider';
import { IconButton } from '@/components/ui/icon-button/icon-button';
import s from './cart-button.module.scss';

export function CartButton() {
  const { itemCount } = useCart();

  return (
    <div className={s.cart}>
      <IconButton icon="shopping-cart" label={`Cart, ${itemCount} items`} />
      <span className={s.count} aria-hidden="true">
        {itemCount}
      </span>
    </div>
  );
}
