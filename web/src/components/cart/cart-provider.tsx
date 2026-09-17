'use client';

import { createContext, type ReactNode, use, useState } from 'react';

const INITIAL_ITEM_COUNT = 2;

type CartContextValue = {
  itemCount: number;
  addItem: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itemCount, setItemCount] = useState(INITIAL_ITEM_COUNT);
  const addItem = () => setItemCount((count) => count + 1);

  return <CartContext value={{ itemCount, addItem }}>{children}</CartContext>;
}

export function useCart() {
  const cart = use(CartContext);
  if (!cart) throw new Error('useCart must be used within CartProvider');
  return cart;
}
