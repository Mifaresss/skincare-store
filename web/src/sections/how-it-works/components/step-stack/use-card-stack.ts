import { type RefObject, useCallback, useEffect, useEffectEvent } from 'react';

const STUCK_TOLERANCE = 1;

const clampProgress = (value: number) => Math.min(Math.max(value, 0), 1);

const readNumber = (element: Element, property: string) =>
  Number.parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0;

function getStackMetrics(list: HTMLElement) {
  const items = Array.from(list.children) as HTMLElement[];
  const gap = readNumber(list, 'row-gap');
  let offset = 0;

  return {
    items,
    gap,
    range: readNumber(list, '--stack-peek'),
    stickyTops: items.map((item) => readNumber(item, 'top')),
    compressions: items.map((item) => readNumber(item, '--stack-compression')),
    heights: items.map((item) => item.offsetHeight),
    offsets: items.map((item) => {
      const itemOffset = offset;
      offset += item.offsetHeight + gap;
      return itemOffset;
    }),
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
      const { items, gap, range, stickyTops, compressions, heights, offsets } =
        getStackMetrics(list);
      const last = items.length - 1;
      const listTop = list.getBoundingClientRect().top;
      let stuckIndex = 0;

      items.forEach((item, index) => {
        const overlap = stickyTops[index] - listTop - offsets[index];
        if (overlap >= -STUCK_TOLERANCE) stuckIndex = index;

        item.style.setProperty('--stack-progress', clampProgress(overlap / range).toFixed(3));
      });

      const stackedBottoms = items.map(
        (_, index) => stickyTops[index] + heights[index] - compressions[index],
      );
      const stackedBottom = Math.max(...stackedBottoms);
      let previousTail = 0;

      items.forEach((item, index) => {
        const tail = Math.round(stackedBottom - stackedBottoms[index] - compressions[index]);
        item.style.setProperty('--stack-tail-before', `${previousTail}px`);
        item.style.setProperty('--stack-tail', `${tail}px`);
        previousTail = tail;
      });

      list.parentElement?.style.setProperty(
        '--stacked-height',
        `${stackedBottom - stickyTops[0]}px`,
      );

      const room =
        window.innerHeight + compressions[last] + range - heights[last] - gap - stickyTops[last];
      list.style.setProperty('--stack-room', `${Math.max(0, Math.round(room))}px`);

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

      const { stickyTops, offsets } = getStackMetrics(list);
      const listDocumentTop = list.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({ top: listDocumentTop + offsets[index] - stickyTops[index] });
    },
    [listRef],
  );
}
