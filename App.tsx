
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Participant, Winner, AppView, PrizeTier } from './types';
import { generateMockParticipants } from './mockData';
import LotteryScreen from './components/LotteryScreen';
import DirectoryScreen from './components/DirectoryScreen';
import HistoryScreen from './components/HistoryScreen';
import PrizesScreen from './components/PrizesScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ConfirmModal from './components/ConfirmModal';

const App: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOTTERY);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // 重置确认状态机：0-隐藏, 1-第一步确认, 2-最终警示确认
  const [resetStep, setResetStep] = useState<0 | 1 | 2>(0);

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

  const performReset = () => {
    setWinners([]);
    localStorage.removeItem('webex_lottery_winners');
    setCurrentView(AppView.LOTTERY);
    setResetStep(0);
    
    // 触发一个简单的重置视觉反馈
    const root = document.getElementById('root');
    if (root) {
      root.style.opacity = '0.5';
      setTimeout(() => root.style.opacity = '1', 100);
    }
  };

  return (
    <div className="flex h-screen w-full relative select-none bg-transparent overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        onReset={() => setResetStep(1)} 
      />

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <Header 
          view={currentView} 
          participantCount={availableParticipants.length} 
          winnerCount={winners.length}
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
      
      {/* 自定义确认模态框 */}
      {resetStep === 1 && (
        <ConfirmModal 
          title="准备开始新一轮抽奖？"
          message="此操作将清空当前所有中奖记录。如果您已经完成了本场抽奖并想开始新的场次，请确认。"
          confirmText="下一步"
          cancelText="取消"
          onConfirm={() => setResetStep(2)}
          onCancel={() => setResetStep(0)}
        />
      )}
      {resetStep === 2 && (
        <ConfirmModal 
          variant="danger"
          title="🧨 最后的警示"
          message="数据一旦清空将无法恢复（包括历史喜报和奖品剩余统计）。确定要立即重置吗？"
          confirmText="确定清空并跳转"
          cancelText="我再想想"
          onConfirm={performReset}
          onCancel={() => setResetStep(0)}
        />
      )}

      <div className="fixed bottom-6 right-12 opacity-10 pointer-events-none">
        <span className="text-[120px] font-black tracking-tighter text-white">WEBEX</span>
      </div>
    </div>
  );
};

export default App;
