import { useState } from 'react';
import { 
  Shield, Plus
} from 'lucide-react';

export default function Role() {
  return (
    <div className="h-full flex flex-col fade-in">
      <header className="px-6 py-4 border-b border-[#1E293B] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Shield className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">角色管理</h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono uppercase tracking-wider">System / Roles</p>
          </div>
        </div>
      </header>

      <div className="p-6 shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <input type="text" placeholder="角色名称" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-[#94A3B8] focus:border-purple-500 outline-none" />
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-purple-500 outline-none">
            <option value="">角色类型</option>
          </select>
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-purple-500 outline-none">
            <option value="">角色状态</option>
          </select>
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-purple-500 outline-none">
            <option value="">数据权限范围</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" /> 新增角色
          </button>
        </div>
      </div>

      <div className="px-6 pb-6 flex-1 overflow-hidden flex flex-col">
        <div className="bg-[#111622] border border-[#1E293B] rounded-lg flex-1 flex flex-col overflow-hidden">
           <div className="overflow-x-auto min-w-[800px] flex-1 text-center text-[#64748B] flex items-center justify-center text-sm">
             （角色列表与权限树略）
           </div>
        </div>
      </div>
    </div>
  );
}
