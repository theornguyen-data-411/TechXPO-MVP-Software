import { create } from 'zustand';
import { BatteryState, BatteryData } from '../types';
import batteryData from '../mock/batteryHistory.json';

interface BatteryStore extends BatteryState {
  fetchBatteryData: () => Promise<void>;
  setBatteryData: (data: BatteryData) => void;
  clearError: () => void;
}

export const useBatteryStore = create<BatteryStore>((set, get) => ({
  data: null,
  isLoading: false,
  error: null,

  fetchBatteryData: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data for now
      const data = batteryData.batteryData as BatteryData;
      set({ data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch battery data', 
        isLoading: false 
      });
    }
  },

  setBatteryData: (data: BatteryData) => {
    set({ data, error: null });
  },

  clearError: () => {
    set({ error: null });
  },
})); 