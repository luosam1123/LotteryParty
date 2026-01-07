
import React, { useMemo } from 'react';
import { Winner, PrizeTier, PRIZE_CONFIG } from '../types';

interface HistoryScreenProps {
  winners: Winner[];
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ winners }) => {
  const groupedWinners = useMemo(() => {
    const groups: Record<string, Winner[]> = {};
    Object.values(PrizeTier).forEach(tier => {
      groups[tier] = [];
    });
    winners.forEach(winner => {
      if (groups[winner.prizeTier]) {
        groups[winner.prizeTier].push(winner);
      }
    });
    return groups;
  }, [winners]);

  const hasAnyWinners = winners.length > 0;

  return (
    <div className="w-full h-full flex flex-col p-16 overflow-hidden bg-black/10">
      <div className="mb-14 flex justify-between items-end">
        <div>
          <h3 className="text-7xl font-black gold-text chinese-font tracking-widest leading-tight">2026 · 盛典荣誉榜</h3>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.8em] mt-6 ml-2">Celebrating Excellence & Luck at Cisco Webex</p>
        </div>
        <div className="glass-morphism px-12 py-8 rounded-[40px] border-white/5 text-center shadow-2xl">
             <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">幸运之子总计</span>
             <span className="text-6xl font-black gold-text chinese-font">{winners.length}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-8 scrollbar-hide">
        {!hasAnyWinners ? (
          <div className="h-full flex flex-col items-center justify-center opacity-10">
             <div className="text-[240px] leading-none mb-4">✨</div>
             <p className="chinese-font text-6xl tracking-[1em]">静 候 佳 音</p>
          </div>
        ) : (
          <div className="space-y-24 pb-20">
            {Object.values(PrizeTier).map((tier) => {
              const tierWinners = groupedWinners[tier];
              if (tierWinners.length === 0) return null;
              const config = PRIZE_CONFIG[tier as PrizeTier];

              return (
                <div key={tier} className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                  <div className="flex items-center space-x-10">
                    <div className="w-20 h-20 rounded-3xl glass-morphism flex items-center justify-center shadow-2xl border-white/10 text-4xl">
                       {config.icon}
                    </div>
                    <div>
                      <h4 className="text-5xl font-black chinese-font gold-text flex items-center gap-8">
                        <span>{tier}</span>
                        <span className="text-base font-bold bg-white/5 text-white/60 px-6 py-2 rounded-full border border-white/5">{tierWinners.length} 名</span>
                      </h4>
                      <p className="text-[11px] font-bold text-white/20 uppercase tracking-widest mt-2">{config.item}</p>
                    </div>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                    {tierWinners.sort((a, b) => b.wonAt - a.wonAt).map((winner) => (
                      <div key={winner.id} className="group glass-morphism p-8 rounded-[36px] border-white/5 flex items-center space-x-6 hover:bg-white/10 hover:scale-105 transition-all duration-500 shadow-xl">
                        <div className="relative">
                            <img src={winner.avatar} className="w-16 h-16 rounded-2xl object-cover shadow-2xl ring-2 ring-white/10" alt={winner.name} />
                            <div className="absolute -top-2 -right-2 bg-[#d4af37] text-[#4a0000] text-[8px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg">✓</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-white text-2xl truncate chinese-font">{winner.name}</h5>
                          <p className="text-[9px] text-white/30 uppercase font-black tracking-widest mt-1 truncate">{winner.department}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
