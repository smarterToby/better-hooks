import { useState, useCallback } from 'react';
import { useClipboard } from '../useClipboard';
import type { UseClipboardHistoryReturn, ClipboardHistoryItem } from './types';
import { nanoid } from 'nanoid';

export function useClipboardHistory(maxItems = 10): UseClipboardHistoryReturn {
  const { copy: copyToClipboard, isCopied, reset } = useClipboard();
  const [history, setHistory] = useState<ClipboardHistoryItem[]>([]);

  const copy = useCallback(
    async (text: string) => {
      const success = await copyToClipboard(text);
      if (success) {
        setHistory((prev) => {
          if (prev[0]?.text === text) return prev;
          const newItem: ClipboardHistoryItem = {
            id: nanoid(),
            text,
            timestamp: Date.now(),
          };
          const newHistory = [newItem, ...prev];
          if (newHistory.length > maxItems) newHistory.pop();
          return newHistory;
        });
      }
      return success;
    },
    [copyToClipboard, maxItems]
  );

  const clear = useCallback(() => {
    setHistory([]);
    reset();
  }, [reset]);

  const remove = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    history,
    copy,
    isCopied,
    reset,
    clear,
    remove,
  };
}
