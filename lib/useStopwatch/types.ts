export type UseStopwatchReturn = {
  elapsed: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
};
