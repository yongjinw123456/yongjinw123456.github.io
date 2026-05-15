import { useState } from 'react';
import { 
  Building2, Plus, Search, Settings, X, Save, Edit, Trash2, CheckCircle, XCircle, Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Org() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-full flex flex-col fade-in relative">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#1E293B] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <Building2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">组织管理</h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono uppercase tracking-wider">System / Organizations</p>
          </div>
        </div>
      </header>

      {/* Main Content Area: Split into Tree (left) and Details/Grid (right) if needed. We'll use a full table view with tree structure for now. */}
      
      <div className="p-6 shrink-0 flex items-center justify-between gap-4 border-b border-[#1E293B]">
         <div className="flex items-center gap-4 flex-1">
            <input type="text" placeholder="组织名称搜索..." className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-emerald-500 outline-none w-64" />
            <button className="flex items-center gap-2 bg-[#111622] border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
               查询
            </button>
         </div>
         <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-[0_0_15px_rgba(16,185,129,0.3)]">
               <Plus className="w-4 h-4" /> 新增组织
            </button>
         </div>
      </div>

      <div className="flex-1 overflow-hidden p-6 relative flex flex-col md:flex-row gap-6">
         {/* Org Tree Map View (Simplified as a list) */}
         <div className="flex-1 bg-[#111622] border border-[#1E293B] rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#1E293B] bg-[#0F172A] font-bold text-white text-sm">组织架构树状列表</div>
            <div className="p-4 overflow-y-auto w-full no-scrollbar">
               {/* Mock Table/List for tree */}
               <table className="w-full text-left border-collapse">
                 <thead className="text-[#64748B] text-xs uppercase bg-[#0F172A]">
                   <tr>
                     <th className="px-4 py-3 border-b border-[#1E293B]">组织名称</th>
                     <th className="px-4 py-3 border-b border-[#1E293B]">组织编码</th>
                     <th className="px-4 py-3 border-b border-[#1E293B]">排序</th>
                     <th className="px-4 py-3 border-b border-[#1E293B]">状态</th>
                     <th className="px-4 py-3 border-b border-[#1E293B] text-right">操作</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm">
                   {/* Level 1 */}
                   <tr className="hover:bg-[#1E293B]/50 transition-colors">
                     <td className="px-4 py-3 text-white font-bold flex items-center gap-2">
                        <Plus className="w-3 h-3 text-[#94A3B8]" /> 水利事业管理公司
                     </td>
                     <td className="px-4 py-3 text-[#94A3B8] font-mono">ORG_001</td>
                     <td className="px-4 py-3 text-[#94A3B8]">1</td>
                     <td className="px-4 py-3"><span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-xs border border-green-500/20">启用</span></td>
                     <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button className="text-emerald-400 hover:text-emerald-300 text-xs flex items-center gap-1"><Plus className="w-3 h-3"/> 新增下级</button>
                           <button className="text-blue-400 hover:text-blue-300 text-xs ml-2">编辑</button>
                        </div>
                     </td>
                   </tr>
                   {/* Level 2 */}
                   <tr className="hover:bg-[#1E293B]/50 transition-colors bg-[#1E293B]/20">
                     <td className="px-4 py-3 text-white flex items-center gap-2 pl-10">
                        <span className="w-px h-full bg-[#1E293B] absolute left-6"></span>
                        <div className="w-2 h-px bg-[#1E293B]"></div>
                        浙江省分公司
                     </td>
                     <td className="px-4 py-3 text-[#94A3B8] font-mono">ORG_001_ZJ</td>
                     <td className="px-4 py-3 text-[#94A3B8]">1</td>
                     <td className="px-4 py-3"><span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-xs border border-green-500/20">启用</span></td>
                     <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button className="text-emerald-400 hover:text-emerald-300 text-xs flex items-center gap-1"><Plus className="w-3 h-3"/> 新增下级</button>
                           <button className="text-blue-400 hover:text-blue-300 text-xs ml-2">编辑</button>
                           <button className="text-red-400 hover:text-red-300 text-xs ml-2">删除</button>
                        </div>
                     </td>
                   </tr>
                   {/* Level 3 */}
                   <tr className="hover:bg-[#1E293B]/50 transition-colors bg-[#1E293B]/20">
                     <td className="px-4 py-3 text-white flex items-center gap-2 pl-16">
                        温州运营中心
                     </td>
                     <td className="px-4 py-3 text-[#94A3B8] font-mono">ORG_001_ZJ_WZ</td>
                     <td className="px-4 py-3 text-[#94A3B8]">1</td>
                     <td className="px-4 py-3"><span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-xs border border-green-500/20">启用</span></td>
                     <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button className="text-emerald-400 hover:text-emerald-300 text-xs flex items-center gap-1"><Plus className="w-3 h-3"/> 新增下级</button>
                           <button className="text-blue-400 hover:text-blue-300 text-xs ml-2">编辑</button>
                           <button className="text-red-400 hover:text-red-300 text-xs ml-2">删除</button>
                        </div>
                     </td>
                   </tr>
                 </tbody>
               </table>
            </div>
         </div>
      </div>

      {/* Org Modal */}
      <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></motion.div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0F172A] border border-[#1E293B] rounded-xl w-full max-w-lg shadow-2xl flex flex-col pointer-events-auto">
              <div className="p-6 border-b border-[#1E293B] flex items-center justify-between shrink-0 bg-[#111622] rounded-t-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                   <Plus className="w-5 h-5 text-emerald-500" /> 新增组织
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors p-1.5">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                 <div>
                   <label className="block text-xs text-[#94A3B8] mb-1.5">上级组织</label>
                   <select className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-emerald-500 outline-none transition-colors">
                     <option value="">顶级组织</option>
                     <option value="1">水利事业管理公司</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-xs text-[#94A3B8] mb-1.5">组织名称 <span className="text-red-500">*</span></label>
                   <input type="text" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-emerald-500 outline-none transition-colors" placeholder="支持中英文及数字组合，1-50字" />
                 </div>
                 <div>
                   <label className="block text-xs text-[#94A3B8] mb-1.5">组织编码</label>
                   <input type="text" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-emerald-500 outline-none transition-colors" placeholder="1-30字" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#94A3B8] mb-1.5">排序</label>
                      <input type="number" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-emerald-500 outline-none transition-colors" placeholder="1" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#94A3B8] mb-1.5">状态</label>
                      <select className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-emerald-500 outline-none transition-colors">
                        <option value="启用">启用</option>
                        <option value="停用">停用</option>
                      </select>
                    </div>
                 </div>
              </div>
              <div className="p-4 border-t border-[#1E293B] flex justify-end gap-3 bg-[#111622] rounded-b-xl shrink-0">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors">取消</button>
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 transition-colors">
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
