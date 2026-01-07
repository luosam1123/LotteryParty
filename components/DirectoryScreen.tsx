
import React, { useState } from 'react';
import { Participant, Winner } from '../types';

interface DirectoryScreenProps {
  participants: Participant[];
  winners: Winner[];
}

const DirectoryScreen: React.FC<DirectoryScreenProps> = ({ participants, winners }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const winnerIds = new Set(winners.map(w => w.id));

  const filtered = participants.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-10 border-b border-red-900/5 flex items-center bg-white/60 backdrop-blur-sm">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-red-900/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="输入姓名或部门搜索团队成员..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-8 py-4 bg-white/80 border-2 border-red-900/10 rounded-[24px] text-base font-bold focus:ring-4 focus:ring-red-900/5 focus:border-red-900/40 transition-all outline-none text-red-950 placeholder:text-red-900/30 shadow-inner"
          />
        </div>
        <div className="ml-8 flex items-center space-x-3">
            <span className="text-[10px] font-black text-red-950/40 uppercase tracking-[0.3em]">
              展示人数
            </span>
            <span className="px-5 py-1.5 bg-red-950 text-yellow-400 font-black rounded-full text-xs shadow-lg">
               {filtered.length} / {participants.length}
            </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-16">
          {filtered.map(p => {
            const isWinner = winnerIds.has(p.id);
            const winnerData = winners.find(w => w.id === p.id);
            return (
              <div 
                key={p.id} 
                className={`group relative flex items-center space-x-6 p-6 rounded-[32px] border-2 transition-all duration-300 ${
                  isWinner 
                    ? 'bg-yellow-50/50 border-yellow-400 shadow-xl' 
                    : 'bg-white border-red-900/5 hover:border-red-900/20 hover:shadow-2xl hover:scale-[1.03]'
                }`}
              >
                <div className="relative">
                    <img src={p.avatar} alt={p.name} className="w-20 h-20 rounded-[20px] object-cover shadow-inner ring-4 ring-red-900/5 group-hover:ring-red-900/10 transition-all" />
                    {isWinner && (
                      <div className="absolute -top-3 -right-3 bg-red-900 text-yellow-400 p-2 rounded-xl shadow-xl border-2 border-white animate-bounce">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-red-950 text-xl truncate chinese-font tracking-wide">{p.name}</h4>
                  <p className="text-[10px] font-black text-red-900/40 uppercase tracking-widest truncate mt-1">{p.department}</p>
                  
                  {isWinner && (
                    <div className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 bg-red-900 text-[10px] text-yellow-400 font-black rounded-lg uppercase shadow-md border border-yellow-400/30">
                      <span>{winnerData?.prizeTier}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DirectoryScreen;
