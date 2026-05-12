import { useLocation } from 'react-router-dom';
import { Activity, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export default function H5PlaceholderPage() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const title = pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'stats';
  
  const titles: Record<string, string> = {
    stats: '数据统计',
    events: '事件列表',
    profile: '个人中心'
  };

  const displayTitle = titles[title] || title;

  return (
    <div className="w-full min-h-full pb-20 fade-in duration-300">
       <header className="px-6 py-8 text-center relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 bg-[#111622] border-b border-[#1E293B] -z-10" />
          <div className="w-12 h-12 flex items-center justify-center rounded bg-[#0F172A] border border-[#1E293B] mb-4">
             <Activity className="w-6 h-6 text-tech-cyan" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1.5">{displayTitle}</h1>
          <p className="text-[10px] text-tech-cyan uppercase tracking-widest font-mono">Mobile Node Active</p>
       </header>

       <div className="px-4 mt-6 space-y-3">
         {[1, 2, 3].map((item) => (
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: item * 0.1 }}
             key={item} 
             className="bg-[#111622] border border-[#1E293B] rounded-lg p-3 flex items-center gap-4"
           >
             <div className="w-10 h-10 rounded bg-[#0F172A] border border-[#1E293B] flex items-center justify-center">
               <ShieldAlert className="w-5 h-5 text-tech-cyan" />
             </div>
             <div className="flex-1">
               <div className="text-xs font-bold text-white mb-0.5">系统进程 {item}</div>
               <div className="text-[10px] text-[#64748B]">同步状态: 正常</div>
             </div>
             <div className="text-[10px] text-tech-cyan font-mono border border-tech-cyan/30 px-2 py-0.5 rounded text-center">
               OK
             </div>
           </motion.div>
         ))}
       </div>
    </div>
  );
}
