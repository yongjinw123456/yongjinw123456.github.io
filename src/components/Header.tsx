import { Bell, Search, Settings, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-tech-panel/80 backdrop-blur-md border-b border-tech-border flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center text-xs gap-2 text-[#64748B]">
          <span>系统核心</span>
          <span>/</span>
          <span className="text-tech-cyan flex items-center gap-2 bg-[#0F172A] px-3 py-1.5 rounded-md border border-[#1E293B]">
            <Search className="w-3.5 h-3.5 opacity-70" />
            <input 
              type="text" 
              placeholder="快速搜索水库/设备..." 
              className="bg-transparent border-none outline-none text-[#E0E6ED] placeholder-[#64748B] w-48 text-xs"
            />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-[10px] font-mono text-tech-cyan bg-tech-cyan/5 px-2 py-1 border border-tech-cyan/20 rounded shadow-[0_0_10px_rgba(34,211,238,0.1)]">
          STATUS: ONLINE
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative text-[#94A3B8] hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]"></span>
          </button>
          
          <div className="h-4 w-px bg-tech-border"></div>
          
          <div className="flex items-center gap-3">
             <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-tech-cyan flex items-center justify-center shadow-lg">
                <User className="w-4 h-4 text-white" />
             </div>
             <div className="flex flex-col">
                <span className="text-xs font-medium text-white leading-none mb-1">管理员</span>
                <span className="text-[10px] text-[#64748B] leading-none">Super Admin</span>
             </div>
             <div className="ml-2 pl-3 border-l border-[#1E293B] flex items-center gap-2">
                <button title="Settings" className="text-[#94A3B8] hover:text-white transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
                <button title="Logout" onClick={() => navigate('/login')} className="text-[#94A3B8] hover:text-red-400 transition-colors ml-1">
                  <LogOut className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}
