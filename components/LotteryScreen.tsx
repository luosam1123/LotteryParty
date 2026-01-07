
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Participant, PrizeTier, PRIZE_CONFIG, Winner } from '../types';

interface LotteryScreenProps {
  pool: Participant[];
  winners: Winner[];
  onWinnersDrawn: (winners: Participant[], tier: PrizeTier) => void;
}

const LotteryScreen: React.FC<LotteryScreenProps> = ({ pool, winners, onWinnersDrawn }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentTier, setCurrentTier] = useState<PrizeTier>(PrizeTier.LUCKY);
  const [displayParticipants, setDisplayParticipants] = useState<Participant[]>([]);
  
  const timerRef = useRef<number | null>(null);

  const tierWinners = useMemo(() => winners.filter(w => w.prizeTier === currentTier), [winners, currentTier]);
  const remaining = useMemo(() => Math.max(0, PRIZE_CONFIG[currentTier].total - tierWinners.length), [currentTier, tierWinners]);
  const isTierFinished = remaining === 0;

  useEffect(() => {
    if (isSpinning) return;
    setDisplayParticipants(isTierFinished ? tierWinners : []);
  }, [currentTier, isTierFinished, tierWinners, isSpinning]);

  const drawCount = useMemo(() => {
    if (isTierFinished) return 0;
    switch (currentTier) {
      case PrizeTier.GRAND:
      case PrizeTier.FIRST:
      case PrizeTier.SECOND: return remaining;
      case PrizeTier.THIRD: return Math.min(10, remaining);
      case PrizeTier.LUCKY: 
        if (remaining > 34) return 17;
        if (remaining > 16) return 17;
        return remaining;
      default: return 1;
    }
  }, [currentTier, remaining, isTierFinished]);

  const startSpin = useCallback(() => {
    if (drawCount === 0 || pool.length < drawCount) return;
    setIsSpinning(true);
    timerRef.current = window.setInterval(() => {
      const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, drawCount);
      setDisplayParticipants(shuffled);
    }, 50);
  }, [pool, drawCount]);

  const stopSpin = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const finalWinners = [...pool].sort(() => 0.5 - Math.random()).slice(0, drawCount);
    setDisplayParticipants(finalWinners);
    setIsSpinning(false);
    onWinnersDrawn(finalWinners, currentTier);
  }, [pool, drawCount, currentTier, onWinnersDrawn]);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // 动态缩放配置：确保即便可滚动，首屏比例依然协调
  const gridStyle = useMemo(() => {
    const count = displayParticipants.length || drawCount;
    
    if (count <= 1) return {
      container: 'grid-cols-1 max-w-md',
      card: 'p-8 gap-6',
      avatar: 'h-64 rounded-[32px]',
      name: 'text-5xl mt-4',
      dept: 'text-sm mt-2'
    };
    
    if (count <= 3) return {
      container: 'grid-cols-3 max-w-5xl gap-8',
      card: 'p-6 gap-4',
      avatar: 'h-52 rounded-[28px]',
      name: 'text-2xl mt-3',
      dept: 'text-[10px]'
    };

    if (count <= 10) return {
      container: 'grid-cols-2 md:grid-cols-5 max-w-6xl gap-5',
      card: 'p-4 gap-3',
      avatar: 'h-36 rounded-[20px]',
      name: 'text-lg mt-2',
      dept: 'text-[9px]'
    };

    // 多人抽取 (如阳光奖 17/20人)
    return {
      container: 'grid-cols-3 md:grid-cols-6 lg:grid-cols-9 max-w-[95vw] gap-4',
      card: 'p-2.5 gap-2',
      avatar: 'h-24 md:h-32 rounded-[18px]',
      name: 'text-sm mt-1',
      dept: 'text-[8px]'
    };
  }, [displayParticipants.length, drawCount]);

  const prize = PRIZE_CONFIG[currentTier];

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-white/5">
      
      {/* 1. 顶部导航 */}
      <div className="flex-none pt-4 flex justify-center z-20">
        <div className="inline-flex momentum-glass p-1 rounded-2xl border-white/20 scale-90">
          {Object.values(PrizeTier).map(tier => {
            const active = currentTier === tier;
            return (
              <button
                key={tier}
                onClick={() => !isSpinning && setCurrentTier(tier)}
                disabled={isSpinning}
                className={`px-8 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  active ? 'bg-white/20 text-white shadow-inner' : 'text-white/40 hover:text-white/80'
                }`}
              >
                <span className="chinese-font text-lg">{tier}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${active ? 'bg-[#d4af37] text-[#4a0000] font-black' : 'bg-white/5'}`}>
                   {Math.max(0, PRIZE_CONFIG[tier].total - winners.filter(w => w.prizeTier === tier).length)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 奖品聚焦区 */}
      <div className="flex-none pt-2 pb-4 flex flex-col items-center">
        <div className="flex items-center gap-8 momentum-glass px-12 py-6 rounded-[48px] border-white/30 shadow-[0_20px_60px_rgba(255,215,0,0.2)] transition-all duration-700">
           <div className="text-7xl filter drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] animate-bounce-slow">{prize.icon}</div>
           <div className="flex flex-col">
              <h3 className="text-5xl font-black gold-shimmer chinese-font tracking-[0.2em]">{currentTier}</h3>
              <p className="text-white/60 text-lg font-light tracking-[0.3em] uppercase">{prize.item}</p>
           </div>
        </div>
      </div>

      {/* 3. 中奖网格容器 (支持滚动) */}
      <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
        <div className="min-h-full flex items-center justify-center">
          <div className={`grid w-full justify-items-center items-center pb-12 ${gridStyle.container}`}>
            {(displayParticipants.length === 0 && !isSpinning) ? (
               <div className="col-span-full opacity-10 flex flex-col items-center select-none animate-in fade-in zoom-in duration-1000">
                  <div className="text-[200px] leading-none mb-4">{prize.icon}</div>
                  <p className="chinese-font text-6xl tracking-[1.5em]">静候锦鲤</p>
               </div>
            ) : (
              displayParticipants.map((p, idx) => {
                const isConfirmed = isTierFinished && !isSpinning;
                return (
                  <div key={`${p.id}-${idx}`} className="group relative animate-in zoom-in-95 duration-500 w-full">
                    <div className={`w-full momentum-glass rounded-[32px] flex flex-col border-2 transition-all duration-700 ${gridStyle.card} ${isConfirmed ? 'border-yellow-400 ring-8 ring-yellow-400/20 scale-105 shadow-[0_20px_60px_rgba(255,215,0,0.3)]' : 'border-white/20 hover:border-white/40'}`}>
                      <div className={`w-full overflow-hidden bg-black/10 shadow-inner ${gridStyle.avatar}`}>
                        <img src={p.avatar} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" alt={p.name} />
                      </div>
                      <div className="flex flex-col items-center min-w-0">
                        <h4 className={`font-black text-white chinese-font truncate w-full text-center ${gridStyle.name}`}>{p.name}</h4>
                        <p className={`font-bold text-white/40 uppercase tracking-tighter truncate ${gridStyle.dept}`}>{p.department}</p>
                      </div>
                    </div>
                    {isConfirmed && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-br from-[#FFF7AD] to-[#D4AF37] text-black p-2 rounded-2xl shadow-2xl z-30 animate-bounce border border-white/40">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* 4. 底部操作栏 */}
      <div className="flex-none p-10 flex flex-col items-center bg-white/5 backdrop-blur-3xl border-t border-white/20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-20">
        {!isSpinning ? (
          <button
            onClick={startSpin}
            disabled={pool.length === 0 || isTierFinished}
            className="btn-reveal px-56 py-6 text-3xl rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.2)] chinese-font tracking-[0.5em] transition-all disabled:opacity-20"
          >
            {isTierFinished ? '抽选圆满结束' : `揭 晓 锦 鲤`}
          </button>
        ) : (
          <button
            onClick={stopSpin}
            className="px-56 py-6 bg-white text-[#8E0000] text-3xl font-black rounded-[32px] shadow-[0_0_80px_rgba(255,255,255,0.6)] animate-pulse tracking-[0.5em] chinese-font"
          >
            停 ！
          </button>
        )}
        <div className="mt-4 flex gap-4 opacity-30">
           <span className="text-[10px] font-black uppercase tracking-[1em] text-white">Cisco Webex Moments 2026</span>
        </div>
      </div>
    </div>
  );
};

export default LotteryScreen;
