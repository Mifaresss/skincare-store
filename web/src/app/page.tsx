import { getHomeContent } from '@/lib/strapi/queries';
import { HeroBackdrop } from '@/sections/hero/components/hero-backdrop/hero-backdrop';
import { SiteHeader } from '@/sections/hero/components/site-header/site-header';
import { Hero } from '@/sections/hero/hero';
import s from './page.module.scss';

export default async function Home() {
  const { announcements } = await getHomeContent();

  return (
    <div className={s.page}>
      <HeroBackdrop className={s.heroBackdrop} />
      <SiteHeader announcements={announcements} className={s.header} />
      <main className={s.main}>
        <Hero className={s.hero} />
      </main>
    </div>
  );
}
