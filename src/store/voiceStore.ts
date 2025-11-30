import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Voice } from '../types/type';

interface VoiceStore {
  voices: Voice[];
  defaultVoiceId: string | null;

  addVoice: (voice: Voice) => void;
  removeVoice: (id: string) => void;
  setDefaultVoice: (id: string) => void;
  getDefaultVoice: () => Voice | null;
}

export const useVoiceStore = create<VoiceStore>()(
  persist(
    (set, get) => ({
      voices: [],
      defaultVoiceId: null,

      addVoice: (voice: Voice) => {
        set((state) => ({
          voices: [...state.voices, voice],
          defaultVoiceId: voice.id, // Auto-set most recent as default
        }));
      },

      removeVoice: (id: string) => {
        set((state) => ({
          voices: state.voices.filter((v) => v.id !== id),
          defaultVoiceId: state.defaultVoiceId === id ? null : state.defaultVoiceId,
        }));
      },

      setDefaultVoice: (id: string) => {
        set({ defaultVoiceId: id });
      },

      getDefaultVoice: () => {
        const { voices, defaultVoiceId } = get();
        return voices.find((v) => v.id === defaultVoiceId) || null;
      },
    }),
    {
      name: 'voice-storage',
    }
  )
);
