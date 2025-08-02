import { describe, it, expect, beforeEach } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useSessionStorage } from './useSessionStorage';
import '../../test/setup';

describe('useSessionStorage', () => {
  const KEY = 'test-session-key';

  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should return the initial value if sessionStorage is empty', () => {
    const { result } = renderHook(() => useSessionStorage(KEY, 'default'));
    const [storedValue] = result.current;
    expect(storedValue).toBe('default');
  });

  it('should return undefined if no initial value and sessionStorage is empty', () => {
    const { result } = renderHook(() => useSessionStorage(KEY));
    const [storedValue] = result.current;
    expect(storedValue).toBeUndefined();
  });

  it('should set and retrieve a value from sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage(KEY, 'default'));

    act(() => {
      const [, setValue] = result.current;
      setValue('updated');
    });

    const [storedValue] = result.current;
    expect(storedValue).toBe('updated');
    expect(sessionStorage.getItem(KEY)).toBe(JSON.stringify('updated'));
  });

  it('should support functional updates', () => {
    const { result } = renderHook(() => useSessionStorage(KEY, 1));

    act(() => {
      const [, setValue] = result.current;
      setValue((prev) => (prev ?? 0) + 1);
    });

    const [storedValue] = result.current;
    expect(storedValue).toBe(2);
  });

  it('should persist across renders', () => {
    const { result, rerender } = renderHook(() => useSessionStorage(KEY, 'persist'));

    act(() => {
      const [, setValue] = result.current;
      setValue('value');
    });

    rerender();

    const [storedValue] = result.current;
    expect(storedValue).toBe('value');
  });
});
