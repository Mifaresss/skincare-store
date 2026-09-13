import clsx from 'clsx';
import Link from 'next/link';
import type { ComponentProps, MouseEventHandler } from 'react';
import s from './navigation.module.scss';

const navigationLinks = [
  { label: 'Shop', href: '#how-it-works' },
  { label: 'Skincare', href: '#how-it-works' },
  { label: 'Sets', href: '#how-it-works' },
  { label: 'About', href: '#top' },
];

type NavigationProps = ComponentProps<'nav'> & {
  classes?: { list?: string; link?: string };
  linkOnClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function Navigation({ classes, linkOnClick, ...props }: NavigationProps) {
  return (
    <nav {...props}>
      <ul className={classes?.list}>
        {navigationLinks.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} onClick={linkOnClick} className={clsx(s.link, classes?.link)}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
