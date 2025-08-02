import { useEffect, useRef } from 'react';
import type { EventMap, UseEventListener } from './types.ts';

export const useEventListener: UseEventListener = (eventName, handler, element = window, options) => {
  const savedHandler = useRef<typeof handler>(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!element?.addEventListener) return;

    const eventListener = (event: Event) => {
      if (savedHandler.current) {
        savedHandler.current(event as EventMap[typeof eventName]);
      }
    };

    element.addEventListener(eventName, eventListener, options);

    return () => {
      element.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
};
