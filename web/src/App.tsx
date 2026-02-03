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
    <div className="flex flex-col h-screen bg-white">
      <header className="bg-[#FC4C02] text-white p-4 pt-safe-top">
        <h1 className="text-xl font-bold italic">TECHSHACK</h1>
      </header>
      <main className="flex-1 overflow-y-auto">{renderScreen()}</main>
      <nav className="bg-gray-50 border-t pb-safe-bottom flex justify-around h-16">
        <button onClick={() => setActiveTab('waitlist')} className={`flex flex-col items-center justify-center w-full ${activeTab === 'waitlist' ? 'text-[#FC4C02]' : 'text-gray-400'}`}>
          <ClipboardList size={22} />
          <span className="text-xs">Waitlist</span>
        </button>
        <button onClick={() => setActiveTab('intake')} className={`flex flex-col items-center justify-center w-full ${activeTab === 'intake' ? 'text-[#FC4C02]' : 'text-gray-400'}`}>
          <Home size={22} />
          <span className="text-xs">Intake</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
