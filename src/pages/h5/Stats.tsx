import { MapPin, TrendingUp, AlertTriangle, FileText, Droplets, Sun, Activity } from 'lucide-react';

export default function Stats() {
  return (
    <div className="flex flex-col min-h-full pb-8 fade-in">
      {/* Header / Config */}
      <div className="bg-[#111622] p-4 flex items-center justify-between sticky top-0 z-10 border-b border-[#1E293B]">
        <div className="flex flex-col">
          <span className="text-xs text-[#94A3B8]">当前水库</span>
          <select className="bg-transparent text-white font-bold text-lg outline-none cursor-pointer">
            <option>珊溪水库</option>
            <option>桥墩水库</option>
          </select>
        </div>
        <div className="bg-tech-cyan/20 px-3 py-1.5 rounded-full border border-tech-cyan/30 flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3 text-tech-cyan" />
          <span className="text-xs font-bold text-tech-cyan">2今日预警</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Map Placeholder */}
        <div className="h-[180px] bg-[#1E293B] rounded-xl relative overflow-hidden border border-[#334155] flex flex-col items-center justify-center">
           <MapPin className="w-8 h-8 text-[#94A3B8] mb-2" />
           <span className="text-sm text-[#94A3B8] font-medium">水库地图与点位</span>
        </div>

        {/* Water Level Trend */}
        <div className="bg-[#111622] rounded-xl border border-[#1E293B] p-4">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-white font-bold flex items-center gap-2">
               <TrendingUp className="w-4 h-4 text-tech-cyan" />
               水位趋势
             </h3>
             <div className="flex text-[10px] bg-[#1E293B] rounded p-0.5">
               <button className="px-2 py-1 bg-[#334155] text-white rounded shadow-sm">近24H</button>
               <button className="px-2 py-1 text-[#94A3B8]">近7日</button>
             </div>
           </div>
           
           <div className="flex gap-4 mb-4">
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">当前水位</div>
                <div className="text-xl font-bold text-white font-mono">132.50<span className="text-[10px] text-[#64748B] ml-1">m</span></div>
              </div>
              <div className="w-[1px] bg-[#1E293B]"></div>
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">最近超限</div>
                <div className="text-sm text-white font-mono mt-1.5">05-12 14:00</div>
              </div>
           </div>

           <div className="h-[120px] bg-[#0F172A] rounded border border-[#1E293B] flex items-center justify-center text-xs text-[#64748B]">
              [水位线折线图]
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#111622] rounded-xl border border-[#1E293B] p-4 flex flex-col">
             <div className="text-xs text-[#94A3B8] flex items-center gap-1.5 mb-2">
               <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
               预警统计
             </div>
             <div className="text-2xl font-bold text-white mb-1">12</div>
             <div className="text-[10px] text-orange-400">本月新增 3 起</div>
          </div>
          <div className="bg-[#111622] rounded-xl border border-[#1E293B] p-4 flex flex-col">
             <div className="text-xs text-[#94A3B8] flex items-center gap-1.5 mb-2">
               <FileText className="w-3.5 h-3.5 text-blue-500" />
               理赔记录
             </div>
             <div className="text-2xl font-bold text-white mb-1">4</div>
             <div className="text-[10px] text-blue-400">进行中 1 起</div>
          </div>
          <div className="bg-[#111622] rounded-xl border border-[#1E293B] p-4 flex flex-col">
             <div className="text-xs text-[#94A3B8] flex items-center gap-1.5 mb-2">
               <Droplets className="w-3.5 h-3.5 text-cyan-500" />
               预泄数据
             </div>
             <div className="text-2xl font-bold text-white mb-1">2</div>
             <div className="text-[10px] text-cyan-400">最近: 05-01</div>
          </div>
          <div className="bg-[#111622] rounded-xl border border-[#1E293B] p-4 flex flex-col">
             <div className="text-xs text-[#94A3B8] flex items-center gap-1.5 mb-2">
               <Sun className="w-3.5 h-3.5 text-red-500" />
               干旱预警
             </div>
             <div className="text-2xl font-bold text-white mb-1">0</div>
             <div className="text-[10px] text-red-400">无干旱记录</div>
          </div>
        </div>

        {/* County Stats */}
        <div className="bg-[#111622] rounded-xl border border-[#1E293B] p-4">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-white font-bold flex items-center gap-2">
               <MapPin className="w-4 h-4 text-tech-cyan" />
               县域灾害
             </h3>
             <div className="flex text-[10px] bg-[#1E293B] rounded p-0.5">
               <button className="px-2 py-1 bg-[#334155] text-white rounded shadow-sm">泰顺县</button>
               <button className="px-2 py-1 text-[#94A3B8]">文成县</button>
             </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex-1">
                 <div className="text-[10px] text-[#94A3B8] mb-1">灾害数量</div>
                 <div className="text-xl font-bold text-white mb-2">5</div>
                 <div className="flex gap-2">
                   <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30">最高: 红色</span>
                   <span className="text-[10px] bg-[#1E293B] text-[#94A3B8] px-1.5 py-0.5 rounded border border-[#334155]">台风</span>
                 </div>
              </div>
              <div className="w-[80px] h-[80px] bg-[#0F172A] rounded-full border-[4px] border-[#1E293B] flex items-center justify-center text-xs text-[#64748B]">
                [分布图]
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
