import { useState, useCallback, useEffect, useRef } from 'react';
import type { UseClipboardReturn } from './types.ts';

export function useClipboard(): UseClipboardReturn {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator.clipboard) {
      console.warn('Clipboard API not supported');
      setIsCopied(false);
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy text:', error);
      setIsCopied(false);
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setIsCopied(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { isCopied, copy, reset };
}
