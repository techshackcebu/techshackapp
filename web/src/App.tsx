import { useState } from 'react';
import { Home, ClipboardList } from 'lucide-react';
import WaitlistScreen from './screens/WaitlistScreen';
import IntakeScreen from './screens/IntakeScreen';

function App() {
  const [activeTab, setActiveTab] = useState('waitlist');

  const renderScreen = () => {
    switch(activeTab) {
      case 'waitlist': return <WaitlistScreen />;
      case 'intake': return <IntakeScreen />;
      default: return <WaitlistScreen />;
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-brand text-brand-foreground p-4 pt-safe-top shadow-md">
        <h1 className="text-xl font-black italic tracking-tighter">TECHSHACK</h1>
      </header>
      <main className="flex-1 overflow-y-auto">{renderScreen()}</main>
      <nav className="bg-white border-t pb-safe-bottom flex justify-around h-20 shadow-inner">
        <button onClick={() => setActiveTab('waitlist')} className={`flex flex-col items-center justify-center w-full transition-colors ${activeTab === 'waitlist' ? 'text-brand' : 'text-gray-400'}`}>
          <ClipboardList size={28} />
          <span className="text-xs font-bold mt-1">Waitlist</span>
        </button>
        <button onClick={() => setActiveTab('intake')} className={`flex flex-col items-center justify-center w-full transition-colors ${activeTab === 'intake' ? 'text-brand' : 'text-gray-400'}`}>
          <Home size={28} />
          <span className="text-xs font-bold mt-1">Intake</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
