
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onReset }) => {
  const menuItems = [
    { id: AppView.LOTTERY, label: '抽奖', icon: '🎁' },
    { id: AppView.PRIZES, label: '奖品', icon: '🏆' },
    { id: AppView.DIRECTORY, label: '成员', icon: '👥' },
    { id: AppView.HISTORY, label: '喜报', icon: '📜' },
  ];

  return (
    <aside className="w-24 flex flex-col items-center py-10 momentum-glass m-4 mr-0 rounded-[32px] border-white/20">
      <div className="mb-14">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 shadow-xl">
           <span className="text-yellow-400 font-black text-xl">W</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col space-y-10">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 relative group ${
              currentView === item.id 
                ? 'bg-white/20 shadow-[0_0_20px_rgba(255,215,0,0.3)] text-white' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className={`text-2xl transition-transform duration-500 ${currentView === item.id ? 'scale-110' : ''}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] font-bold mt-1 uppercase transition-opacity ${currentView === item.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
              {item.label}
            </span>
            {currentView === item.id && (
              <div className="absolute -left-4 w-1 h-8 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]"></div>
            )}
          </button>
        ))}
      </nav>

      {/* 底部系统操作区域 */}
      <div className="mt-auto pt-6 border-t border-white/10 w-full flex flex-col items-center gap-4">
        <button
          onClick={onReset}
          className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center bg-red-600/10 hover:bg-red-600/30 text-red-200 transition-all border border-red-500/20 group shadow-lg active:scale-90"
          title="重置系统数据"
        >
          <span className="text-xl group-hover:rotate-180 transition-transform duration-700">🔄</span>
          <span className="text-[8px] font-black mt-1 uppercase opacity-60">重置</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
