import { useState } from 'react'
import Calendar from './components/Calendar'
import AddTaskModal from './components/AddTaskModal'
import useStore from './store/useStore'

function App() {
  const { tasks, addTask } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const calendarEvents = tasks.map(task => ({
    ...task,          // Rozłóż najpierw wszystkie właściwości zadania
    start: new Date(task.start), // Nadpisz start Date
    end: new Date(task.end),     // Nadpisz end Date
    allDay: false     // Dodaj allDay
  }))

  const handleAddTask = (task) => {
    addTask(task)
  }
  

  return (
    <div className="container mx-auto px-4">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold">TaskFlow</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Nowe Zadanie
        </button>
      </header>
      
      <Calendar events={calendarEvents} />
      
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      />
    </div>
    
  )
}

export default App