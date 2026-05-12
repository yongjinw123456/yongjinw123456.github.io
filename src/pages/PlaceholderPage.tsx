import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, ShieldCheck, Database, Server, ServerCrash, Cpu } from 'lucide-react';

export default function PlaceholderPage() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const title = pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'Dashboard';
  const displayTitle = decodeURIComponent(title).replace(/-/g, ' ');

  return (
    <div className="h-full flex flex-col gap-6 p-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
             <span className="w-1.5 h-5 bg-tech-cyan rounded-sm"></span>
             <span className="capitalize">{displayTitle}</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1 pl-4 uppercase tracking-wider font-mono">
            PATH: {location.pathname}
          </p>
        </div>
        <div className="text-right flex items-center gap-4">
           <div>
             <div className="text-[10px] text-[#475569] uppercase font-bold tracking-wider mb-1">System Status</div>
             <div className="text-tech-cyan font-bold font-mono text-sm">OPTIMAL</div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Data Nodes Active', value: '1,492', sub: '▲ 12% from last hour', icon: Database, color: 'text-tech-cyan' },
          { label: 'Processing Speed', value: '1.2ms', sub: 'Low latency maintained', icon: Cpu, color: 'text-blue-400' },
          { label: 'Risk Index', value: '03', sub: 'No immediate threats', icon: ShieldCheck, color: 'text-green-500' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="tech-panel p-4 relative overflow-hidden group flex flex-col justify-between"
          >
            <div className={`absolute top-0 right-0 w-16 h-16 opacity-5`}>
               <stat.icon className={`w-full h-full ${stat.color}`} />
            </div>
            <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">{stat.label}</div>
            <div className="text-2xl font-mono text-white mt-1">{stat.value}</div>
            <div className={`text-[10px] ${stat.color} mt-1`}>{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex-1 tech-panel p-6 flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative border border-tech-border p-8 rounded-full bg-tech-panel-secondary">
          <Server className="w-16 h-16 text-[#64748B] relative z-10" />
          
          {/* Decorative tech rings */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-[#1E293B] animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
             <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" />
             <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" />
          </svg>
        </div>
        
        <h3 className="text-sm font-bold text-[#94A3B8] mt-8 uppercase tracking-widest">Module Not Fully Deployed</h3>
        <p className="text-[#64748B] mt-2 max-w-md text-center text-xs leading-relaxed">
           The <span className="text-tech-cyan font-mono">{displayTitle}</span> interface is currently being initialized. Connected to the regional database grid, waiting for full telemetry stream...
        </p>
      </div>
    </div>
  );
}
