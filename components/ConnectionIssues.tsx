
import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, ZapOff, RefreshCcw } from 'lucide-react';

const ConnectionIssues: React.FC = () => {
  const diagnostics = [
    { label: 'سلامت DNS', status: 'مطلوب', icon: CheckCircle, color: 'text-green-400' },
    { label: 'تطبیق پروتکل', status: 'تایید شده', icon: CheckCircle, color: 'text-green-400' },
    { label: 'نوسان تأخیر', status: 'تأخیر جزئی', icon: AlertTriangle, color: 'text-yellow-400' },
    { label: 'عبور از فایروال', status: 'فعال', icon: CheckCircle, color: 'text-green-400' },
  ];

  return (
    <div className="h-full flex flex-col gap-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold mb-2">تشخیص شبکه</h2>
        <p className="text-gray-500">وضعیت سلامت لحظه‌ای پیوند رمزنگاری شده شما</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {diagnostics.map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className={`p-3 bg-white/5 rounded-2xl ${item.color}`}>
                <item.icon size={24} />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">{item.label}</p>
                <p className="font-semibold">{item.status}</p>
              </div>
            </div>
            <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
               <div className={`h-full ${item.color.replace('text', 'bg')} w-4/5`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-[40px] relative overflow-hidden group">
        <div className="absolute top-0 left-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
           <ShieldAlert size={120} />
        </div>
        <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2 text-right">
          <ZapOff size={20} />
          موانع احتمالی شناسایی شد
        </h3>
        <ul className="space-y-4 text-sm text-gray-400 relative z-10 text-right">
          <li className="flex items-start gap-3 flex-row-reverse">
             <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400" />
             <span>ارائه‌دهنده اینترنت شما ممکن است بسته‌های رمزنگاری شده را در پورت ۴۴۳ محدود کند.</span>
          </li>
          <li className="flex items-start gap-3 flex-row-reverse">
             <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400" />
             <span>ترافیک بالایی در درگاه خاورمیانه شناسایی شده است.</span>
          </li>
          <li className="flex items-start gap-3 flex-row-reverse">
             <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400" />
             <span>برای استتار بهتر، استفاده از پروتکل Trojan را مد نظر قرار دهید.</span>
          </li>
        </ul>
        <button className="mt-8 flex items-center gap-2 px-8 py-3 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-400 font-bold text-xs hover:bg-red-500/30 transition-all mr-auto">
          <RefreshCcw size={16} />
          بازنشانی تنظیمات شبکه
        </button>
      </div>
    </div>
  );
};

export default ConnectionIssues;
