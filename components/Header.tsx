
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  view: AppView;
  participantCount: number;
  winnerCount: number;
}

const Header: React.FC<HeaderProps> = ({ view, participantCount, winnerCount }) => {
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
                <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">池内</span>
                <span className="text-xs font-black text-white">{participantCount}</span>
            </div>
            <div className="px-4 py-1.5 momentum-glass rounded-full border-white/5 flex items-center gap-2">
                <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">已抽</span>
                <span className="text-xs font-black text-[#d4af37]">{winnerCount}</span>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
