
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  view: AppView;
  participantCount: number;
  winnerCount: number;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ view, participantCount, winnerCount, onReset }) => {
  const getHeaderTitle = () => {
    switch(view) {
      case AppView.LOTTERY: return '盛典抽奖现场';
      case AppView.DIRECTORY: return '全员群英荟萃';
      case AppView.HISTORY: return '中奖喜报公示';
      case AppView.PRIZES: return '盛典礼遇一览';
      default: return '';
    }
  };

  return (
    <header className="h-20 flex-none flex items-center justify-between px-12 z-30">
      <div className="flex items-center gap-12">
        <div className="flex flex-col select-none">
            <h1 className="text-xl font-black tracking-tighter text-white">
                CISCO <span className="gold-shimmer">WEBEX</span>
            </h1>
            <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.4em] mt-0.5">Annual Gala 2026</span>
        </div>
        
        <div className="h-6 w-[1px] bg-white/10"></div>
        
        <h2 className="text-2xl font-black gold-shimmer chinese-font tracking-widest">
          {getHeaderTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex gap-4">
            <div className="px-4 py-1.5 momentum-glass rounded-full border-white/5 flex items-center gap-2">
                <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Pool</span>
                <span className="text-xs font-black text-white">{participantCount}</span>
            </div>
            <div className="px-4 py-1.5 momentum-glass rounded-full border-white/5 flex items-center gap-2">
                <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Drawn</span>
                <span className="text-xs font-black text-[#d4af37]">{winnerCount}</span>
            </div>
        </div>

        <button 
          onClick={onReset}
          className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full border border-white/10 group transition-all"
        >
          <svg className="w-4 h-4 text-white/20 group-hover:text-white transition-transform group-hover:rotate-180 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
