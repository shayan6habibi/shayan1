
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Shield, 
  Home,
  Server as ServerIcon, 
  Cpu, 
  HelpCircle, 
  Settings as SettingsIcon, 
  Power,
  Globe,
  Wifi,
  Activity,
  ChevronRight
} from 'lucide-react';
import { View, Server } from './types';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';
import ServerList from './components/ServerList';
import AIAssistant from './components/AIAssistant';
import ConnectionIssues from './components/ConnectionIssues';
import Settings from './components/Settings';

const DEFAULT_SUBSCRIPTION_URL = "https://raw.githubusercontent.com/shayan6habibi/shayan/refs/heads/main/shayan";

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.HOME);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [isLoadingServers, setIsLoadingServers] = useState<boolean>(false);
  const [hasAutoAttempted, setHasAutoAttempted] = useState<boolean>(false);
  const [subscriptionUrl, setSubscriptionUrl] = useState<string>(
    localStorage.getItem('shayan_sub_url') || DEFAULT_SUBSCRIPTION_URL
  );

  const parseSubscription = (text: string): Server[] => {
    let content = text;
    try {
      if (!text.includes('://')) {
        content = atob(text.trim());
      }
    } catch (e) {}

    const lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const countries = ['آلمان', 'آمریکا', 'فنلاند', 'هلند', 'انگلستان', 'ترکیه', 'فرانسه', 'ژاپن', 'سنگاپور'];
    
    return lines.map((line, index) => {
      let name = `گره ${index + 1}`;
      let protocol = 'ناشناخته';
      
      const protocolMatch = line.match(/^([a-z0-9]+):\/\//i);
      if (protocolMatch) protocol = protocolMatch[1].toUpperCase();

      const fragmentMatch = line.match(/#(.+)$/);
      if (fragmentMatch) {
        name = decodeURIComponent(fragmentMatch[1]);
      } else {
        if (protocol === 'VMESS') {
          try {
            const vmessData = JSON.parse(atob(line.replace('vmess://', '')));
            if (vmessData.ps) name = vmessData.ps;
          } catch (e) {}
        }
      }

      const country = countries[index % countries.length];

      return {
        id: `srv-${index}`,
        name: name,
        country: country,
        latency: Math.floor(Math.random() * 80) + 30,
        protocol: protocol,
        flag: country
      };
    });
  };

  const handleToggleConnection = useCallback(() => {
    if (isConnected) {
      setIsConnected(false);
    } else {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
      }, 2000);
    }
  }, [isConnected]);

  const fetchServers = useCallback(async (url: string = subscriptionUrl) => {
    setIsLoadingServers(true);
    try {
      const response = await fetch(url);
      const text = await response.text();
      const parsedServers = parseSubscription(text);

      setServers(parsedServers);
      if (parsedServers.length > 0) {
        setSelectedServer(parsedServers[0]);
      }
    } catch (error) {
      console.error("Failed to fetch servers", error);
    } finally {
      setIsLoadingServers(false);
    }
  }, [subscriptionUrl]);

  const refreshLatency = useCallback(() => {
    setServers(prev => prev.map(s => ({
      ...s,
      latency: Math.floor(Math.random() * 80) + 20
    })));
  }, []);

  const updateSubscriptionUrl = (newUrl: string) => {
    setSubscriptionUrl(newUrl);
    localStorage.setItem('shayan_sub_url', newUrl);
    fetchServers(newUrl);
  };

  useEffect(() => {
    fetchServers();
  }, []);

  useEffect(() => {
    const isAutoConnectEnabled = localStorage.getItem('shayan_auto_connect') === 'true';
    if (isAutoConnectEnabled && servers.length > 0 && !isConnected && !isConnecting && !hasAutoAttempted) {
      setHasAutoAttempted(true);
      handleToggleConnection();
    }
  }, [servers, isConnected, isConnecting, hasAutoAttempted, handleToggleConnection]);

  const renderContent = () => {
    switch (activeView) {
      case View.HOME:
        return (
          <MainView 
            isConnected={isConnected} 
            isConnecting={isConnecting} 
            onToggle={handleToggleConnection} 
            selectedServer={selectedServer}
          />
        );
      case View.SERVERS:
        return (
          <ServerList 
            servers={servers} 
            selectedServer={selectedServer} 
            onSelect={setSelectedServer}
            isLoading={isLoadingServers}
            onRefresh={refreshLatency}
          />
        );
      case View.AI_ASSISTANT:
        return <AIAssistant />;
      case View.ISSUES:
        return <ConnectionIssues />;
      case View.SETTINGS:
        return <Settings 
          subscriptionUrl={subscriptionUrl} 
          onUpdateUrl={updateSubscriptionUrl} 
        />;
      default:
        return <MainView isConnected={isConnected} isConnecting={isConnecting} onToggle={handleToggleConnection} selectedServer={selectedServer} />;
    }
  };

  const navItems = [
    { id: View.HOME, label: 'داشبورد', icon: Home },
    { id: View.SERVERS, label: 'سرورها', icon: ServerIcon },
    { id: View.AI_ASSISTANT, label: 'هوش مصنوعی', icon: Cpu },
    { id: View.ISSUES, label: 'عیب‌یابی', icon: HelpCircle },
    { id: View.SETTINGS, label: 'تنظیمات', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen w-screen bg-[#0a0a14] text-gray-100 overflow-hidden relative font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#2d1b33] to-[#12122b] opacity-80 pointer-events-none" />
      
      <div className="absolute top-[-5%] right-[-5%] w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full" />
      <div className="absolute bottom-[-5%] left-[-5%] w-64 h-64 bg-pink-600/10 blur-[80px] rounded-full" />

      <div className="flex w-full h-full relative z-10 backdrop-blur-sm flex-col md:flex-row">
        {/* Sidebar - Desktop Only */}
        <div className="hidden md:block">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
        </div>
        
        <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden pb-24 md:pb-8">
          <header className="flex justify-between items-center mb-6 md:mb-10">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Shield className="text-white w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold font-cyber tracking-widest text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-pink-400">
                  SHAYAN
                </h1>
                <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-500">پروتکل امن نسخه ۴.۰</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-xl backdrop-blur-md flex items-center gap-2">
              <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`} />
              <span className="text-[10px] md:text-xs font-bold tracking-tight text-gray-300 whitespace-nowrap">
                {isConnected ? 'سیستم آنلاین' : 'سیستم آفلاین'}
              </span>
            </div>
          </header>

          <div className="flex-1 overflow-hidden relative">
             {renderContent()}
          </div>
        </main>

        {/* Bottom Nav - Mobile Only */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-2xl border-t border-white/5 flex justify-around items-center py-3 px-2 z-50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-indigo-400' : 'text-gray-500'}`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-indigo-500/10 text-indigo-400' : ''}`}>
                  <Icon size={20} />
                </div>
                <span className="text-[9px] font-bold tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default App;
