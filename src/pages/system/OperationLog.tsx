import { useState } from 'react';
import { 
  Activity, Search, Download, Eye, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OperationLog() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="h-full flex flex-col fade-in relative">
      <header className="px-6 py-4 border-b border-[#1E293B] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-500/20 rounded-lg">
            <Activity className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">操作日志</h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono uppercase tracking-wider">System / Operation Logs</p>
          </div>
        </div>
      </header>

      <div className="p-6 shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 flex-wrap">
          <input type="text" placeholder="系统模块" className="w-32 bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-slate-500 outline-none" />
          <input type="text" placeholder="操作人员" className="w-32 bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-slate-500 outline-none" />
          <select className="w-32 bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-slate-500 outline-none">
            <option value="">操作类型</option>
            <option value="insert">新增</option>
            <option value="update">修改</option>
            <option value="delete">删除</option>
          </select>
          <select className="w-32 bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-slate-500 outline-none">
            <option value="">操作状态</option>
            <option value="1">成功</option>
            <option value="0">失败</option>
          </select>
          <input type="date" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-[#94A3B8] focus:border-slate-500 outline-none w-36" placeholder="开始日期" />
          <span className="text-[#64748B]">-</span>
          <input type="date" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-[#94A3B8] focus:border-slate-500 outline-none w-36" placeholder="结束日期" />
          <button className="flex items-center gap-2 bg-[#111622] hover:bg-[#1E293B] border border-[#1E293B] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            查询
          </button>
        </div>
        <button className="flex items-center gap-2 bg-[#111622] hover:bg-[#1E293B] border border-[#1E293B] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shrink-0">
          <Download className="w-4 h-4" /> 导出
        </button>
      </div>

      <div className="px-6 pb-6 flex-1 overflow-hidden flex flex-col">
        <div className="bg-[#111622] border border-[#1E293B] rounded-lg w-full flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="bg-[#0F172A] border-b border-[#1E293B] sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">系统模块</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">操作类型</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">操作描述</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">操作人员</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">主机IP</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">操作状态</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">操作时间</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                <tr className="hover:bg-[#1E293B]/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-white">保单配置</td>
                  <td className="px-6 py-4"><span className="px-2 py-0.5 rounded text-xs border border-blue-500/20 bg-blue-500/10 text-blue-400">修改</span></td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8]">修改了保单费率配置</td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8]">admin_01</td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8] font-mono">192.168.1.1</td>
                  <td className="px-6 py-4"><span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-xs border border-green-500/20">成功</span></td>
                  <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2024-02-15 14:35:10</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors"><Eye className="w-3.5 h-3.5"/></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

       {/* Detail Drawer */}
       <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></motion.div>
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#0F172A] border-l border-[#1E293B] shadow-2xl z-50 flex flex-col">
            <div className="p-4 border-b border-[#1E293B] flex items-center justify-between bg-[#111622]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">日志详情</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto w-full no-scrollbar px-6 py-6 pb-20">
               <div className="space-y-4">
                  <div className="text-sm">
                     <span className="block text-[#64748B] mb-1">请求参数</span>
                     <div className="bg-[#111622] border border-[#1E293B] p-3 rounded font-mono text-xs text-[#94A3B8] whitespace-pre-wrap">
                        {`{\n  \"id\": 12,\n  \"rate\": 0.05\n}`}
                     </div>
                  </div>
                  <div className="text-sm">
                     <span className="block text-[#64748B] mb-1">返回结果</span>
                     <div className="bg-[#111622] border border-[#1E293B] p-3 rounded font-mono text-xs text-[#94A3B8] whitespace-pre-wrap">
                        {`{\n  \"code\": 200,\n  \"msg\": \"success\"\n}`}
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
