import { describe, it, expect } from 'bun:test';
import { renderHook } from '@testing-library/react';
import { useIsMounted } from './useIsMounted';
import '../../test/setup';

describe('useIsMounted', () => {
  it('should return true when mounted', () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current()).toBe(true);
  });

  it('should return false after unmount', () => {
    const { result, unmount } = renderHook(() => useIsMounted());
    unmount();
    expect(result.current()).toBe(false);
  });
});
