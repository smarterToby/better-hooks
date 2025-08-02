import { describe, it, expect } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useOnlineStatus } from './useOnlineStatus';
import '../../test/setup';

describe('useOnlineStatus', () => {
  it('should return initial navigator.onLine value', () => {
    Object.defineProperty(navigator, 'onLine', { writable: true, value: true });
    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);
  });

  it('should update to offline when offline event is triggered', () => {
    Object.defineProperty(navigator, 'onLine', { writable: true, value: true });
    const { result } = renderHook(() => useOnlineStatus());

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current).toBe(false);
  });

  it('should update to online when online event is triggered', () => {
    Object.defineProperty(navigator, 'onLine', { writable: true, value: false });
    const { result } = renderHook(() => useOnlineStatus());

    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    expect(result.current).toBe(true);
  });
});
