export interface UseStepReturn {
  step: number;
  next: () => void;
  prev: () => void;
  setStep: (step: number) => void;
  reset: () => void;
}
