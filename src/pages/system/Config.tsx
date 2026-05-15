import { useState } from 'react';
import { 
  Settings2, Plus, Search, Settings, X, Save, Edit, Trash2, BookText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Config() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dict');

  return (
    <div className="h-full flex flex-col fade-in relative">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#1E293B] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Settings2 className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">基础配置</h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono uppercase tracking-wider">System / Settings</p>
          </div>
        </div>
      </header>

      <div className="border-b border-[#1E293B] px-6 shrink-0 flex items-center gap-6 text-sm font-medium">
        <button onClick={() => setActiveTab('dict')} className={cn("py-4 border-b-2 transition-colors", activeTab === 'dict' ? "border-indigo-500 text-indigo-400" : "border-transparent text-[#64748B] hover:text-white")}>
          数据字典管理
        </button>
        <button onClick={() => setActiveTab('param')} className={cn("py-4 border-b-2 transition-colors", activeTab === 'param' ? "border-indigo-500 text-indigo-400" : "border-transparent text-[#64748B] hover:text-white")}>
          系统参数配置
        </button>
      </div>

      {activeTab === 'dict' && (
        <div className="flex-1 flex flex-col p-6 overflow-hidden fade-in gap-4">
           {/* Filters & Actions */}
           <div className="flex items-center gap-4">
             <input type="text" placeholder="字典名称 / 编码" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-indigo-500 outline-none w-64" />
             <button className="bg-[#111622] border border-[#1E293B] hover:bg-[#1E293B] text-white px-4 py-2 rounded-lg transition-colors text-sm">查询</button>
           </div>
           
           <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">
             {/* Dictionary Types */}
             <div className="md:w-1/3 bg-[#111622] border border-[#1E293B] rounded-lg flex flex-col overflow-hidden">
                <div className="p-3 border-b border-[#1E293B] bg-[#0F172A] font-medium text-white flex justify-between items-center text-sm">
                   <span>字典类型</span>
                   <button className="text-indigo-400 hover:text-indigo-300"><Plus className="w-4 h-4"/></button>
                </div>
                <div className="flex-1 overflow-y-auto w-full no-scrollbar">
                   <div className="p-2 space-y-1">
                      <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 cursor-pointer">
                         <div className="text-white text-sm font-medium mb-1">干旱等级</div>
                         <div className="text-xs text-[#64748B] font-mono">sys_drought_level</div>
                      </div>
                      <div className="p-3 rounded-lg hover:bg-[#1E293B]/50 cursor-pointer transition-colors border border-transparent">
                         <div className="text-white text-sm font-medium mb-1">水库类型</div>
                         <div className="text-xs text-[#64748B] font-mono">sys_reservoir_type</div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Dictionary Data (Items) */}
             <div className="md:w-2/3 bg-[#111622] border border-[#1E293B] rounded-lg flex flex-col overflow-hidden">
                <div className="p-3 border-b border-[#1E293B] bg-[#0F172A] font-medium text-white flex justify-between items-center text-sm">
                   <span>[干旱等级] 数据项</span>
                   <button className="flex items-center gap-1 text-sm bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded transition-colors" onClick={() => setIsModalOpen(true)}><Plus className="w-3.5 h-3.5"/> 新增</button>
                </div>
                <div className="flex-1 overflow-auto w-full no-scrollbar">
                   <table className="w-full text-left border-collapse">
                      <thead className="text-[#64748B] text-xs uppercase bg-[#111622] border-b border-[#1E293B] sticky top-0">
                        <tr>
                          <th className="px-4 py-3">字典标签</th>
                          <th className="px-4 py-3">字典键值</th>
                          <th className="px-4 py-3">排序</th>
                          <th className="px-4 py-3">状态</th>
                          <th className="px-4 py-3 text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-[#1E293B]">
                        <tr className="hover:bg-[#1E293B]/30 transition-colors">
                          <td className="px-4 py-3 text-white"><span className="px-2 py-0.5 rounded text-xs bg-indigo-500/20 text-indigo-300">干旱级别1</span></td>
                          <td className="px-4 py-3 text-[#94A3B8] font-mono">1</td>
                          <td className="px-4 py-3 text-[#94A3B8]">1</td>
                          <td className="px-4 py-3"><span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-xs border border-green-500/20">启用</span></td>
                          <td className="px-4 py-3 text-right">
                             <div className="flex items-center justify-end gap-2">
                               <button className="text-blue-400 hover:text-blue-300 text-xs">编辑</button>
                               <button className="text-red-400 hover:text-red-300 text-xs">删除</button>
                             </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-[#1E293B]/30 transition-colors">
                          <td className="px-4 py-3 text-white"><span className="px-2 py-0.5 rounded text-xs bg-indigo-500/20 text-indigo-300">干旱级别2</span></td>
                          <td className="px-4 py-3 text-[#94A3B8] font-mono">2</td>
                          <td className="px-4 py-3 text-[#94A3B8]">2</td>
                          <td className="px-4 py-3"><span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-xs border border-green-500/20">启用</span></td>
                          <td className="px-4 py-3 text-right">
                             <div className="flex items-center justify-end gap-2">
                               <button className="text-blue-400 hover:text-blue-300 text-xs">编辑</button>
                               <button className="text-red-400 hover:text-red-300 text-xs">删除</button>
                             </div>
                          </td>
                        </tr>
                      </tbody>
                   </table>
                </div>
             </div>
           </div>
        </div>
      )}

      {/* Item Modal */}
      <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></motion.div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0F172A] border border-[#1E293B] rounded-xl w-full max-w-md shadow-2xl flex flex-col pointer-events-auto">
              <div className="p-6 border-b border-[#1E293B] flex items-center justify-between shrink-0 bg-[#111622] rounded-t-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                   <Plus className="w-5 h-5 text-indigo-500" /> 新增字典数据
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors p-1.5">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                 <div>
                   <label className="block text-xs text-[#94A3B8] mb-1.5">字典名称</label>
                   <input type="text" className="w-full bg-[#1E293B] border border-[#1E293B] rounded px-3 py-2 text-sm text-[#94A3B8] outline-none cursor-not-allowed" value="干旱等级" readOnly />
                 </div>
                 <div>
                   <label className="block text-xs text-[#94A3B8] mb-1.5">数据标签 <span className="text-red-500">*</span></label>
                   <input type="text" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none transition-colors" placeholder="如：干旱级别3" />
                 </div>
                 <div>
                   <label className="block text-xs text-[#94A3B8] mb-1.5">数据键值 <span className="text-red-500">*</span></label>
                   <input type="text" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none transition-colors" placeholder="如：3" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#94A3B8] mb-1.5">排序字段</label>
                      <input type="number" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none transition-colors" placeholder="3" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#94A3B8] mb-1.5">状态</label>
                      <select className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none transition-colors">
                        <option value="启用">启用</option>
                        <option value="停用">停用</option>
                      </select>
                    </div>
                 </div>
              </div>
              <div className="p-4 border-t border-[#1E293B] flex justify-end gap-3 bg-[#111622] rounded-b-xl shrink-0">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors">取消</button>
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 transition-colors">
                  <Save className="w-4 h-4" /> 保存
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
      </AnimatePresence>
    </div>
  );
}
