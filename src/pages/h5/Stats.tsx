import { MapPin, TrendingUp, AlertTriangle, FileText, Droplets, Sun, Activity, Maximize2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, PieChart, Pie, Cell } from 'recharts';

const waterLevelData = [
  { time: '00:00', level: 125, limit: 130 },
  { time: '04:00', level: 127, limit: 130 },
  { time: '08:00', level: 129, limit: 130 },
  { time: '12:00', level: 131, limit: 130 },
  { time: '14:00', level: 132.5, limit: 130 },
  { time: '16:00', level: 131.5, limit: 130 },
  { time: '20:00', level: 130.8, limit: 130 },
];

const countyData = [
  { name: '泰顺', value: 5, color: '#ef4444' },
  { name: '文成', value: 2, color: '#f97316' },
  { name: '洞头', value: 1, color: '#0ea5e9' },
];

export default function Stats() {
  return (
    <div className="flex flex-col min-h-full pb-8 fade-in">
      {/* Header / Config */}
      <div className="bg-[#111622] p-4 flex items-center justify-between sticky top-0 z-10 border-b border-[#1E293B]">
        <div className="flex flex-col">
          <span className="text-sm text-[#94A3B8]">当前水库</span>
          <select className="bg-transparent text-white font-bold text-xl outline-none cursor-pointer">
            <option>珊溪水库</option>
            <option>桥墩水库</option>
          </select>
        </div>
        <div className="bg-tech-cyan/20 px-3 py-2.5 rounded-full border border-tech-cyan/30 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-tech-cyan" />
          <span className="text-sm font-bold text-tech-cyan">2今日预警</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Map Placeholder */}
        <div className="h-[200px] bg-[#111622] rounded-xl relative overflow-hidden border border-[#1E293B] shadow-inner">
           {/* Faux map background SVG */}
           <svg viewBox="0 0 400 200" className="w-full h-full opacity-50 absolute inset-0" preserveAspectRatio="none">
             <defs>
               <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                 <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="1" />
               </pattern>
             </defs>
             <rect width="400" height="200" fill="url(#grid)" />
             <path d="M -20 150 Q 80 60 180 110 T 300 80 T 420 130 L 420 220 L -20 220 Z" fill="#0F172A" stroke="#334155" strokeWidth="2" />
             <path d="M 80 140 Q 140 90 200 120 T 280 110 L 320 160 L 60 180 Z" fill="#1E293B" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4 4" />
             <path d="M 120 150 Q 160 110 210 130 T 260 120 L 280 160 Z" fill="rgba(14, 165, 233, 0.1)" stroke="none" />
           </svg>
           
           {/* Points */}
           <div className="absolute top-[40%] left-[30%]">
             <div className="relative">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute -top-1 -left-1 opacity-60"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full relative z-10 shadow-[0_0_10px_rgba(239,68,68,0.8)] border-2 border-[#111622]"></div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-white whitespace-nowrap bg-black/60 px-1.5 py-0.5 rounded backdrop-blur font-medium">主坝区(超警)</div>
             </div>
           </div>
           
           <div className="absolute top-[55%] left-[65%]">
             <div className="relative">
                <div className="w-2.5 h-2.5 bg-tech-cyan rounded-full relative z-10 shadow-[0_0_8px_rgba(0,242,255,0.8)] border-[1.5px] border-[#111622]"></div>
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 text-[10px] text-[#94A3B8] whitespace-nowrap font-medium">副坝区</div>
             </div>
           </div>

           <div className="absolute top-[30%] left-[75%]">
             <div className="relative">
                <div className="w-2.5 h-2.5 bg-tech-cyan rounded-full relative z-10 shadow-[0_0_8px_rgba(0,242,255,0.8)] border-[1.5px] border-[#111622]"></div>
             </div>
           </div>

           <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#0B0F17]/80 backdrop-blur rounded-lg px-2 py-1.5 border border-[#1E293B] shadow-md z-10">
              <Activity className="w-4 h-4 text-tech-cyan" />
              <span className="text-xs text-white font-bold">实时传感监控</span>
           </div>

           <button className="absolute bottom-3 right-3 p-2 bg-[#0F172A]/80 backdrop-blur rounded-lg border border-[#1E293B] shadow-md z-10 text-[#94A3B8] hover:text-white hover:border-tech-cyan transition-colors">
              <Maximize2 className="w-4 h-4" />
           </button>
        </div>

        {/* Water Level Trend */}
        <div className="bg-[#111622] rounded-xl border border-[#1E293B] p-4">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-white font-bold flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-tech-cyan" />
               水位趋势
             </h3>
             <div className="flex text-xs bg-[#1E293B] rounded p-0.5">
               <button className="px-2 py-1 bg-[#334155] text-white rounded shadow-sm">近24H</button>
               <button className="px-2 py-1 text-[#94A3B8]">近7日</button>
             </div>
           </div>
           
           <div className="flex gap-4 mb-4">
              <div>
                <div className="text-sm text-[#94A3B8] mb-1">当前水位</div>
                <div className="text-2xl font-bold text-white font-mono flex items-baseline gap-1">132.50<span className="text-xs text-[#64748B]">m</span></div>
              </div>
              <div className="w-[1px] bg-[#1E293B]"></div>
              <div>
                <div className="text-sm text-[#94A3B8] mb-1">最近超限</div>
                <div className="text-base text-white font-mono mt-1.5">05-12 14:00</div>
              </div>
           </div>

           <div className="h-[140px] -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waterLevelData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis domain={['auto', 'auto']} stroke="#475569" fontSize={10} tickLine={false} axisLine={false} width={35} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#94A3B8', marginBottom: '4px' }}
                  />
                  <ReferenceLine y={130} stroke="#f97316" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="level" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 3, fill: '#0ea5e9', stroke: '#111622', strokeWidth: 2 }} activeDot={{ r: 5, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#111622] rounded-xl border border-[#1E293B] p-4 flex flex-col">
             <div className="text-sm text-[#94A3B8] flex items-center gap-2 mb-2">
               <AlertTriangle className="w-5 h-5 text-orange-500" />
               预警统计
             </div>
             <div className="text-2xl font-bold text-white mb-1">12</div>
             <div className="text-xs text-orange-400">本月新增 3 起</div>
          </div>
          <div className="bg-[#111622] rounded-xl border border-[#1E293B] p-4 flex flex-col">
             <div className="text-sm text-[#94A3B8] flex items-center gap-2 mb-2">
               <FileText className="w-5 h-5 text-blue-500" />
               理赔记录
             </div>
             <div className="text-2xl font-bold text-white mb-1">4</div>
             <div className="text-xs text-blue-400">进行中 1 起</div>
          </div>
          <div className="bg-[#111622] rounded-xl border border-[#1E293B] p-4 flex flex-col">
             <div className="text-sm text-[#94A3B8] flex items-center gap-2 mb-2">
               <Droplets className="w-5 h-5 text-cyan-500" />
               预泄数据
             </div>
             <div className="text-2xl font-bold text-white mb-1">2</div>
             <div className="text-xs text-cyan-400">最近: 05-01</div>
          </div>
          <div className="bg-[#111622] rounded-xl border border-[#1E293B] p-4 flex flex-col">
             <div className="text-sm text-[#94A3B8] flex items-center gap-2 mb-2">
               <Sun className="w-5 h-5 text-red-500" />
               干旱预警
             </div>
             <div className="text-2xl font-bold text-white mb-1">0</div>
             <div className="text-xs text-red-400">无干旱记录</div>
          </div>
        </div>

        {/* County Stats */}
        <div className="bg-[#111622] rounded-xl border border-[#1E293B] p-4">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-white font-bold flex items-center gap-2">
               <MapPin className="w-5 h-5 text-tech-cyan" />
               县域灾害
             </h3>
             <div className="flex text-xs bg-[#1E293B] rounded p-0.5">
               <button className="px-2 py-1 bg-[#334155] text-white rounded shadow-sm">泰顺县</button>
               <button className="px-2 py-1 text-[#94A3B8]">文成县</button>
             </div>
           </div>
           <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                 <div className="text-xs text-[#94A3B8] mb-1">灾害数量</div>
                 <div className="text-2xl font-bold text-white mb-2">5</div>
                 <div className="flex gap-2">
                   <span className="text-xs bg-red-500/20 text-red-400 px-2.5 py-1 rounded border border-red-500/30">最高: 红色</span>
                   <span className="text-xs bg-[#1E293B] text-[#94A3B8] px-2.5 py-1 rounded border border-[#334155]">台风</span>
                 </div>
              </div>
              <div className="w-[80px] h-[80px] relative flex shadow-inner rounded-full overflow-hidden shrink-0">
                 <ResponsiveContainer width={80} height={80}>
                   <PieChart>
                     <Pie
                       data={countyData}
                       cx="50%"
                       cy="50%"
                       innerRadius={25}
                       outerRadius={40}
                       paddingAngle={3}
                       dataKey="value"
                       stroke="none"
                     >
                       {countyData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                   </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-white font-bold">8</div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
