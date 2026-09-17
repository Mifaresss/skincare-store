import { type RefObject, useCallback, useEffect, useEffectEvent } from 'react';

const STUCK_TOLERANCE = 1;

const clampProgress = (value: number) => Math.min(Math.max(value, 0), 1);

const readNumber = (element: Element, property: string) =>
  Number.parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0;

function getStackMetrics(list: HTMLElement) {
  const items = Array.from(list.children) as HTMLElement[];
  const compressions = items.map((item) => readNumber(item, '--stack-compression'));

  return {
    items,
    gap: readNumber(list, 'row-gap'),
    range: readNumber(list, '--stack-peek'),
    stickyTops: items.map((item) => readNumber(item, 'top')),
    compressions,
    baseHeights: items.map(
      (item, index) =>
        item.offsetHeight + compressions[index] * readNumber(item, '--stack-progress'),
    ),
  };
}

export function useCardStack(
  listRef: RefObject<HTMLElement | null>,
  onActiveChange: (index: number) => void,
) {
  const handleActiveChange = useEffectEvent(onActiveChange);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let frame = 0;
    let activeIndex = -1;

    const update = () => {
      frame = 0;
      const { items, gap, range, stickyTops, compressions, baseHeights } = getStackMetrics(list);
      const listTop = list.getBoundingClientRect().top;
      let offset = 0;
      let stuckIndex = 0;

      items.forEach((item, index) => {
        const overlap = stickyTops[index] - listTop - offset;
        const progress = clampProgress(overlap / range);
        if (overlap >= -STUCK_TOLERANCE) stuckIndex = index;

        item.style.setProperty('--stack-progress', progress.toFixed(3));
        offset += baseHeights[index] - compressions[index] * progress + gap;
      });

      const stackedBottoms = items.map(
        (_, index) => stickyTops[index] + baseHeights[index] - compressions[index],
      );
      const stackedBottom = Math.max(...stackedBottoms);
      let previousTail = 0;

      items.forEach((item, index) => {
        const tail = Math.round(stackedBottom - stackedBottoms[index]);
        item.style.setProperty('--stack-tail-before', `${previousTail}px`);
        item.style.setProperty('--stack-tail', `${tail}px`);
        previousTail = tail;
      });

      list.parentElement?.style.setProperty(
        '--stacked-height',
        `${stackedBottom - stickyTops[0]}px`,
      );

      if (stuckIndex !== activeIndex) {
        activeIndex = stuckIndex;
        handleActiveChange(stuckIndex);
      }
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(list);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    update();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
    };
  }, [listRef]);

  return useCallback(
    (index: number) => {
      const list = listRef.current;
      if (!list) return;

      const { gap, range, stickyTops, compressions, baseHeights } = getStackMetrics(list);
      const listDocumentTop = list.getBoundingClientRect().top + window.scrollY;

      const findScrollTop = (scrollTop: number) => {
        let offset = 0;

        for (let itemIndex = 0; itemIndex < index; itemIndex++) {
          const overlap = stickyTops[itemIndex] - (listDocumentTop - scrollTop) - offset;
          const progress = clampProgress(overlap / range);
          offset += baseHeights[itemIndex] - compressions[itemIndex] * progress + gap;
        }

        return listDocumentTop + offset - stickyTops[index];
      };

      let scrollTop = window.scrollY;
      for (let iteration = 0; iteration < 5; iteration++) scrollTop = findScrollTop(scrollTop);

      window.scrollTo({ top: scrollTop });
    },
    [listRef],
  );
}
