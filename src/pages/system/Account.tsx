import { useState } from 'react';
import { 
  Users, Plus, Settings, X, Save
} from 'lucide-react';

export default function Account() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-full flex flex-col fade-in">
      <header className="px-6 py-4 border-b border-[#1E293B] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">账号管理</h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono uppercase tracking-wider">System / Accounts</p>
          </div>
        </div>
      </header>

      <div className="p-6 shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <input type="text" placeholder="登录账号" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-[#94A3B8] focus:border-blue-500 outline-none" />
          <input type="text" placeholder="用户姓名" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-[#94A3B8] focus:border-blue-500 outline-none" />
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 outline-none">
            <option value="">所属组织</option>
          </select>
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 outline-none">
            <option value="">账号状态</option>
            <option value="启用">启用</option>
            <option value="停用">停用</option>
          </select>
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 outline-none">
            <option value="">角色</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" /> 新增账号
          </button>
        </div>
      </div>

      <div className="px-6 pb-6 flex-1 overflow-hidden flex flex-col">
        <div className="bg-[#111622] border border-[#1E293B] rounded-lg flex-1 flex flex-col overflow-hidden">
           <div className="overflow-x-auto min-w-[800px] flex-1 text-center text-[#64748B] flex items-center justify-center text-sm">
             （账号列表略）
           </div>
        </div>
      </div>
    </div>
  );
}
