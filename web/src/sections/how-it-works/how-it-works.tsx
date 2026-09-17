import clsx from 'clsx';
import { Icon } from '@/components/ui/icon/icon';
import type { CategoryWithProducts } from '@/lib/strapi/queries';
import { StepsShowcase } from './components/steps-showcase/steps-showcase';
import s from './how-it-works.module.scss';
import { steps } from './steps';

type HowItWorksProps = {
  categories: CategoryWithProducts[];
  className?: string;
};

export function HowItWorks({ categories, className }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className={clsx(s.section, className)}
    >
      <div className={s.intro}>
        <h2 id="how-it-works-title" className={s.title}>
          <span>How it </span>
          <Icon name="star" className={s.star} />
          <span className={s.titleAccent}>works</span>
        </h2>
        <p className={s.subtitle}>4 simple steps to healthier-looking skin</p>
      </div>
      <StepsShowcase steps={steps} categories={categories} />
    </section>
  );
}
