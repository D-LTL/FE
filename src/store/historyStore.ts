import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HistoryItem } from '../types/type';

interface HistoryStore {
  items: HistoryItem[];
  addHistoryItem: (item: HistoryItem) => void;
  updateHistoryTitle: (id: string, newTitle: string) => void;
  removeHistoryItem: (id: string) => void;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      items: [],

      addHistoryItem: (item: HistoryItem) => {
        set((state) => ({
          items: [item, ...state.items].slice(0, 20), // Keep max 20 items
        }));
      },

      updateHistoryTitle: (id: string, newTitle: string) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, title: newTitle } : item
          ),
        }));
      },

      removeHistoryItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: 'history-storage',
    }
  )
);
