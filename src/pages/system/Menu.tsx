import { useState } from 'react';
import { 
  MenuSquare, Plus
} from 'lucide-react';

export default function Menu() {
  return (
    <div className="h-full flex flex-col fade-in">
      <header className="px-6 py-4 border-b border-[#1E293B] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <MenuSquare className="w-5 h-5 text-cyan-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">菜单管理</h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono uppercase tracking-wider">System / Menus</p>
          </div>
        </div>
      </header>

      <div className="p-6 shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 ml-auto">
          <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" /> 新增菜单
          </button>
        </div>
      </div>

      <div className="px-6 pb-6 flex-1 overflow-hidden flex flex-col">
        <div className="bg-[#111622] border border-[#1E293B] rounded-lg flex-1 flex flex-col overflow-hidden">
           <div className="overflow-x-auto min-w-[800px] flex-1 text-center text-[#64748B] flex items-center justify-center text-sm">
             （菜单配置树及详情略）
           </div>
        </div>
      </div>
    </div>
  );
}
