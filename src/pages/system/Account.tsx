import { useState } from 'react';
import { 
  Users, Plus, Search, Settings, X, Save, Eye, Edit, Key, Lock, Unlock, CheckCircle, XCircle, Download, RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Account() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="h-full flex flex-col fade-in relative">
      {/* Header */}
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

      {/* Filters & Actions */}
      <div className="p-6 shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 flex-wrap">
          <input type="text" placeholder="登录账号" className="w-32 bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 outline-none placeholder:text-[#64748B]" />
          <input type="text" placeholder="用户姓名" className="w-32 bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 outline-none placeholder:text-[#64748B]" />
          <input type="text" placeholder="手机号" className="w-32 bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 outline-none placeholder:text-[#64748B]" />
          
          <select className="w-32 bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 outline-none">
            <option value="">所属组织</option>
            <option value="1">集团省公司</option>
            <option value="2">温州分公司</option>
          </select>

          <select className="w-32 bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 outline-none">
            <option value="">角色</option>
            <option value="1">系统管理员</option>
            <option value="2">水库业主</option>
          </select>

          <select className="w-32 bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-blue-500 outline-none">
            <option value="">状态</option>
            <option value="启用">启用</option>
            <option value="停用">停用</option>
            <option value="锁定">锁定</option>
          </select>
          
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            查询
          </button>
          <button className="text-sm text-[#94A3B8] hover:text-white transition-colors">重置筛选</button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-2 bg-[#111622] hover:bg-[#1E293B] border border-[#1E293B] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            <Download className="w-4 h-4" /> 导出
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Plus className="w-4 h-4" /> 新增账号
          </button>
        </div>
      </div>

      {/* Table content placeholder */}
      <div className="px-6 pb-6 flex-1 overflow-hidden flex flex-col">
        <div className="bg-[#111622] border border-[#1E293B] rounded-lg w-full flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead className="bg-[#0F172A] border-b border-[#1E293B] sticky top-0 z-10">
                <tr>
                  <th className="w-10 px-4 py-4"><input type="checkbox" className="rounded border-[#1E293B] bg-[#111622]" /></th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">用户 ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">登录账号</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">用户姓名</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">手机号</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">所属组织</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">角色</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">账号状态</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">创建时间</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase text-right whitespace-nowrap">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                <tr className="hover:bg-[#1E293B]/30 transition-colors group">
                   <td className="px-4 py-4"><input type="checkbox" className="rounded border-[#1E293B] bg-[#111622]" /></td>
                   <td className="px-6 py-4 text-xs font-mono text-[#64748B]">U_1001</td>
                   <td className="px-6 py-4 text-sm text-blue-400 cursor-pointer hover:underline" onClick={() => setIsDrawerOpen(true)}>admin_01</td>
                   <td className="px-6 py-4 text-sm text-white">王建国</td>
                   <td className="px-6 py-4 text-sm text-[#94A3B8] font-mono">138****1234</td>
                   <td className="px-6 py-4 text-sm text-[#94A3B8]">集团省公司</td>
                   <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                         <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">系统管理员</span>
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded text-xs">启用</span>
                   </td>
                   <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2024-01-10 10:00</td>
                   <td className="px-6 py-4 text-right right-0 sticky bg-[#111622] group-hover:bg-[#151c2a] transition-colors border-l border-[#1E293B]/50 ml-auto w-[160px]">
                      <div className="flex items-center justify-end gap-1.5">
                         <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="查看"><Eye className="w-3.5 h-3.5"/></button>
                         <button onClick={() => setIsModalOpen(true)} className="p-1.5 text-[#64748B] hover:text-blue-400 hover:bg-[#1E293B] rounded transition-colors" title="编辑"><Edit className="w-3.5 h-3.5"/></button>
                         <button onClick={() => setIsPasswordModalOpen(true)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="重置密码"><Key className="w-3.5 h-3.5"/></button>
                         <button className="p-1.5 text-[#64748B] hover:text-red-400 hover:bg-[#1E293B] rounded transition-colors" title="停用"><XCircle className="w-3.5 h-3.5"/></button>
                      </div>
                   </td>
                </tr>
                <tr className="hover:bg-[#1E293B]/30 transition-colors group">
                   <td className="px-4 py-4"><input type="checkbox" className="rounded border-[#1E293B] bg-[#111622]" /></td>
                   <td className="px-6 py-4 text-xs font-mono text-[#64748B]">U_1002</td>
                   <td className="px-6 py-4 text-sm text-blue-400 cursor-pointer hover:underline" onClick={() => setIsDrawerOpen(true)}>li_si</td>
                   <td className="px-6 py-4 text-sm text-white">李四</td>
                   <td className="px-6 py-4 text-sm text-[#94A3B8] font-mono">139****5678</td>
                   <td className="px-6 py-4 text-sm text-[#94A3B8]">温州分公司</td>
                   <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                         <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">水库业主</span>
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      <span className="text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-xs flex items-center gap-1 w-fit"><Lock className="w-3 h-3"/> 锁定</span>
                   </td>
                   <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2024-02-15 14:30</td>
                   <td className="px-6 py-4 text-right right-0 sticky bg-[#111622] group-hover:bg-[#151c2a] transition-colors border-l border-[#1E293B]/50 ml-auto w-[160px]">
                      <div className="flex items-center justify-end gap-1.5">
                         <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="查看"><Eye className="w-3.5 h-3.5"/></button>
                         <button onClick={() => setIsModalOpen(true)} className="p-1.5 text-[#64748B] hover:text-blue-400 hover:bg-[#1E293B] rounded transition-colors" title="编辑"><Edit className="w-3.5 h-3.5"/></button>
                         <button className="p-1.5 text-[#64748B] hover:text-green-400 hover:bg-[#1E293B] rounded transition-colors" title="解锁"><Unlock className="w-3.5 h-3.5"/></button>
                         <button onClick={() => setIsPasswordModalOpen(true)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="重置密码"><Key className="w-3.5 h-3.5"/></button>
                      </div>
                   </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Account Modal */}
      <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></motion.div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0F172A] border border-[#1E293B] rounded-xl w-full max-w-2xl shadow-2xl flex flex-col pointer-events-auto">
              <div className="p-6 border-b border-[#1E293B] flex items-center justify-between shrink-0 bg-[#111622] rounded-t-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                   <Plus className="w-5 h-5 text-blue-500" /> 新增 / 编辑账号
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors p-1.5">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-4 max-h-[70vh]">
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-xs text-[#94A3B8] mb-1.5">登录账号 <span className="text-red-500">*</span></label>
                     <input type="text" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors" placeholder="4-32 字；全局唯一" />
                   </div>
                   <div>
                     <label className="block text-xs text-[#94A3B8] mb-1.5">用户姓名 <span className="text-red-500">*</span></label>
                     <input type="text" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors" placeholder="真实姓名" />
                   </div>
                   <div>
                     <label className="block text-xs text-[#94A3B8] mb-1.5">手机号 <span className="text-red-500">*</span></label>
                     <input type="text" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors" />
                   </div>
                   <div>
                     <label className="block text-xs text-[#94A3B8] mb-1.5">邮箱</label>
                     <input type="email" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors" />
                   </div>
                   <div>
                     <label className="block text-xs text-[#94A3B8] mb-1.5">所属组织 <span className="text-red-500">*</span></label>
                     <select className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors">
                       <option value="">请选择</option>
                       <option value="1">集团省公司</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-xs text-[#94A3B8] mb-1.5">角色 <span className="text-red-500">*</span></label>
                     <select className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors">
                       <option value="">请选择（支持多选）</option>
                       <option value="1">系统管理员</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-xs text-[#94A3B8] mb-1.5">初始密码 <span className="text-red-500">*</span></label>
                     <input type="password" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors" placeholder="8-20位，包含字母和数字" />
                   </div>
                   <div>
                     <label className="block text-xs text-[#94A3B8] mb-1.5">账号状态 <span className="text-red-500">*</span></label>
                     <select className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors">
                       <option value="启用">启用</option>
                       <option value="停用">停用</option>
                     </select>
                   </div>
                 </div>
                 <div>
                   <label className="block text-xs text-[#94A3B8] mb-1.5">备注</label>
                   <textarea className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none h-20 resize-none transition-colors" placeholder="0-200字"></textarea>
                 </div>
              </div>
              <div className="p-6 pt-4 border-t border-[#1E293B] flex justify-end gap-3 bg-[#111622] rounded-b-xl shrink-0">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors">
                  取消
                </button>
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition-colors">
                  <Save className="w-4 h-4" /> 保存
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
      </AnimatePresence>

      {/* Password Reset Modal */}
      <AnimatePresence>
      {isPasswordModalOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setIsPasswordModalOpen(false)}></motion.div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0F172A] border border-[#1E293B] rounded-xl w-full max-w-sm shadow-2xl flex flex-col pointer-events-auto">
              <div className="p-6 border-b border-[#1E293B] flex items-center justify-between shrink-0 bg-[#111622] rounded-t-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                   <Key className="w-5 h-5 text-blue-500" /> 重置密码
                </h3>
                <button onClick={() => setIsPasswordModalOpen(false)} className="text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors p-1.5">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                 <div>
                   <label className="block text-xs text-[#94A3B8] mb-1.5">新密码 <span className="text-red-500">*</span></label>
                   <input type="password" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors" placeholder="8-20位，包含字母和数字" />
                 </div>
                 <div>
                   <label className="block text-xs text-[#94A3B8] mb-1.5">确认密码 <span className="text-red-500">*</span></label>
                   <input type="password" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors" placeholder="必须与新密码一致" />
                 </div>
                 <div>
                   <label className="block text-xs text-[#94A3B8] mb-1.5">重置原因</label>
                   <textarea className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none h-16 resize-none transition-colors" placeholder="0-200字"></textarea>
                 </div>
              </div>
              <div className="p-4 border-t border-[#1E293B] flex justify-end gap-3 bg-[#111622] rounded-b-xl shrink-0">
                <button onClick={() => setIsPasswordModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white w-full transition-colors">
                  确认重置
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
              <h2 className="text-lg font-bold text-white flex items-center gap-2">账号详情</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto w-full no-scrollbar px-6 py-6 pb-20">
              <div className="space-y-6">
                <div>
                   <h4 className="text-[10px] text-blue-500 uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">基础信息</h4>
                   <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-[#64748B]">用户 ID</span><span className="text-[#94A3B8] font-mono">U_1001</span></div>
                      <div className="flex justify-between"><span className="text-[#64748B]">登录账号</span><span className="text-white">admin_01</span></div>
                      <div className="flex justify-between"><span className="text-[#64748B]">姓名</span><span className="text-white">王建国</span></div>
                      <div className="flex justify-between"><span className="text-[#64748B]">手机号</span><span className="text-[#94A3B8] font-mono">138****1234</span></div>
                      <div className="flex justify-between"><span className="text-[#64748B]">组织</span><span className="text-white">集团省公司</span></div>
                      <div className="flex justify-between"><span className="text-[#64748B]">状态</span><span className="text-green-400">启用</span></div>
                   </div>
                </div>
                <div>
                   <h4 className="text-[10px] text-blue-500 uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">权限信息</h4>
                   <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-[#64748B] block mb-1.5">角色列表</span>
                        <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">系统管理员</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block mb-1">菜单权限摘要</span>
                        <div className="text-[#94A3B8] text-xs">拥有全部系统菜单权限</div>
                      </div>
                   </div>
                </div>
                <div>
                   <h4 className="text-[10px] text-blue-500 uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">日志摘要</h4>
                   <div className="space-y-2 text-xs">
                     <div className="flex justify-between items-center text-[#94A3B8] bg-[#111622] p-2 rounded"><span>登录成功 (192.168.1.1)</span> <span className="font-mono">今日 10:15</span></div>
                     <div className="flex justify-between items-center text-[#94A3B8] bg-[#111622] p-2 rounded"><span>修改了配置字典</span> <span className="font-mono">昨日 14:20</span></div>
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
