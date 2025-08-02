import { useState, useEffect } from 'react';
import type { UseScrollProgressOptions } from './types.ts';

export function useScrollProgress<T extends HTMLElement = HTMLElement>(
  options: UseScrollProgressOptions<T> = {}
): number {
  const { percent = false, ref } = options;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = ref?.current || window;

    function handleScroll() {
      let scrollTop: number, scrollHeight: number, clientHeight: number;

      if (target === window) {
        scrollTop = window.scrollY || window.pageYOffset;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
      } else if (target instanceof HTMLElement) {
        scrollTop = target.scrollTop;
        scrollHeight = target.scrollHeight;
        clientHeight = target.clientHeight;
      } else {
        setProgress(0);
        return;
      }

      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll <= 0) {
        setProgress(0);
        return;
      }

      let currentProgress = scrollTop / totalScroll;
      if (percent) {
        currentProgress = currentProgress * 100;
      }

      setProgress(currentProgress);
    }

    handleScroll();

    target.addEventListener('scroll', handleScroll);

    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [percent, ref]);

  return progress;
}
