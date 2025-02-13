import { useState } from 'react'
import useStore from '../store/useStore'

export default function AddTaskForm() {
  const [task, setTask] = useState('')
  const addTask = useStore((state) => state.addTask)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (task.trim()) {
      addTask({ id: Date.now(), title: task, completed: false })
      setTask('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Dodaj nowe zadanie"
        className="w-full p-2 border rounded"
      />
    </form>
  )
}