
import React, { useState } from 'react';
import { Server as ServerType } from '../types';
import { Signal, Globe, Zap, Search, Loader2, Target } from 'lucide-react';

interface ServerListProps {
  servers: ServerType[];
  selectedServer: ServerType | null;
  onSelect: (server: ServerType) => void;
  isLoading: boolean;
  onRefresh: () => void;
}

const ServerList: React.FC<ServerListProps> = ({ servers, selectedServer, onSelect, isLoading, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleSelectBest = () => {
    if (servers.length === 0) return;
    const bestServer = servers.reduce((prev, curr) => (prev.latency < curr.latency) ? prev : curr);
    onSelect(bestServer);
    
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-4 font-bold text-xs md:text-sm whitespace-nowrap';
    toast.innerText = `بهترین گره انتخاب شد: ${bestServer.name}`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('animate-out', 'fade-out', 'slide-out-to-bottom-4');
      setTimeout(() => toast.remove(), 500);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">شبکه سرورها</h2>
          <p className="text-gray-500 text-xs md:text-sm">یک گره از شبکه جهانی انتخاب کنید</p>
        </div>
        <div className="relative w-full md:w-auto">
          <input 
            type="text" 
            placeholder="جستجوی گره‌ها..." 
            className="w-full md:w-64 bg-white/5 border border-white/10 rounded-2xl pr-12 pl-4 py-2.5 md:py-3 text-sm focus:outline-none focus:border-indigo-500/50 backdrop-blur-md text-right"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/5 h-28 md:h-32 rounded-3xl animate-pulse" />
            ))
          ) : (
            servers.map((server) => {
              const isSelected = selectedServer?.id === server.id;
              return (
                <button
                  key={server.id}
                  onClick={() => onSelect(server)}
                  className={`group relative text-right p-4 md:p-6 rounded-3xl border transition-all duration-300 backdrop-blur-md ${
                    isSelected 
                      ? 'bg-gradient-to-bl from-indigo-600/20 to-pink-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10' 
                      : 'bg-white/5 border-white/10 hover:border-indigo-500/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3 md:mb-4">
                    <div className={`p-1.5 md:p-2 rounded-xl ${isSelected ? 'bg-indigo-500 text-white' : 'bg-white/5 text-gray-400 transition-colors'}`}>
                      <Globe size={18} />
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 md:py-1 bg-white/5 rounded-lg border border-white/10 flex-row-reverse">
                      <Signal size={10} className={server.latency < 50 ? 'text-green-400' : 'text-yellow-400'} />
                      <span className="text-[9px] md:text-[10px] text-gray-300 font-mono">{server.latency}ms</span>
                    </div>
                  </div>
                  
                  <h3 className={`font-semibold text-sm md:text-base mb-0.5 md:mb-1 truncate ${isSelected ? 'text-white' : 'text-gray-200'}`}>{server.name}</h3>
                  <p className="text-[9px] md:text-xs text-gray-500 uppercase tracking-widest font-mono">{server.protocol}</p>
                  
                  {isSelected && (
                    <div className="absolute top-3 md:top-4 left-3 md:left-4 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="bg-gradient-to-l from-indigo-500/5 to-pink-500/5 border border-white/10 rounded-3xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 shrink-0">
             {/* Fix: removed invalid md:size prop and used Tailwind classes for responsive sizing */}
             <Zap className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-semibold">بهینه‌سازی هوشمند</p>
            <p className="text-[10px] md:text-xs text-gray-500">یافتن سریع‌ترین گره موجود.</p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={handleSelectBest}
            disabled={isLoading || servers.length === 0}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] md:text-xs font-bold transition-all disabled:opacity-50"
          >
            <Target size={14} />
            <span className="whitespace-nowrap">انتخاب بهترین</span>
          </button>
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] md:text-xs font-bold hover:bg-white/10 transition-all disabled:opacity-50"
          >
            {isRefreshing ? <Loader2 size={12} className="animate-spin" /> : null}
            <span className="whitespace-nowrap">بروزرسانی</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerList;
