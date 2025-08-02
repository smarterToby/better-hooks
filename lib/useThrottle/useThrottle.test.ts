// @ts-expect-error It works
import { describe, it, expect } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useThrottle } from './useThrottle';
import '../../test/setup';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('useThrottle', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useThrottle('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should throttle value changes', async () => {
    const { result, rerender } = renderHook(({ value }) => useThrottle(value, 500), { initialProps: { value: 'a' } });

    expect(result.current).toBe('a');

    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    await act(() => sleep(600));

    expect(result.current).toBe('b');
  });

  it('should only update with the latest value after throttle interval', async () => {
    const { result, rerender } = renderHook(({ value }) => useThrottle(value, 300), {
      initialProps: { value: 'start' },
    });

    rerender({ value: 'one' });
    rerender({ value: 'two' });
    rerender({ value: 'three' });

    await act(() => sleep(350));

    expect(result.current).toBe('three');
  });
});
