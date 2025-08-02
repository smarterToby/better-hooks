import { describe, it, expect, beforeEach, afterEach, jest } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useClipboardHistory } from './useClipboardHistory';
import type { ClipboardHistoryItem } from './types.ts';
import '../../test/setup';

describe('useClipboardHistory', () => {
  let originalClipboard: typeof navigator.clipboard;

  beforeEach(() => {
    originalClipboard = navigator.clipboard;
    (navigator as unknown as { clipboard?: Partial<Clipboard> }).clipboard = {
      writeText: jest.fn().mockResolvedValue(undefined),
    };
  });

  afterEach(() => {
    jest.clearAllMocks?.();
    (navigator as unknown as { clipboard?: Partial<Clipboard> }).clipboard = originalClipboard;
  });

  it('should start with empty history', () => {
    const { result } = renderHook(() => useClipboardHistory());
    expect(result.current.history).toEqual([]);
  });

  it('should copy text and add to history as ClipboardHistoryItem', async () => {
    const { result } = renderHook(() => useClipboardHistory());

    await act(async () => {
      await result.current.copy('hello');
    });

    const [firstItem] = result.current.history;
    expect(firstItem).toBeObject();
    expect(typeof firstItem?.id).toBe('string');
    expect(firstItem?.text).toBe('hello');
    expect(typeof firstItem?.timestamp).toBe('number');
    expect(result.current.isCopied).toBe(true);
  });

  it('should not duplicate consecutive identical entries', async () => {
    const { result } = renderHook(() => useClipboardHistory());

    await act(async () => {
      await result.current.copy('duplicate');
      await result.current.copy('duplicate');
    });

    expect(result.current.history).toHaveLength(1);
  });

  it('should maintain a maximum number of items', async () => {
    const { result } = renderHook(() => useClipboardHistory(3));

    await act(async () => {
      await result.current.copy('one');
      await result.current.copy('two');
      await result.current.copy('three');
      await result.current.copy('four');
    });

    const texts = result.current.history.map((item: ClipboardHistoryItem) => item.text);
    expect(texts).toEqual(['four', 'three', 'two']);
  });

  it('should clear history and reset copied state', async () => {
    const { result } = renderHook(() => useClipboardHistory());

    await act(async () => {
      await result.current.copy('clear-me');
    });

    expect(result.current.history.length).toBe(1);

    act(() => {
      result.current.clear();
    });

    expect(result.current.history).toEqual([]);
    expect(result.current.isCopied).toBe(false);
  });
});
