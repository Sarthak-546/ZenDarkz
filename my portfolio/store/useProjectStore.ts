import { create } from 'zustand';

interface ProjectState {
  activeProject: number | null;
  setActiveProject: (index: number | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  activeProject: null,
  setActiveProject: (index) => set({ activeProject: index }),
}));