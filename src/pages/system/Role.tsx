import { useState } from 'react';
import { 
  Shield, Plus, Search, Settings, X, Save, Eye, Edit, Trash2, CheckCircle, XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Role() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="h-full flex flex-col fade-in relative">
      {/* Header */}
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

      {/* Filters & Actions */}
      <div className="p-6 shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <input type="text" placeholder="角色名称" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-purple-500 outline-none placeholder:text-[#64748B] w-64" />
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-purple-500 outline-none w-48">
            <option value="">状态</option>
            <option value="启用">启用</option>
            <option value="停用">停用</option>
          </select>
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            查询
          </button>
          <button className="text-sm text-[#94A3B8] hover:text-white transition-colors">重置</button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Plus className="w-4 h-4" /> 新增角色
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 pb-6 flex-1 overflow-hidden flex flex-col">
        <div className="bg-[#111622] border border-[#1E293B] rounded-lg w-full flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-[#0F172A] border-b border-[#1E293B] sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">角色名称</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">角色编号</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">关联人数</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">状态</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">创建时间</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase text-right whitespace-nowrap">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                <tr className="hover:bg-[#1E293B]/30 transition-colors group">
                  <td className="px-6 py-4 text-sm text-purple-400 font-medium cursor-pointer hover:underline" onClick={() => setIsDrawerOpen(true)}>系统管理员</td>
                  <td className="px-6 py-4 text-xs text-[#64748B] font-mono">SYS_ADMIN</td>
                  <td className="px-6 py-4 text-sm text-white">5</td>
                  <td className="px-6 py-4">
                    <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded text-xs">启用</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2023-11-01 10:00</td>
                  <td className="px-6 py-4 text-right right-0 sticky bg-[#111622] group-hover:bg-[#151c2a] transition-colors border-l border-[#1E293B]/50 ml-auto w-[120px]">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="查看"><Eye className="w-3.5 h-3.5"/></button>
                      <button onClick={() => setIsModalOpen(true)} className="p-1.5 text-[#64748B] hover:text-purple-400 hover:bg-[#1E293B] rounded transition-colors" title="编辑"><Edit className="w-3.5 h-3.5"/></button>
                      <button className="p-1.5 text-[#64748B] hover:text-red-400 hover:bg-[#1E293B] rounded transition-colors" title="停用"><XCircle className="w-3.5 h-3.5"/></button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-[#1E293B]/30 transition-colors group">
                  <td className="px-6 py-4 text-sm text-purple-400 font-medium cursor-pointer hover:underline" onClick={() => setIsDrawerOpen(true)}>水库管护员</td>
                  <td className="px-6 py-4 text-xs text-[#64748B] font-mono">RES_MGR</td>
                  <td className="px-6 py-4 text-sm text-white">24</td>
                  <td className="px-6 py-4">
                    <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded text-xs">启用</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2024-01-15 14:20</td>
                  <td className="px-6 py-4 text-right right-0 sticky bg-[#111622] group-hover:bg-[#151c2a] transition-colors border-l border-[#1E293B]/50 ml-auto w-[120px]">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="查看"><Eye className="w-3.5 h-3.5"/></button>
                      <button onClick={() => setIsModalOpen(true)} className="p-1.5 text-[#64748B] hover:text-purple-400 hover:bg-[#1E293B] rounded transition-colors" title="编辑"><Edit className="w-3.5 h-3.5"/></button>
                      <button className="p-1.5 text-[#64748B] hover:text-red-400 hover:bg-[#1E293B] rounded transition-colors" title="停用"><XCircle className="w-3.5 h-3.5"/></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Role Modal */}
      <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></motion.div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0F172A] border border-[#1E293B] rounded-xl w-full max-w-3xl shadow-2xl flex flex-col pointer-events-auto h-[80vh] max-h-[800px]">
              <div className="p-6 border-b border-[#1E293B] flex items-center justify-between shrink-0 bg-[#111622] rounded-t-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                   <Plus className="w-5 h-5 text-purple-500" /> 新增 / 编辑角色
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors p-1.5">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                 {/* Details */}
                 <div className="md:w-1/3 p-6 border-r border-[#1E293B] overflow-y-auto bg-[#0F172A]">
                    <div className="space-y-4">
                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1.5">角色名称 <span className="text-red-500">*</span></label>
                         <input type="text" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-purple-500 outline-none transition-colors" placeholder="1-30 字" />
                       </div>
                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1.5">角色编号</label>
                         <input type="text" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-purple-500 outline-none transition-colors" placeholder="选填，如 SYS_ADMIN" />
                       </div>
                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1.5">角色状态</label>
                         <select className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-purple-500 outline-none transition-colors">
                           <option value="启用">启用</option>
                           <option value="停用">停用</option>
                         </select>
                       </div>
                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1.5">备注</label>
                         <textarea className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-purple-500 outline-none h-24 resize-none transition-colors" placeholder="0-200字"></textarea>
                       </div>
                    </div>
                 </div>
                 {/* Permissions */}
                 <div className="md:w-2/3 p-6 overflow-y-auto bg-[#111622]/50">
                    <label className="block text-xs font-bold text-[#94A3B8] mb-3 uppercase tracking-wider">权限分配</label>
                    <div className="border border-[#1E293B] rounded-lg bg-[#0F172A] p-4 text-sm text-[#94A3B8] min-h-[300px]">
                       <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#1E293B]">
                         <input type="checkbox" className="rounded border-[#1E293B] bg-[#111622] checked:bg-purple-500" /> <span className="font-bold text-white">全选</span>
                       </div>
                       {/* Tree placeholder */}
                       <div className="pl-6 space-y-3 mt-4">
                          <div>
                             <div className="flex items-center gap-2 mb-2"><input type="checkbox" className="rounded border-[#1E293B]" /> <span className="text-white">工作台</span></div>
                          </div>
                          <div>
                             <div className="flex items-center gap-2 mb-2"><input type="checkbox" className="rounded border-[#1E293B]" /> <span className="text-white">业务管理</span></div>
                             <div className="pl-6 space-y-2">
                                <div className="flex items-center gap-2"><input type="checkbox" className="rounded border-[#1E293B]" /> <span>水库资产管理</span></div>
                                <div className="flex items-center gap-2"><input type="checkbox" className="rounded border-[#1E293B]" /> <span>保险单管理</span></div>
                             </div>
                          </div>
                          <div>
                             <div className="flex items-center gap-2 mb-2"><input type="checkbox" className="rounded border-[#1E293B]" /> <span className="text-white">风险减量</span></div>
                             <div className="pl-6 space-y-2">
                                <div className="flex items-center gap-2"><input type="checkbox" className="rounded border-[#1E293B]" /> <span>隐患预警</span></div>
                                <div className="flex items-center gap-2"><input type="checkbox" className="rounded border-[#1E293B]" /> <span>防洪预排</span></div>
                                <div className="flex items-center gap-2"><input type="checkbox" className="rounded border-[#1E293B]" /> <span>抗旱保供</span></div>
                             </div>
                          </div>
                          <div>
                             <div className="flex items-center gap-2 mb-2"><input type="checkbox" className="rounded border-[#1E293B]" /> <span className="text-white">系统管理</span></div>
                             <div className="pl-6 space-y-2 grid grid-cols-2">
                                <div className="flex items-center gap-2"><input type="checkbox" className="rounded border-[#1E293B]" /> <span>账号管理</span></div>
                                <div className="flex items-center gap-2"><input type="checkbox" className="rounded border-[#1E293B]" /> <span>角色管理</span></div>
                                <div className="flex items-center gap-2"><input type="checkbox" className="rounded border-[#1E293B]" /> <span>组织管理</span></div>
                                <div className="flex items-center gap-2"><input type="checkbox" className="rounded border-[#1E293B]" /> <span>基础配置</span></div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="p-6 pt-4 border-t border-[#1E293B] flex justify-end gap-3 bg-[#111622] rounded-b-xl shrink-0">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors">
                  取消
                </button>
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 transition-colors">
                  <Save className="w-4 h-4" /> 保存
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
      </AnimatePresence>

      {/* Detail Drawer */}
      <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></motion.div>
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#0F172A] border-l border-[#1E293B] shadow-2xl z-50 flex flex-col">
            <div className="p-4 border-b border-[#1E293B] flex items-center justify-between bg-[#111622]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">角色详情</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto w-full no-scrollbar px-6 py-6 pb-20">
              <div className="space-y-6">
                <div>
                   <h4 className="text-[10px] text-purple-500 uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">基础信息</h4>
                   <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-[#64748B]">角色名称</span><span className="text-white">系统管理员</span></div>
                      <div className="flex justify-between"><span className="text-[#64748B]">角色编号</span><span className="text-[#94A3B8] font-mono">SYS_ADMIN</span></div>
                      <div className="flex justify-between"><span className="text-[#64748B]">关联人数</span><span className="text-white">5 人</span></div>
                      <div className="flex justify-between"><span className="text-[#64748B]">状态</span><span className="text-green-400">启用</span></div>
                   </div>
                   <div className="mt-4 text-xs text-[#94A3B8] bg-[#111622] p-3 rounded border border-[#1E293B]">
                      <span className="font-bold text-[#64748B] block mb-1">备注</span>
                      拥有系统全部权限的最高级管理员。
                   </div>
                </div>
                <div>
                   <h4 className="text-[10px] text-purple-500 uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">拥有的权限</h4>
                   <div className="space-y-2 text-sm text-[#94A3B8] bg-[#111622] border border-[#1E293B] rounded-lg p-4">
                      {/* Read only tree */}
                      <div className="flex items-center gap-2 text-white font-medium"><CheckCircle className="w-4 h-4 text-green-500" /> 所有权限 (系统管理员)</div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
      </AnimatePresence>
    </div>
  );
}
