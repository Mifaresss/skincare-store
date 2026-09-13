'use client';

import { useRef } from 'react';
import { IconButton } from '@/components/ui/icon-button/icon-button';
import { Navigation } from '../navigation/navigation';
import s from './mobile-menu.module.scss';

const MENU_ID = 'mobile-menu';

export function MobileMenu() {
  const menuRef = useRef<HTMLElement>(null);

  return (
    <>
      <IconButton icon="list" label="Open menu" className={s.toggle} popoverTarget={MENU_ID} />
      <Navigation
        ref={menuRef}
        id={MENU_ID}
        popover="auto"
        aria-label="Mobile"
        className={s.menu}
        classes={{ list: s.list, link: s.link }}
        linkOnClick={() => menuRef.current?.hidePopover()}
      />
    </>
  );
}
