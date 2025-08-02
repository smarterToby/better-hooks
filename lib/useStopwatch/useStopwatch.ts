import { useState, useRef, useEffect, useCallback } from 'react';
import type { UseStopwatchReturn } from './types.ts';

export function useStopwatch(): UseStopwatchReturn {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef(0);

  const start = useCallback(() => {
    if (intervalRef.current !== null) return;

    startTimeRef.current = Date.now() - pausedTimeRef.current;
    intervalRef.current = window.setInterval(() => {
      if (startTimeRef.current !== null) {
        setElapsed(Date.now() - startTimeRef.current);
      }
    }, 100);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      if (startTimeRef.current !== null) {
        pausedTimeRef.current = Date.now() - startTimeRef.current;
      }
    }
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
    setElapsed(0);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  return { elapsed, start, stop, reset };
}
