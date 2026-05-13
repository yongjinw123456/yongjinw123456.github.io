import { useState } from 'react';
import { Search, Filter, AlertTriangle, ChevronRight, FileText, ShieldCheck, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Events() {
  const [activeTab, setActiveTab] = useState<'warning' | 'claims' | 'risk' | 'water'>('warning');

  return (
    <div className="flex flex-col min-h-full fade-in">
      {/* Header Tabs */}
      <div className="bg-[#111622] sticky top-0 z-10 border-b border-[#1E293B] pt-4">
        <h1 className="text-xl font-bold text-white px-4 mb-3">事件中心</h1>
        <div className="flex px-2 overflow-x-auto no-scrollbar pb-2 min-w-full">
          {[
            { id: 'warning', label: '预警事件', icon: AlertTriangle },
            { id: 'claims', label: '理赔事件', icon: FileText },
            { id: 'risk', label: '风险减量', icon: ShieldCheck },
            { id: 'water', label: '预泄/干旱', icon: Droplets },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 min-w-[80px] flex flex-col items-center gap-1.5 py-2 px-1 relative shrink-0",
                activeTab === tab.id ? "text-tech-cyan" : "text-[#64748B] hover:text-[#94A3B8]"
              )}
            >
              <tab.icon className="w-5 h-5 mx-auto" />
              <span className="text-[11px] font-medium whitespace-nowrap">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-tech-cyan rounded-t-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0F172A] px-4 py-3 flex items-center gap-2 border-b border-[#1E293B]">
        <div className="flex-1 relative">
           <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
           <input type="text" placeholder="搜索水库/事件..." className="w-full bg-[#111622] border border-[#1E293B] rounded-full pl-9 pr-4 py-1.5 text-xs text-white outline-none focus:border-tech-cyan transition-colors" />
        </div>
        <button className="p-1.5 bg-[#111622] border border-[#1E293B] rounded-full text-[#94A3B8]">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* List Area */}
      <div className="flex-1 p-4 space-y-3 pb-8">
        {activeTab === 'warning' && (
          <>
            <div className="bg-[#111622] border border-[#1E293B] rounded-xl p-4 active:scale-[0.98] transition-transform">
              <div className="flex justify-between items-start mb-2">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                   <span className="font-bold text-white text-sm">珊溪水库</span>
                 </div>
                 <span className="text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded">待处理</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 mt-3 pl-4 border-l-2 border-[#1E293B]">
                 <div>
                   <div className="text-[10px] text-[#64748B]">当前预警等级</div>
                   <div className="text-xs text-white mt-0.5 font-medium">橙色预警</div>
                 </div>
                 <div>
                   <div className="text-[10px] text-[#64748B]">命中阈值来源</div>
                   <div className="text-xs text-white mt-0.5">预警线</div>
                 </div>
                 <div>
                   <div className="text-[10px] text-[#64748B]">当前水位线</div>
                   <div className="text-xs text-white mt-0.5 font-mono">132.50m</div>
                 </div>
                 <div>
                   <div className="text-[10px] text-[#64748B]">最新预警时间</div>
                   <div className="text-[10px] text-white mt-0.5 font-mono">05-12 14:00</div>
                 </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1E293B] flex justify-end">
                <button className="text-xs font-medium text-tech-cyan flex items-center gap-1">查看处理 <ChevronRight className="w-3 h-3" /></button>
              </div>
            </div>
            {/* MORE ITEMS */}
            <div className="bg-[#111622] border border-[#1E293B] rounded-xl p-4 active:scale-[0.98] transition-transform opacity-70">
              <div className="flex justify-between items-start mb-2">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                   <span className="font-bold text-white text-sm">桥墩水库</span>
                 </div>
                 <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded">已解除</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 mt-3 pl-4 border-l-2 border-[#1E293B]">
                 <div>
                   <div className="text-[10px] text-[#64748B]">最高水位线</div>
                   <div className="text-xs text-white mt-0.5 font-mono">128.10m</div>
                 </div>
                 <div>
                   <div className="text-[10px] text-[#64748B]">最新预警时间</div>
                   <div className="text-[10px] text-white mt-0.5 font-mono">05-10 09:00</div>
                 </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'claims' && (
           <div className="bg-[#111622] border border-[#1E293B] rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                 <div className="font-bold text-white text-sm flex items-center gap-2">
                   <FileText className="w-4 h-4 text-blue-500" />
                   珊溪水库
                 </div>
                 <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded">待业主确认</span>
              </div>
              <div className="mt-3 bg-[#0F172A] p-3 rounded-lg border border-[#1E293B] flex items-end justify-between">
                 <div>
                   <div className="text-[10px] text-[#64748B] mb-1">总赔付金额</div>
                   <div className="text-lg font-bold text-white font-mono flex items-baseline gap-1">
                     <span className="text-xs text-[#94A3B8]">¥</span>150,000.00
                   </div>
                 </div>
                 <div className="text-[10px] text-[#64748B] text-right">
                    结构: 10w / 转移: 5w
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-y-2 mt-3">
                 <div>
                   <div className="text-[10px] text-[#64748B]">水库确认状态</div>
                   <div className="text-xs text-orange-400 mt-0.5">待确认</div>
                 </div>
                 <div className="text-right">
                   <div className="text-[10px] text-[#64748B]">发起时间</div>
                   <div className="text-[10px] text-white mt-0.5 font-mono">05-11 10:30</div>
                 </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1E293B] flex justify-end gap-2">
                <button className="px-3 py-1.5 text-xs font-medium bg-[#1E293B] text-white rounded outline-none w-full">确认理赔</button>
              </div>
           </div>
        )}

        {activeTab === 'risk' && (
           <div className="flex flex-col items-center justify-center p-8 text-[#64748B]">
             <ShieldCheck className="w-8 h-8 mb-2 opacity-50" />
             <span className="text-sm">风险减量记录显示区</span>
           </div>
        )}

        {activeTab === 'water' && (
           <div className="flex flex-col items-center justify-center p-8 text-[#64748B]">
             <Droplets className="w-8 h-8 mb-2 opacity-50" />
             <span className="text-sm">预泄/干旱记录显示区</span>
           </div>
        )}

      </div>
    </div>
  );
}
