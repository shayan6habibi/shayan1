
import React, { useState } from 'react';
import { Shield, Zap, Bell, Monitor } from 'lucide-react';

interface SettingsProps {
  subscriptionUrl: string;
  onUpdateUrl: (url: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ subscriptionUrl, onUpdateUrl }) => {
  const [settings, setSettings] = useState({
    killSwitch: true,
    autoConnect: localStorage.getItem('shayan_auto_connect') === 'true',
    obfuscation: true,
    notifications: true
  });

  const toggle = (key: keyof typeof settings) => {
    const newValue = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newValue }));
    if (key === 'autoConnect') {
      localStorage.setItem('shayan_auto_connect', String(newValue));
    }
  };

  const sections = [
    {
      title: 'امنیت شبکه',
      items: [
        { key: 'killSwitch', label: 'کلید قطع اضطراری', desc: 'قطع داده هنگام قطع وی‌پی‌ان', icon: Shield },
        { key: 'obfuscation', label: 'حالت سایه', desc: 'مخفی‌سازی استفاده از وی‌پی‌ان', icon: Zap },
      ]
    },
    {
      title: 'سیستم',
      items: [
        { key: 'autoConnect', label: 'اتصال خودکار', desc: 'شروع اتصال هنگام اجرای اپ', icon: Monitor },
        { key: 'notifications', label: 'اعلان‌ها', desc: 'هشدارهای وضعیت اتصال', icon: Bell },
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col gap-6 md:gap-10 max-w-4xl mx-auto overflow-y-auto pr-1 pb-10 text-right">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-1">پیکربندی سیستم</h2>
        <p className="text-gray-500 text-xs md:text-sm">تجربه خود را شخصی‌سازی کنید</p>
      </div>

      <div className="space-y-8 md:space-y-12">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4 md:space-y-6">
            <h3 className="text-[10px] md:text-xs font-bold text-indigo-400 tracking-widest pr-4 uppercase">{section.title}</h3>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div 
                  key={item.key} 
                  className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-3xl flex items-center justify-between backdrop-blur-md"
                >
                  <div className="flex items-center gap-4 flex-row-reverse overflow-hidden">
                    <div className="p-2 md:p-3 bg-indigo-500/10 rounded-xl md:rounded-2xl text-indigo-400 shrink-0">
                       <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="text-right truncate">
                      <p className="text-sm md:font-semibold text-gray-200 truncate">{item.label}</p>
                      <p className="hidden md:block text-[10px] md:text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => toggle(item.key as keyof typeof settings)}
                    className={`w-10 h-6 md:w-14 md:h-8 rounded-full relative transition-colors duration-300 flex items-center px-1 shrink-0 ${
                      settings[item.key as keyof typeof settings] ? 'bg-indigo-600' : 'bg-white/10'
                    }`}
                  >
                    <div className={`w-4 h-4 md:w-6 md:h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                      settings[item.key as keyof typeof settings] ? '-translate-x-4 md:-translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
