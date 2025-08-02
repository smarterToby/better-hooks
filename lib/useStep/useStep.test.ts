// @ts-expect-error It works
import { describe, it, expect } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useStep } from './useStep';
import '../../test/setup';

describe('useStep', () => {
  it('should initialize with default step', () => {
    const { result } = renderHook(() => useStep(1, 3));
    expect(result.current.step).toBe(1);
  });

  it('should not go below 0 or above maxStep', () => {
    const { result } = renderHook(() => useStep(0, 2));

    act(() => {
      result.current.prev();
    });
    expect(result.current.step).toBe(0);

    act(() => {
      result.current.setStep(10);
    });
    expect(result.current.step).toBe(2);
  });

  it('should go next and prev correctly', () => {
    const { result } = renderHook(() => useStep(0, 2));

    act(() => {
      result.current.next();
    });
    expect(result.current.step).toBe(1);

    act(() => {
      result.current.next();
    });
    expect(result.current.step).toBe(2);

    act(() => {
      result.current.next();
    });
    expect(result.current.step).toBe(2);

    act(() => {
      result.current.prev();
    });
    expect(result.current.step).toBe(1);
  });

  it('should reset to initial step', () => {
    const { result } = renderHook(() => useStep(1, 3));

    act(() => {
      result.current.next();
    });
    expect(result.current.step).toBe(2);

    act(() => {
      result.current.reset();
    });
    expect(result.current.step).toBe(1);
  });
});
