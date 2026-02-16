
import React from 'react';

interface AIAvatarProps {
  efficiency: number;
  isThinking: boolean;
  message: string;
}

const AIAvatar: React.FC<AIAvatarProps> = ({ efficiency, isThinking, message }) => {
  const getFaceState = () => {
    if (efficiency < 40) return 'critical';
    if (efficiency < 75) return 'worried';
    return 'happy';
  };

  const state = getFaceState();

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Speech Bubble - Personified Smart Notification */}
      <div className="relative mb-8 w-full max-w-lg">
        <div className={`bg-white border-2 border-blue-50 shadow-2xl rounded-3xl p-6 text-center transform transition-all duration-500 hover:scale-[1.02] ${isThinking ? 'opacity-50' : 'opacity-100'}`}>
          <div className="absolute -top-3 left-6 bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
            Njoftim Inteligjent
          </div>
          <p className="text-slate-800 font-semibold text-lg leading-relaxed italic">
            "{isThinking ? "Duke u menduar..." : message}"
          </p>
          {/* Bubble Tail */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-r-2 border-b-2 border-blue-50 rotate-45 shadow-[4px_4px_10px_rgba(0,0,0,0.05)]"></div>
        </div>
      </div>

      {/* Avatar Face Container */}
      <div className="relative group">
        <div className={`w-52 h-52 rounded-full bg-gradient-to-br from-slate-50 via-blue-100 to-blue-200 border-8 border-white shadow-inner flex items-center justify-center transition-all duration-700 ${state === 'critical' ? 'animate-pulse scale-105' : 'hover:scale-105'}`}>
          
          <div className="flex flex-col items-center space-y-6">
            {/* Eyes */}
            <div className="flex space-x-12">
              <div className={`w-5 h-8 bg-slate-800 rounded-full transition-all duration-300 ${state === 'critical' ? 'h-2 w-8 bg-red-600' : state === 'worried' ? 'h-4 w-6' : 'animate-[bounce_3s_infinite]'}`}></div>
              <div className={`w-5 h-8 bg-slate-800 rounded-full transition-all duration-300 ${state === 'critical' ? 'h-2 w-8 bg-red-600' : state === 'worried' ? 'h-4 w-6' : 'animate-[bounce_3s_infinite]'}`}></div>
            </div>
            {/* Mouth */}
            <div className={`transition-all duration-500 ${
              state === 'happy' 
                ? 'w-12 h-6 border-b-4 border-slate-800 rounded-full mt-2' 
                : state === 'worried' 
                  ? 'w-10 h-1 bg-slate-800 rounded-full' 
                  : 'w-6 h-6 border-4 border-red-500 rounded-full animate-ping'
            }`}></div>
          </div>
        </div>
        
        {/* Techy Outer Ring */}
        <div className={`absolute -inset-4 rounded-full border-2 border-dashed opacity-20 animate-[spin_20s_linear_infinite] ${state === 'critical' ? 'border-red-500' : 'border-blue-500'}`}></div>
        
        {/* Glow */}
        <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 -z-10 transition-colors duration-1000 ${state === 'critical' ? 'bg-red-500' : 'bg-blue-400'}`}></div>
      </div>

      <div className="text-center mt-10">
        <h1 className="text-4xl font-black text-slate-800 tracking-tighter">
          SmartFilter <span className="text-blue-600">AI</span>
        </h1>
        <p className="text-slate-400 font-medium mt-2">Monitorimi Inteligjent i Filtrit Aktiv</p>
      </div>
    </div>
  );
};

export default AIAvatar;
