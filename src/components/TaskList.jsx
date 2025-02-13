import useStore from '../store/useStore'

export default function TaskList({ title }) {
  const tasks = useStore((state) => state.tasks)

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  )
}