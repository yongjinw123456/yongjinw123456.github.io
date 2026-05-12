import { Bell, Search, UserCircle, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-tech-panel border-b border-tech-border flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center text-xs gap-2 text-[#64748B]">
          <span>核心后台</span>
          <span>/</span>
          <span className="text-tech-cyan flex items-center gap-2">
            <Search className="w-3 h-3" />
            <input 
              type="text" 
              placeholder="快速搜索..." 
              className="bg-transparent border-none outline-none text-tech-cyan placeholder-tech-cyan/50 w-48"
            />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-[11px] font-mono text-tech-cyan bg-tech-cyan/5 px-3 py-1 border border-tech-cyan/20 rounded">
          SYSTEM ONLINE
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative text-[#94A3B8] hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="h-4 w-px bg-tech-border"></div>
          <button className="text-[#94A3B8] hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
