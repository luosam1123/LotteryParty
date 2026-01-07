
import React from 'react';
import { Winner, PRIZE_CONFIG, PrizeTier } from '../types';

interface PrizesScreenProps {
  winners: Winner[];
}

const PrizesScreen: React.FC<PrizesScreenProps> = ({ winners }) => {
  const getRemainingCount = (tier: PrizeTier) => {
    const wonCount = winners.filter(w => w.prizeTier === tier).length;
    return Math.max(0, PRIZE_CONFIG[tier].total - wonCount);
  };

  return (
    <div className="w-full h-full flex flex-col p-8 overflow-y-auto scrollbar-hide">
      <div className="mb-10 text-center">
        <h3 className="text-4xl font-black text-red-800 chinese-font">丰厚年会大礼</h3>
        <p className="text-red-900/60 font-bold uppercase tracking-[0.2em] mt-2">Check out the amazing rewards for our Webex stars!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
        {Object.values(PRIZE_CONFIG).map((prize) => {
          const remaining = getRemainingCount(prize.tier);
          const isGone = remaining === 0;
          const percentage = (remaining / prize.total) * 100;

          return (
            <div 
              key={prize.tier} 
              className={`relative overflow-hidden group p-7 rounded-[40px] border-2 transition-all duration-500 ${
                isGone 
                  ? 'bg-gray-50 border-gray-200 grayscale opacity-60' 
                  : 'bg-white border-red-100 hover:border-yellow-400 hover:shadow-[0_20px_50px_rgba(185,28,28,0.15)] hover:-translate-y-2'
              }`}
            >
              {/* Background Decor */}
              <div className={`absolute -right-8 -bottom-8 text-9xl opacity-[0.03] transition-transform group-hover:scale-125 duration-700`}>
                {prize.icon}
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className={`text-4xl p-4 rounded-3xl ${isGone ? 'bg-gray-100' : 'bg-red-50'} shadow-inner border border-red-100/50`}>
                    {prize.icon}
                  </div>
                  <div className={`px-5 py-2 rounded-2xl text-sm font-black uppercase tracking-widest chinese-font ${isGone ? 'bg-gray-200 text-gray-500' : 'bg-gradient-to-r from-red-600 to-red-800 text-yellow-400 shadow-lg shadow-red-200'}`}>
                    {prize.tier}
                  </div>
                </div>

                <h4 className="text-2xl font-black text-red-900 mb-1 chinese-font tracking-wide">{prize.item}</h4>
                <p className="text-sm text-red-800/50 font-medium mb-8 leading-relaxed">{prize.description}</p>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span className={isGone ? 'text-gray-400' : 'text-red-800/40'}>剩余名额</span>
                    <span className={isGone ? 'text-red-400' : 'text-red-700'}>{remaining} / {prize.total}</span>
                  </div>
                  <div className="h-3 w-full bg-red-50 rounded-full overflow-hidden border border-red-100">
                    <div 
                      className={`h-full transition-all duration-1000 ease-out rounded-full ${isGone ? 'bg-gray-300' : 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-[0_0_10px_rgba(234,179,8,0.5)]'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {isGone && (
                  <div className="mt-6 py-3 text-center bg-gray-100 rounded-2xl text-xs font-black text-gray-400 border border-dashed border-gray-300 uppercase tracking-[0.2em]">
                    已全部抽出
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrizesScreen;
