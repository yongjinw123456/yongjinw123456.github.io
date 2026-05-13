import { useState } from 'react';
import { 
  Search, Plus, Settings, Trash2, X, FileText, CheckCircle, Save, 
  Droplets, UploadCloud, Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PreDischarge() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="h-full flex flex-col fade-in">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#1E293B] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#0ea5e9]/20 rounded-lg">
            <Droplets className="w-5 h-5 text-[#0ea5e9]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">预泄管理</h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono uppercase tracking-wider">Ops / Pre-Discharge</p>
          </div>
        </div>
      </header>

      {/* Filters & Actions */}
      <div className="p-6 shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-[#0ea5e9] outline-none">
            <option value="">全部预泄对象</option>
            <option value="珊溪水库">珊溪水库</option>
            <option value="桥墩水库">桥墩水库</option>
          </select>
          <div className="relative">
             <Calendar className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
             <input type="text" placeholder="选择时间范围" className="bg-[#111622] border border-[#1E293B] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-[#0ea5e9] outline-none" />
          </div>
          <input type="text" placeholder="创建人" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-[#94A3B8] focus:border-[#0ea5e9] outline-none" />
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" /> 新增预泄记录
          </button>
        </div>
      </div>

      {/* Table content placeholder */}
      <div className="px-6 pb-6 flex-1 overflow-hidden flex flex-col">
        <div className="bg-[#111622] border border-[#1E293B] rounded-lg flex-1 flex flex-col overflow-hidden">
           <div className="overflow-x-auto min-w-[800px] flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0F172A] border-b border-[#1E293B] sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">预泄时间</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">预泄对象</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">流量 (m³/s)</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">预泄原因</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">创建时间</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B] overflow-y-auto">
                <tr className="hover:bg-[#1E293B]/30 transition-colors">
                   <td className="px-6 py-4 text-xs font-mono text-white">2026-05-12 14:00</td>
                   <td className="px-6 py-4 text-sm text-[#0ea5e9]">珊溪水库</td>
                   <td className="px-6 py-4 text-sm font-mono text-white">350.00</td>
                   <td className="px-6 py-4 text-sm text-[#94A3B8]">台风“梅花”来临前提前削峰调节</td>
                   <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2026-05-12 13:45</td>
                   <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-tech-cyan hover:bg-tech-cyan/20 rounded transition-colors"><FileText className="w-4 h-4"/></button>
                        <button onClick={() => setIsModalOpen(true)} className="p-1.5 text-[#0ea5e9] hover:bg-[#0ea5e9]/20 rounded transition-colors"><Settings className="w-4 h-4"/></button>
                      </div>
                   </td>
                </tr>
              </tbody>
            </table>
           </div>
        </div>
      </div>

      {/* Basic Modals & Drawers */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#1E293B] flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Droplets className="w-5 h-5 text-[#0ea5e9]" /> 新增 / 编辑预泄记录
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-white transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col gap-1.5">
                   <label className="text-sm text-[#94A3B8]">预泄时间 <span className="text-red-500">*</span></label>
                   <input type="datetime-local" className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white outline-none [color-scheme:dark]" />
                 </div>
                 <div className="flex flex-col gap-1.5">
                   <label className="text-sm text-[#94A3B8]">预泄对象 <span className="text-red-500">*</span></label>
                   <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white outline-none">
                     <option value="">选择水库</option>
                     <option value="1">珊溪水库</option>
                   </select>
                 </div>
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-sm text-[#94A3B8]">流量 (m³/s) <span className="text-red-500">*</span></label>
                 <input type="number" className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white outline-none font-mono" placeholder="0.00" />
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-sm text-[#94A3B8]">预泄原因 <span className="text-red-500">*</span></label>
                 <input type="text" className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white outline-none" placeholder="1-200字" />
              </div>
              <div className="flex flex-col gap-1.5">
                 <label className="text-sm text-[#94A3B8]">影响说明</label>
                 <textarea className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white outline-none min-h-[80px]" placeholder="0-1000字"></textarea>
              </div>
            </div>
            
            <div className="p-6 pt-4 border-t border-[#1E293B] flex justify-end gap-3 bg-[#111622]/50 shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors">
                取消
              </button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#0ea5e9] hover:bg-[#0284c7] text-white flex items-center gap-2 transition-colors">
                <Save className="w-4 h-4" /> 保存
              </button>
            </div>
          </div>
        </div>
      )}

      {isDrawerOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0F172A] border-l border-[#1E293B] shadow-2xl z-50 flex flex-col">
            <div className="p-6 border-b border-[#1E293B] flex items-center justify-between bg-[#111622]">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0ea5e9]" /> 预泄详情
                </h2>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <span className="text-[#64748B] text-sm">（详情抽屉内容略）</span>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
