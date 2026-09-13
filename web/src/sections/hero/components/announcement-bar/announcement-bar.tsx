'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import type { Announcement } from '@/lib/strapi/schemas';
import s from './announcement-bar.module.scss';

const ROTATION_INTERVAL_MS = 4000;

type AnnouncementBarProps = {
  messages: Announcement[];
};

export function AnnouncementBar({ messages }: AnnouncementBarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (messages.length < 2 || isPaused) return;

    const timer = setInterval(
      () => setActiveIndex((index) => (index + 1) % messages.length),
      ROTATION_INTERVAL_MS,
    );

    return () => clearInterval(timer);
  }, [messages.length, isPaused]);

  if (messages.length === 0) return null;

  const previousIndex = (activeIndex - 1 + messages.length) % messages.length;

  return (
    <section
      aria-label="Announcements"
      className={s.bar}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {messages.map(({ id, text }, index) => (
        <p
          key={id}
          aria-hidden={index !== activeIndex}
          className={clsx(
            s.message,
            index === activeIndex && s.active,
            index === previousIndex && messages.length > 1 && s.previous,
          )}
        >
          {text}
        </p>
      ))}
    </section>
  );
}
