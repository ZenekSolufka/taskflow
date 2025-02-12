import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import plLocale from 'date-fns/locale/pl' // Poprawione importowanie lokalizacji
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  pl: plLocale // Użyj zaimportowanej lokalizacji
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const eventStyleGetter = (event) => {
  const backgroundColor = 
    event.priority === 'high' ? '#ef4444' :
    event.priority === 'medium' ? '#f59e0b' :
    '#10b981'

  return { style: { backgroundColor } }
}

export default function Calendar({ events }) {
  return (
    <div className="h-[800px] mt-4">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['week', 'day']}
        messages={{
          today: 'Dziś',
          previous: '←',
          next: '→',
          week: 'Tydzień',
          day: 'Dzień'
        }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  )
}