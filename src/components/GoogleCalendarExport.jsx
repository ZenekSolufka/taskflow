import { useEffect } from "react";

export default function GoogleCalendarExport({ token }) {

    useEffect(() => {
        const loadGAPI = async () => {
          await new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = resolve;
            document.body.appendChild(script);
          });
      
          window.gapi.load('client', async () => {
            await window.gapi.client.init({
              apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
              discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            });
          });
        };
      
        loadGAPI();
      }, []);

    // Zmodyfikowana funkcja eksportu
const handleExport = async () => {
    try {
      const event = {
        summary: 'Test Event',
        start: { dateTime: new Date().toISOString() },
        end: { dateTime: new Date(Date.now() + 3600000).toISOString() }
      };
  
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
  
      if (!response.ok) throw new Error('Błąd eksportu');
      console.log('Event created:', await response.json());
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
    return (
      <button
        onClick={handleExport}
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
      >
        Eksportuj do Google Calendar
      </button>
    );
  }
  