
import React from 'react';
import { Power, Globe, Activity, Wifi } from 'lucide-react';
import { Server } from '../types';

interface MainViewProps {
  isConnected: boolean;
  isConnecting: boolean;
  onToggle: () => void;
  selectedServer: Server | null;
}

const MainView: React.FC<MainViewProps> = ({ isConnected, isConnecting, onToggle, selectedServer }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Connection Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 w-full max-w-4xl mb-6 md:mb-12">
        <div className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-3xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 bg-blue-500/20 rounded-xl text-blue-400">
              <Globe size={16} />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">موقعیت</span>
          </div>
          <p className="text-sm md:text-lg font-semibold truncate">{selectedServer?.name || "در حال شناسایی..."}</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-3xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 bg-pink-500/20 rounded-xl text-pink-400">
              <Activity size={16} />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">تأخیر</span>
          </div>
          <p className="text-sm md:text-lg font-semibold tracking-tighter">{selectedServer?.latency || "0"} میلی‌ثانیه</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-3xl backdrop-blur-md sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <div className="p-1.5 md:p-2 bg-green-500/20 rounded-xl text-green-400">
              <Wifi size={16} />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">آدرس IP</span>
          </div>
          <p className="text-sm md:text-lg font-semibold font-mono">{isConnected ? "185.122.90.11" : "---.---.---.---"}</p>
        </div>
      </div>

      {/* Main Power Button */}
      <div className="relative group">
        <div className={`absolute inset-[-20px] md:inset-[-40px] rounded-full blur-[40px] md:blur-[60px] transition-all duration-700 ${
          isConnected ? 'bg-green-500/30' : isConnecting ? 'bg-indigo-500/30 animate-pulse' : 'bg-indigo-500/10'
        }`} />

        <button 
          onClick={onToggle}
          disabled={isConnecting}
          className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full flex flex-col items-center justify-center transition-all duration-500 overflow-hidden border ${
            isConnected 
              ? 'bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)] md:shadow-[0_0_50px_rgba(34,197,94,0.4)] border-green-400' 
              : isConnecting
                ? 'bg-indigo-600 border-indigo-400 scale-95 cursor-wait'
                : 'bg-indigo-600/20 border-white/10 hover:border-indigo-500/50 hover:bg-indigo-600/30 shadow-[0_0_30px_rgba(79,70,229,0.1)]'
          }`}
        >
          <div className={`absolute inset-3 md:inset-4 rounded-full border border-white/10 transition-transform duration-1000 ${isConnected ? 'rotate-180 scale-110' : ''}`} />
          
          <Power className={`w-12 h-12 md:w-20 md:h-20 mb-2 md:mb-4 transition-all duration-500 ${isConnected ? 'text-white' : 'text-indigo-400 group-hover:text-indigo-300'}`} />
          <span className={`text-base md:text-xl font-bold tracking-widest ${isConnected ? 'text-white' : 'text-indigo-300'}`}>
            {isConnecting ? 'در حال اتصال' : isConnected ? 'متصل شد' : 'INITIALIZE'}
          </span>
          
          <div className={`absolute inset-0 overflow-hidden pointer-events-none ${isConnected ? 'opacity-100' : 'opacity-0'}`}>
             <div className="absolute top-0 right-1/2 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '0.1s'}} />
             <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '0.5s'}} />
          </div>
        </button>
      </div>

      <div className="mt-8 md:mt-12 text-center">
        <p className="text-[10px] md:text-sm text-gray-500 font-bold tracking-widest uppercase mb-2">پروتکل فعال</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 bg-white/5 rounded-full border border-white/10">
          <span className="text-[9px] md:text-xs font-medium text-indigo-400 font-mono">SHAYAN-HYBRID-X4</span>
        </div>
      </div>
    </div>
  );
};

export default MainView;
