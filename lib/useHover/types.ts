import type { RefCallback } from 'react';

export type UseHoverReturn<T extends HTMLElement = HTMLElement> = {
  ref: RefCallback<T>;
  isHovered: boolean;
};
