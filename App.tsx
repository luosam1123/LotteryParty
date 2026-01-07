
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Participant, Winner, AppView, PrizeTier } from './types';
import { generateMockParticipants } from './mockData';
import LotteryScreen from './components/LotteryScreen';
import DirectoryScreen from './components/DirectoryScreen';
import HistoryScreen from './components/HistoryScreen';
import PrizesScreen from './components/PrizesScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOTTERY);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedParticipants = localStorage.getItem('webex_lottery_participants');
    const storedWinners = localStorage.getItem('webex_lottery_winners');

    if (storedParticipants) {
      setParticipants(JSON.parse(storedParticipants));
    } else {
      const mockData = generateMockParticipants(120);
      setParticipants(mockData);
      localStorage.setItem('webex_lottery_participants', JSON.stringify(mockData));
    }

    if (storedWinners) {
      setWinners(JSON.parse(storedWinners));
    }
    
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('webex_lottery_winners', JSON.stringify(winners));
    }
  }, [winners, isInitialized]);

  const availableParticipants = useMemo(() => {
    const winnerIds = new Set(winners.map(w => w.id));
    return participants.filter(p => !winnerIds.has(p.id));
  }, [participants, winners]);

  const handleDrawWinners = useCallback((newWinners: Participant[], tier: PrizeTier) => {
    const winnersToAdd: Winner[] = newWinners.map(p => ({
      ...p,
      prizeTier: tier,
      wonAt: Date.now()
    }));
    setWinners(prev => [...prev, ...winnersToAdd]);
  }, []);

  const handleReset = useCallback(() => {
    if (confirm('Confirm reset all data? This cannot be undone.')) {
      setWinners([]);
      localStorage.setItem('webex_lottery_winners', JSON.stringify([]));
    }
  }, []);

  return (
    <div className="flex h-screen w-full relative select-none bg-transparent overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} />

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <Header 
          view={currentView} 
          participantCount={availableParticipants.length} 
          winnerCount={winners.length}
          onReset={handleReset}
        />

        <main className="flex-1 overflow-hidden p-6 pt-0">
          <div className="w-full h-full momentum-glass rounded-[48px] overflow-hidden border border-white/20 shadow-[0_32px_100px_rgba(0,0,0,0.3)] relative">
            {currentView === AppView.LOTTERY && (
              <LotteryScreen 
                pool={availableParticipants} 
                onWinnersDrawn={handleDrawWinners} 
                winners={winners}
              />
            )}
            {currentView === AppView.PRIZES && <PrizesScreen winners={winners} />}
            {currentView === AppView.DIRECTORY && <DirectoryScreen participants={participants} winners={winners} />}
            {currentView === AppView.HISTORY && <HistoryScreen winners={winners} />}
          </div>
        </main>
      </div>
      
      <div className="fixed bottom-6 right-12 opacity-10 pointer-events-none">
        <span className="text-[120px] font-black tracking-tighter text-white">WEBEX</span>
      </div>
    </div>
  );
};

export default App;
