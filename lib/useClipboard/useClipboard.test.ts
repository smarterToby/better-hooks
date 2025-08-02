// @ts-expect-error It works
import { describe, it, expect, beforeEach, afterEach, jest } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useClipboard } from './useClipboard';
import '../../test/setup';

describe('useClipboard', () => {
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

  it('should start with isCopied = false', () => {
    const { result } = renderHook(() => useClipboard());
    expect(result.current.isCopied).toBe(false);
  });

  it('should reset isCopied manually', async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copy('test');
    });

    expect(result.current.isCopied).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.isCopied).toBe(false);
  });

  it('should handle clipboard API not supported', async () => {
    (navigator as unknown as { clipboard?: Partial<Clipboard> }).clipboard = undefined;
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copy('fail test');
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith('Clipboard API not supported');
    expect(result.current.isCopied).toBe(false);

    consoleWarnSpy.mockRestore();
  });

  it('should handle errors in copying', async () => {
    (navigator as unknown as { clipboard?: Partial<Clipboard> }).clipboard = {
      writeText: jest.fn().mockRejectedValue(new Error('fail')),
    };
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copy('fail test');
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to copy text:', expect.any(Error));
    expect(result.current.isCopied).toBe(false);

    consoleErrorSpy.mockRestore();
  });
});
