import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
      (set) => ({
        tasks: [],
        addTask: (task) => set((state) => ({ 
          tasks: [...state.tasks, {
            ...task,
            start: new Date(task.start).toISOString(), // Force ISO string
            end: new Date(task.end).toISOString()
          }] 
        })),
        // ...reszta metod
      }),
      { name: 'taskflow-storage' }
    )
  )

export default useStore