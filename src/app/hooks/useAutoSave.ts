import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface UseAutoSaveOptions {
  data: any;
  onSave: (data: any) => Promise<void>;
  interval?: number; // milliseconds
  enabled?: boolean;
  storageKey?: string;
}

export function useAutoSave({
  data,
  onSave,
  interval = 30000, // 30 seconds default
  enabled = true,
  storageKey
}: UseAutoSaveOptions) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedRef = useRef<string>('');
  const isSavingRef = useRef(false);

  useEffect(() => {
    if (!enabled || isSavingRef.current) return;

    const dataString = JSON.stringify(data);
    
    // Don't save if data hasn't changed
    if (dataString === lastSavedRef.current) return;

    // Save to localStorage immediately as backup
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, dataString);
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for server save
    timeoutRef.current = setTimeout(async () => {
      if (isSavingRef.current) return;

      try {
        isSavingRef.current = true;
        await onSave(data);
        lastSavedRef.current = dataString;
        
        // Subtle success notification
        toast.success('Draft saved', {
          duration: 2000,
          position: 'bottom-right'
        });
      } catch (error) {
        console.error('Auto-save failed:', error);
        toast.error('Failed to save draft. Your work is backed up locally.', {
          duration: 4000,
          position: 'bottom-right'
        });
      } finally {
        isSavingRef.current = false;
      }
    }, interval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, enabled, interval, onSave, storageKey]);

  // Restore from localStorage on mount
  const restoreFromLocal = () => {
    if (!storageKey) return null;
    
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to restore from localStorage:', error);
    }
    return null;
  };

  // Clear localStorage backup
  const clearLocal = () => {
    if (storageKey) {
      try {
        localStorage.removeItem(storageKey);
      } catch (error) {
        console.error('Failed to clear localStorage:', error);
      }
    }
  };

  return {
    restoreFromLocal,
    clearLocal
  };
}
