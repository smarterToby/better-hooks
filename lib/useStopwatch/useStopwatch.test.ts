import { describe, it, expect } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useStopwatch } from './useStopwatch';
import '../../test/setup';

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('useStopwatch', () => {
  it('should start at 0', () => {
    const { result } = renderHook(() => useStopwatch());
    expect(result.current.elapsed).toBe(0);
  });

  it('should increase elapsed time after start', async () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    await wait(500);

    act(() => {});

    expect(result.current.elapsed).toBeGreaterThan(350);
  });

  it('should reset elapsed time', async () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    await wait(400);

    act(() => {
      result.current.reset();
    });

    expect(result.current.elapsed).toBe(0);
  });

  it('should resume from paused time', async () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    await wait(400);

    act(() => {
      result.current.stop();
    });

    const elapsedBeforeResume = result.current.elapsed;

    act(() => {
      result.current.start();
    });

    await wait(300);

    act(() => {});

    expect(result.current.elapsed).toBeGreaterThan(elapsedBeforeResume);
  });
});
