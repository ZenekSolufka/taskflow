import { create } from 'zustand'

const useStore = create((set) => ({
  tasks: [],
  addTask: (task) => set((state) => {
    const newTask = {
      ...task,
      date: new Date().toISOString(),
      start: new Date().toISOString(),
      end: new Date(Date.now() + 3600000).toISOString()
    };
    
    console.log('Nowa taska:', newTask);
    
    return { tasks: [...state.tasks, newTask] };
  }),
  
}));

export default useStore;