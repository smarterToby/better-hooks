import { describe, it, expect } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';
import '../../test/setup';

describe('useCounter', () => {
  it('should initialize with default value 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should initialize with given initialValue', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }));
    expect(result.current.count).toBe(5);
  });

  it('should increment the count respecting max', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 0, options: { max: 2 } }));

    act(() => {
      result.current.inc();
    });
    expect(result.current.count).toBe(1);

    act(() => {
      result.current.inc();
      result.current.inc();
    });
    expect(result.current.count).toBe(2);
  });

  it('should decrement the count respecting min', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 0, options: { min: -1 } }));

    act(() => {
      result.current.dec();
    });
    expect(result.current.count).toBe(-1);

    act(() => {
      result.current.dec();
    });
    expect(result.current.count).toBe(-1);
  });

  it('should set count within min and max bounds', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 0, options: { min: 0, max: 10 } }));

    act(() => {
      result.current.set(5);
    });
    expect(result.current.count).toBe(5);

    act(() => {
      result.current.set(15);
    });
    expect(result.current.count).toBe(10);

    act(() => {
      result.current.set(-5);
    });
    expect(result.current.count).toBe(0);
  });

  it('should reset to initial value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 3 }));

    act(() => {
      result.current.inc();
      result.current.inc();
    });
    expect(result.current.count).toBe(5);

    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(3);
  });
});
