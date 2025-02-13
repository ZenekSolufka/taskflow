import { create } from 'zustand'

const useStore = create((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, {
      ...task,
      date: new Date().toISOString(), // Dummy date
      start: new Date().toISOString(),
      end: new Date(Date.now() + 3600000).toISOString()
    }] 
  })),
}));

export default useStore;