import { describe, it, expect } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';
import '../../test/setup';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should update the debounced value after delay', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'a', delay: 100 },
    });

    rerender({ value: 'b', delay: 100 });

    expect(result.current).toBe('a');

    await act(() => sleep(120));

    expect(result.current).toBe('b');
  });

  it('should reset the debounce timer if value changes quickly', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'start', delay: 100 },
    });

    rerender({ value: 'v1', delay: 100 });
    await sleep(50);
    rerender({ value: 'v2', delay: 100 });

    expect(result.current).toBe('start');

    await sleep(110);

    expect(result.current).toBe('v2');
  });
});
