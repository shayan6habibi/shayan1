
import React from 'react';
import { View } from '../types';
import { 
  Home, 
  Server as ServerIcon, 
  Cpu, 
  HelpCircle, 
  Settings as SettingsIcon 
} from 'lucide-react';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: View.HOME, label: 'داشبورد', icon: Home },
    { id: View.SERVERS, label: 'لیست سرورها', icon: ServerIcon },
    { id: View.AI_ASSISTANT, label: 'دستیار هوشمند', icon: Cpu },
    { id: View.ISSUES, label: 'مشکلات اتصال', icon: HelpCircle },
    { id: View.SETTINGS, label: 'تنظیمات', icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 h-full bg-black/30 border-l border-white/5 flex flex-col items-start py-8 backdrop-blur-xl">
      <div className="mb-12 px-6 w-full">
        <div className="text-xs text-indigo-400 font-bold tracking-[0.2em] mb-4 text-right uppercase">ناوبری</div>
      </div>
      
      <nav className="w-full space-y-2 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-l from-indigo-600/20 to-pink-600/20 border border-white/10 text-white' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-transparent'}`}>
                <Icon size={20} />
              </div>
              <span className={`text-sm font-medium tracking-wide transition-all ${isActive ? '-translate-x-1' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="mr-auto w-1 h-4 bg-indigo-400 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto px-6 w-full">
        <div className="p-4 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 border border-white/5 rounded-2xl">
          <p className="text-[10px] text-gray-500 mb-2 text-right">جریان داده</p>
          <div className="flex gap-1 flex-row-reverse">
             {[1,2,3,4,5].map(i => (
               <div key={i} className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-1/2 animate-pulse" />
               </div>
             ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
