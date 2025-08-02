export type UseClipboardReturn = {
  isCopied: boolean;
  copy: (text: string) => Promise<void>;
  reset: () => void;
};
