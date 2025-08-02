import { useEffect } from 'react';

export function useClickAnywhere(onClick: () => void) {
  useEffect(() => {
    if (typeof onClick !== 'function') return;

    document.addEventListener('mousedown', onClick);

    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  }, [onClick]);
}
