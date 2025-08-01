export type UseCounterProps = {
  initialValue?: number;
  options?: {
    min?: number;
    max?: number;
  };
};

export type UseCounterReturn = {
  count: number;
  inc: () => void;
  dec: () => void;
  set: (value: number) => void;
  reset: () => void;
};
