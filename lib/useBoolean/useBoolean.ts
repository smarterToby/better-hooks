import { useCallback, useState } from 'react';
import type { UseBooleanReturn } from './types.ts';

export function useBoolean(initialValue: boolean = false): UseBooleanReturn {
  const [value, setValue] = useState<boolean>(initialValue);

  const setTrue: () => void = useCallback(() => setValue(true), []);
  const setFalse: () => void = useCallback(() => setValue(false), []);
  const toggle: () => void = useCallback(() => setValue((prev) => !prev), []);

  return { value, setTrue, setFalse, toggle };
}
