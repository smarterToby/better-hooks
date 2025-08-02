export type UseClipboardReturn = {
  isCopied: boolean;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
};
