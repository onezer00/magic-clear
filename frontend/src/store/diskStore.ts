import { create } from "zustand";
import { getDiskUsage, getBiggestFiles } from "../services/diskService";

type DiskState = {
  usage: { total: number; used: number; free: number } | null;
  bigFiles: { name: string; size: number }[];
  fetchDiskData: () => Promise<void>;
};

export const useDiskStore = create<DiskState>((set) => ({
  usage: null,
  bigFiles: [],
  fetchDiskData: async () => {
    const usage = await getDiskUsage();
    const bigFiles = await getBiggestFiles();
    set({ usage, bigFiles });
  },
})); 