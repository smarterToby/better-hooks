import { describe, it, expect, jest } from 'bun:test';
import { renderHook } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';
import { fireEvent } from '@testing-library/dom';
import '../../test/setup';

describe('useClickOutside', () => {
  it('should call callback when clicking outside the element', () => {
    const callback = jest.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);

    const { unmount } = renderHook(({ ref, cb }) => useClickOutside(ref, cb), {
      initialProps: { ref: { current: div }, cb: callback },
    });

    fireEvent.mouseDown(document.body);
    expect(callback).toHaveBeenCalledTimes(1);

    unmount();
    document.body.removeChild(div);
  });

  it('should not call callback when clicking inside the element', () => {
    const callback = jest.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);

    const { unmount } = renderHook(({ ref, cb }) => useClickOutside(ref, cb), {
      initialProps: { ref: { current: div }, cb: callback },
    });

    fireEvent.mouseDown(div);
    expect(callback).not.toHaveBeenCalled();

    unmount();
    document.body.removeChild(div);
  });

  it('should clean up event listeners on unmount', () => {
    const callback = jest.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);

    const { unmount } = renderHook(({ ref, cb }) => useClickOutside(ref, cb), {
      initialProps: { ref: { current: div }, cb: callback },
    });

    unmount();

    fireEvent.mouseDown(document.body);
    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(div);
  });
});
