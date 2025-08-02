import { useState, useCallback } from 'react';
import type { UseHoverReturn } from './types';

export function useHover<T extends HTMLElement = HTMLElement>(): UseHoverReturn<T> {
  const [isHovered, setIsHovered] = useState(false);

  const ref = useCallback((node: T | null) => {
    if (!node) return;

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    node.addEventListener('mouseenter', onMouseEnter);
    node.addEventListener('mouseleave', onMouseLeave);

    return () => {
      node.removeEventListener('mouseenter', onMouseEnter);
      node.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return { ref, isHovered };
}
