import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient(
  "https://hvrzpfdknvnjbqmjiqzo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cnpwZmRrbnZuamJxbWppcXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MjQ3MDYsImV4cCI6MjA1NTEwMDcwNn0.7weBhF8Wrev_b4ArJRwN5-8ZvFw9PDUpmHs4qSGkMow"
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);