import { useState } from 'react';
import { 
  Activity
} from 'lucide-react';

export default function OperationLog() {
  return (
    <div className="h-full flex flex-col fade-in">
      <header className="px-6 py-4 border-b border-[#1E293B] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#64748B]/20 rounded-lg">
            <Activity className="w-5 h-5 text-[#94A3B8]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">操作日志</h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono uppercase tracking-wider">System / Operation Logs</p>
          </div>
        </div>
      </header>

      <div className="p-6 shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <input type="text" placeholder="操作人" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-[#94A3B8] focus:border-white outline-none" />
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-white outline-none">
            <option value="">业务类型</option>
          </select>
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-white outline-none">
            <option value="">操作类型</option>
          </select>
          <input type="text" placeholder="时间范围" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-[#94A3B8] focus:border-white outline-none" />
        </div>
      </div>

      <div className="px-6 pb-6 flex-1 overflow-hidden flex flex-col">
        <div className="bg-[#111622] border border-[#1E293B] rounded-lg flex-1 flex flex-col overflow-hidden">
           <div className="overflow-x-auto min-w-[800px] flex-1 text-center text-[#64748B] flex items-center justify-center text-sm">
             （操作日志列表略）
           </div>
        </div>
      </div>
    </div>
  );
}
