import { useCallback, useState } from 'react';
import type { UseCounterProps, UseCounterReturn } from './types.ts';

export function useCounter({ initialValue = 0, options }: UseCounterProps = {}): UseCounterReturn {
  const { min = -Infinity, max = Infinity } = options || {};
  const [count, setCount] = useState<number>(initialValue);

  const set = useCallback(
    (value: number): void => {
      setCount(Math.max(min, Math.min(max, value)));
    },
    [min, max]
  );

  const inc: () => void = useCallback((): void => {
    setCount((prev) => Math.min(prev + 1, max));
  }, [max]);

  const dec: () => void = useCallback((): void => {
    setCount((prev) => Math.max(prev - 1, min));
  }, [min]);

  const reset: () => void = useCallback((): void => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, inc, dec, set, reset };
}
