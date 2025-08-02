export type ClipboardHistoryItem = {
  id: string;
  text: string;
  timestamp: number;
};

export type UseClipboardHistoryReturn = {
  history: ClipboardHistoryItem[];
  copy: (text: string) => Promise<boolean>;
  isCopied: boolean;
  reset: () => void;
  clear: () => void;
  remove: (id: string) => void;
};
