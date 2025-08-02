import { useState, useEffect } from 'react';

export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(() => typeof window !== 'undefined');

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
