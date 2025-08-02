import { describe, it, expect, jest } from 'bun:test';
import { renderHook } from '@testing-library/react';
import { useClickAnywhere } from './useClickAnywhere';
import { fireEvent } from '@testing-library/dom';
import '../../test/setup';

describe('useClickAnywhere', () => {
  it('should call callback on any click in the document', () => {
    const callback = jest.fn();

    renderHook(() => useClickAnywhere(callback));

    fireEvent.mouseDown(document.body);
    fireEvent.mouseDown(document.documentElement);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should clean up event listener on unmount', () => {
    const callback = jest.fn();

    const { unmount } = renderHook(() => useClickAnywhere(callback));

    unmount();

    fireEvent.mouseDown(document.body);
    expect(callback).not.toHaveBeenCalled();
  });
});
