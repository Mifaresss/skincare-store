import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon/icon';
import s from './hero.module.scss';

type HeroProps = {
  className?: string;
};

export function Hero({ className }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className={clsx(s.hero, className)}>
      <div className={s.headline}>
        <h1 id="hero-title" className={s.title}>
          <span className={s.titleLead}>Skincare made</span>{' '}
          <span className={s.titleAccent}>simple</span>
        </h1>
        <p className={s.subtitle}>Thoughtful formulas for healthy, glowing skin</p>
      </div>

      <div className={s.cta}>
        <p className={s.ctaHint}>Not sure what your skin needs?</p>
        <Button
          component={Link}
          href="#how-it-works"
          endIcon={<Icon name="arrow-up-right" />}
          className={s.ctaButton}
        >
          Find your routine
        </Button>
      </div>

      <Image
        src="/images/hero-portrait.jpg"
        alt="Woman with glowing skin enjoying the sun"
        width={1200}
        height={800}
        sizes="(min-width: 1280px) 40vw, (min-width: 768px) 561px, 1px"
        loading="eager"
        className={s.portrait}
      />

      <div className={s.essentials}>
        <div className={s.essentialsImage}>
          <Image src="/images/essentials-dropper.jpg" alt="" fill sizes="184px" />
        </div>
        <div className={s.essentialsCard}>
          <p className={s.essentialsTitle}>LUMEA essentials</p>
          <p className={s.essentialsText}>
            Simple formulas. Thoughtful ingredients. Everyday results.
          </p>
          <Button
            component={Link}
            href="#how-it-works"
            variant="light"
            endIcon={<Icon name="arrow-up-right" />}
            className={s.essentialsButton}
          >
            Shop now
          </Button>
        </div>
      </div>

      <p className={s.trust}>
        <span className={s.trustLabel}>Dermatologist-inspired care</span>
      </p>
    </section>
  );
}
