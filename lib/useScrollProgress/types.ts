import type { RefObject } from 'react';

export type UseScrollProgressOptions<T extends HTMLElement = HTMLElement> = {
  percent?: boolean;
  ref?: RefObject<T | null>;
};
