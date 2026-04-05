import { create } from 'zustand';

interface PasswordState {
  isUnlocked: boolean;
  unlock: () => void;
  lock: () => void;
  checkStorage: () => void;
}

const STORAGE_KEY = 'sunslayer_store_unlocked';

export const usePasswordStore = create<PasswordState>((set) => ({
  isUnlocked: false,
  unlock: () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }
    set({ isUnlocked: true });
  },
  lock: () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY);
    }
    set({ isUnlocked: false });
  },
  checkStorage: () => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      set({ isUnlocked: stored === 'true' });
    }
  },
}));
