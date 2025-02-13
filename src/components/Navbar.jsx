import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <div className="text-2xl font-bold mb-8">Logo</div>
      <nav>
        <Link to="/dashboard" className="block py-2 hover:bg-gray-700">Dashboard</Link>
        <Link to="/profile" className="block py-2 hover:bg-gray-700">Profile</Link>
        <Link to="/settings" className="block py-2 hover:bg-gray-700">Settings</Link>
      </nav>
    </div>
  )
}