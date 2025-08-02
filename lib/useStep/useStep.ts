import { useState, useCallback } from 'react';
import type { UseStepReturn } from './types.ts';

export function useStep(initialStep = 0, maxStep = 0): UseStepReturn {
  const [step, setStepState] = useState(() => {
    if (initialStep < 0) return 0;
    if (initialStep > maxStep) return maxStep;
    return initialStep;
  });

  const setStep = useCallback(
    (newStep: number) => {
      if (newStep < 0) {
        setStepState(0);
      } else if (newStep > maxStep) {
        setStepState(maxStep);
      } else {
        setStepState(newStep);
      }
    },
    [maxStep]
  );

  const next = useCallback(() => {
    setStepState((prev) => (prev < maxStep ? prev + 1 : prev));
  }, [maxStep]);

  const prev = useCallback(() => {
    setStepState((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const reset = useCallback(() => {
    setStepState(initialStep);
  }, [initialStep]);

  return { step, next, prev, setStep, reset };
}
