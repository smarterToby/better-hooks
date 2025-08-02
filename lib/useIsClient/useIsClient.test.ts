// @ts-expect-error It works
import { describe, it, expect } from 'bun:test';
import { renderHook } from '@testing-library/react';
import { useIsClient } from './useIsClient';
import '../../test/setup';

describe('useIsClient', () => {
  it('should be true after mount (client)', async () => {
    const { result } = renderHook(() => useIsClient(), { hydrate: true });

    expect(result.current).toBe(true);
  });
});
