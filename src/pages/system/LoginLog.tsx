import { useState } from 'react';
import { 
  LogIn, Search, Download
} from 'lucide-react';

export default function LoginLog() {
  return (
    <div className="h-full flex flex-col fade-in relative">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#1E293B] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-500/20 rounded-lg">
            <LogIn className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">登录日志</h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono uppercase tracking-wider">System / Login Logs</p>
          </div>
        </div>
      </header>

      <div className="p-6 shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 flex-wrap">
          <input type="text" placeholder="登录账号" className="w-32 bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-slate-500 outline-none" />
          <input type="text" placeholder="登录IP" className="w-32 bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-slate-500 outline-none" />
          <select className="w-32 bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-slate-500 outline-none">
            <option value="">登录状态</option>
            <option value="success">成功</option>
            <option value="fail">失败</option>
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
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-[#0F172A] border-b border-[#1E293B] sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">登录账号</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">IP 地址</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">登录地点</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">浏览器</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">操作系统</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">登录状态</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">操作信息</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">登录时间</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                <tr className="hover:bg-[#1E293B]/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-white">admin_01</td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8] font-mono">192.168.1.1</td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8]">浙江省杭州市</td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8]">Chrome 100</td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8]">Windows 10</td>
                  <td className="px-6 py-4"><span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-xs border border-green-500/20">成功</span></td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8]">登录成功</td>
                  <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2024-02-15 14:30:22</td>
                </tr>
                <tr className="hover:bg-[#1E293B]/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-white">li_si</td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8] font-mono">10.0.0.5</td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8]">浙江省温州市</td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8]">Safari 15</td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8]">Mac OS X</td>
                  <td className="px-6 py-4"><span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded text-xs border border-red-500/20">失败</span></td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8]">密码错误</td>
                  <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2024-02-15 14:28:10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
