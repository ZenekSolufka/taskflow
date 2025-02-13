

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useStore from '../store/useStore';
import {useState} from 'react'

export default function MiniCalendar() {
  const tasks = useStore((state) => state.tasks);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Znaczniki dla dni z zadaniami
  const highlightDates = tasks.map(task => new Date(task.date));

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      inline
      calendarClassName="border rounded p-2"
      dayClassName={(date) => 
        highlightDates.some(d => d.toDateString() === date.toDateString()) 
          ? 'bg-blue-100' 
          : ''
      }
    />
  );
}