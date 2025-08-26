import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Settings {
  // Notification settings
  emailNotifications: boolean;
  pushNotifications: boolean;
  bugReportAlerts: boolean;
  qaReportAlerts: boolean;
  
  // Display settings
  theme: string;
  language: string;
  timezone: string;
  
  // Data settings
  autoBackup: boolean;
  backupFrequency: string;
  exportFormat: string;
  
  // System settings
  sessionTimeout: number;
  maxFileSize: number;
}

interface SettingsState {
  settings: Settings;
  setSettings: (settings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  // Notification settings
  emailNotifications: true,
  pushNotifications: false,
  bugReportAlerts: true,
  qaReportAlerts: true,
  
  // Display settings
  theme: "light",
  language: "en",
  timezone: "UTC+3",
  
  // Data settings
  autoBackup: true,
  backupFrequency: "daily",
  exportFormat: "excel",
  
  // System settings
  sessionTimeout: 30,
  maxFileSize: 10,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      
      setSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: "settings-store",
      version: 1,
    }
  )
);
