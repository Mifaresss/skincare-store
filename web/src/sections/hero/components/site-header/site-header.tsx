import clsx from 'clsx';
import { IconButton } from '@/components/ui/icon-button/icon-button';
import type { Announcement } from '@/lib/strapi/schemas';
import { AnnouncementBar } from '../announcement-bar/announcement-bar';
import { MobileMenu } from '../mobile-menu/mobile-menu';
import { Navigation } from '../navigation/navigation';
import s from './site-header.module.scss';

type SiteHeaderProps = {
  announcements: Announcement[];
  className?: string;
};

export function SiteHeader({ announcements, className }: SiteHeaderProps) {
  return (
    <header id="top" className={clsx(s.header, className)}>
      <AnnouncementBar messages={announcements} />

      <div className={s.bar}>
        <a href="#top" className={s.logo} aria-label="LUMEA, back to top">
          LUMEA
        </a>

        <Navigation
          aria-label="Main"
          className={s.nav}
          classes={{ list: s.navList, link: s.navLink }}
        />

        <div className={s.actions}>
          <MobileMenu />
          <IconButton icon="magnifying-glass" label="Search" className={s.search} />
          <IconButton icon="heart" label="Wishlist" />
          <div className={s.cart}>
            <IconButton icon="shopping-cart" label="Cart, 2 items" />
            <span className={s.cartCount} aria-hidden="true">
              2
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
