import { useCallback, useState, useEffect } from 'react';

export function useSessionStorage<T>(key: string, initialValue?: T) {
  const readValue = useCallback((): T | undefined => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`useSessionStorage: Error reading key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T | undefined>(readValue);

  const setValue = useCallback(
    (value: T | ((prev: T | undefined) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`useSessionStorage: Error setting key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  return [storedValue, setValue] as const;
}
