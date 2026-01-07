
import React from 'react';

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'normal' | 'danger';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  title, message, confirmText, cancelText, onConfirm, onCancel, variant = 'normal' 
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"></div>
      
      {/* 弹窗主体 */}
      <div className="relative w-full max-w-sm momentum-glass rounded-[32px] p-8 border border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.5)] animate-in zoom-in-95 fade-in duration-300">
        <div className="flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-inner border border-white/10 ${variant === 'danger' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
            {variant === 'danger' ? '⚠️' : '🏮'}
          </div>
          
          <h3 className="text-xl font-black text-white mb-2 chinese-font tracking-wider">
            {title}
          </h3>
          <p className="text-sm text-white/60 font-medium leading-relaxed px-4">
            {message}
          </p>
          
          <div className="mt-10 flex flex-col w-full gap-3">
            <button
              onClick={onConfirm}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
                variant === 'danger' 
                  ? 'bg-red-600 text-white hover:bg-red-500' 
                  : 'bg-white text-red-900 hover:bg-gray-100'
              }`}
            >
              {confirmText}
            </button>
            <button
              onClick={onCancel}
              className="w-full py-4 rounded-2xl font-bold text-white/40 text-sm uppercase tracking-widest hover:text-white/80 transition-all active:scale-95"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
