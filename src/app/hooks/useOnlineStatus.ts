import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Connection restored', {
        duration: 3000,
        position: 'top-center',
        icon: '✓'
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error('Connection lost. Working in offline mode.', {
        duration: Infinity, // Show until reconnected
        position: 'top-center',
        icon: '⚠️'
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
