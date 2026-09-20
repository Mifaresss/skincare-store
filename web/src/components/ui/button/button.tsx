import clsx from 'clsx';
import type { ComponentProps, ElementType, ReactNode } from 'react';
import s from './button.module.scss';

type ButtonOwnProps<C extends ElementType> = {
  component?: C;
  variant?: 'dark' | 'light' | 'green';
  endIcon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonProps<C extends ElementType = 'button'> = ButtonOwnProps<C> &
  Omit<ComponentProps<C>, keyof ButtonOwnProps<C>>;

export function Button<C extends ElementType = 'button'>({
  component,
  variant = 'dark',
  endIcon,
  className,
  children,
  ...rest
}: ButtonProps<C>) {
  const Component: ElementType = component ?? 'button';

  return (
    <Component
      type={Component === 'button' ? 'button' : undefined}
      className={clsx(s.button, s[variant], className)}
      {...rest}
    >
      <span>{children}</span>
      {endIcon}
    </Component>
  );
}
