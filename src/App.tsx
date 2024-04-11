import { useState } from 'react';
import './App.css';
import Winners from './pages/Winners';
import Garage from './pages/Garage';

export default function App() {
  const [view, setView] = useState('garage');
  return (
    <div className="flex flex-col max-w-screen w-screen">
      <div className="flex justify-center items-center gap-4 h-20">
        <button type="submit" onClick={() => setView('garage')}>
          Garage
        </button>
        <button type="submit" onClick={() => setView('winners')}>
          Winners
        </button>
      </div>
      <div style={{ display: view === 'garage' ? 'block' : 'none' }}>
        <Garage />
      </div>
      <div style={{ display: view === 'winners' ? 'block' : 'none' }}>
        <Winners />
      </div>
    </div>
  );
}

// TODO react context
