import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, ShieldAlert, FileText, Droplets, Droplet, Sun, Bell, Map as MapIcon, ChevronRight, Clock } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { cn } from '@/lib/utils';

type Reservoir = {
  id: string;
  name: string;
  status: 'warning' | 'danger' | 'normal';
  color: string;
  baseLevel: number;
  warningLevel: number;
  landLevel: number;
  pos: { top: string; left: string };
  stats: {
    currentTime: string;
    lowestLevel: number;
    cumulativeImmersion: string;
    preDischargeTime: string;
    preDischargeVolume: string;
    droughtDays: string;
    droughtLevel: string;
    warningYearCount: number;
    highestWarning: number;
    paid: string;
    transferQuota: string;
    injuryQuota: string;
    totalQuota: string;
  };
};

const RESERVOIRS: Reservoir[] = [
  {
    id: 'shanxi',
    name: '珊溪水库',
    status: 'warning',
    color: '#F59E0B',
    baseLevel: 142.5,
    warningLevel: 145,
    landLevel: 152,
    pos: { top: '35%', left: '42%' },
    stats: { currentTime: '14:25:30', lowestLevel: 138.2, cumulativeImmersion: '4.5小时', preDischargeTime: '05-12 10:00', preDischargeVolume: '120.5 万m³', droughtDays: '0 天', droughtLevel: '无', warningYearCount: 12, highestWarning: 148.2, paid: '¥ 1,200,000', transferQuota: '¥ 4,500,000', injuryQuota: '¥ 8,800,000', totalQuota: '¥ 15,000,000' }
  },
  {
    id: 'qiaodun',
    name: '桥墩水库',
    status: 'danger',
    color: '#EF4444',
    baseLevel: 34.2,
    warningLevel: 32,
    landLevel: 36,
    pos: { top: '65%', left: '30%' },
    stats: { currentTime: '14:25:30', lowestLevel: 28.5, cumulativeImmersion: '12.8小时', preDischargeTime: '05-11 14:00', preDischargeVolume: '55.0 万m³', droughtDays: '0 天', droughtLevel: '无', warningYearCount: 35, highestWarning: 38.5, paid: '¥ 5,600,000', transferQuota: '¥ 1,200,000', injuryQuota: '¥ 2,100,000', totalQuota: '¥ 4,800,000' }
  },
  {
    id: 'zhaoshandu',
    name: '赵山渡水库',
    status: 'normal',
    color: '#10B981',
    baseLevel: 20.1,
    warningLevel: 22,
    landLevel: 25,
    pos: { top: '50%', left: '60%' },
    stats: { currentTime: '14:25:30', lowestLevel: 16.8, cumulativeImmersion: '0小时', preDischargeTime: '--', preDischargeVolume: '0 万m³', droughtDays: '15 天', droughtLevel: '中度干旱', warningYearCount: 4, highestWarning: 23.1, paid: '¥ 0', transferQuota: '¥ 5,000,000', injuryQuota: '¥ 10,000,000', totalQuota: '¥ 18,000,000' }
  }
];

const WARNINGS = [
  { id: 'W01', time: '14:21', text: '水位超过警戒线', target: 'bridge', status: 'danger' },
  { id: 'W02', time: '10:15', text: '水流速异常偏高', target: 'shanxi', status: 'warning' },
  { id: 'W03', time: '昨日', text: '设备信号丢失', target: 'sensor_4', status: 'muted' },
];

const CLAIMS = [
  { id: 'C2024101', time: '2024-05-20', text: '干旱减产保险理赔单', status: 'processing', amount: '¥ 125,000' },
  { id: 'C2024098', time: '2024-05-18', text: '涉水设施损坏补偿', status: 'paid', amount: '¥ 42,000' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string>('shanxi');
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');

  const selected = RESERVOIRS.find(r => r.id === selectedId)!;

  // Generate chart data based on selected reservoir and time range
  const chartData = useMemo(() => {
    const data = [];
    let count = 0;
    let labelFormatter = (i: number) => '';
    
    if (timeRange === 'day') {
      count = 12; // Every 2 hours
      labelFormatter = (i) => `${(i * 2).toString().padStart(2, '0')}:00`;
    } else if (timeRange === 'week') {
      count = 7;
      labelFormatter = (i) => `Day ${i + 1}`;
    } else {
      count = 15; // Every 2 days
      labelFormatter = (i) => `May ${i * 2 + 1}`;
    }

    let current = selected.baseLevel - (selected.status === 'danger' ? 2 : -2); // Start a bit offset
    
    for (let i = 0; i < count; i++) {
      // Create some random walk fluctuation
      const change = (Math.random() - 0.5) * (selected.warningLevel * 0.05);
      current = Math.max(0, current + change);
      
      // Force the latest point to be exactly the baseLevel for realism
      if (i === count - 1) current = selected.baseLevel;

      data.push({
        time: labelFormatter(i),
        level: Number(current.toFixed(2))
      });
    }
    return data;
  }, [selectedId, timeRange, selected]);

  // Ensure Y axis domain covers the land level (征地线)
  const yDomain = useMemo(() => {
    const minLevel = Math.min(...chartData.map(d => d.level), selected.baseLevel);
    // Determine the max possible value between data, warning, and land level
    const maxRequired = Math.max(...chartData.map(d => d.level), selected.warningLevel, selected.landLevel);
    
    return [
      Math.floor(minLevel * 0.8), // giving some bottom padding
      Math.ceil(maxRequired * 1.1) // giving some top padding to clearly show landLevel
    ];
  }, [chartData, selected]);

  return (
    <div className="h-full flex gap-4 p-4">
      {/* LEFT: Monitoring Area */}
      <div className="w-[380px] flex flex-col gap-4">
        <div className="bg-[#111622] rounded-lg border border-[#1E293B] flex-1 flex flex-col">
          <div className="p-4 border-b border-[#1E293B]">
            <h2 className="text-white font-bold text-sm tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-tech-cyan" />
              实时监测数据
            </h2>
          </div>
          
          <div className="p-3 grid grid-cols-2 gap-2 pb-1">
             <div className="bg-[#0F172A] border border-[#1E293B] p-2 rounded flex flex-col justify-center">
                <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest mb-0.5 flex items-center gap-1"><Droplets className="w-3 h-3 text-blue-400"/> 当前水位</div>
                <div className="text-lg font-mono flex items-baseline" style={{ color: selected.color }}>{selected.baseLevel.toFixed(2)}<span className="text-[10px] text-[#64748B] ml-1">m</span></div>
             </div>
             <div className="bg-[#0F172A] border border-[#1E293B] p-2 rounded flex flex-col justify-center">
                <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest mb-0.5 flex items-center gap-1"><Clock className="w-3 h-3 text-tech-cyan"/> 获取时间</div>
                <div className="text-sm font-mono text-white flex items-center h-full">{selected.stats.currentTime}</div>
             </div>
             <div className="bg-[#0F172A] border border-[#1E293B] p-2 rounded flex flex-col justify-center">
                <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest mb-0.5 flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-orange-500"/> 预警线</div>
                <div className="text-lg font-mono text-orange-400 flex items-baseline">{selected.warningLevel.toFixed(2)}<span className="text-[10px] text-[#64748B] ml-1">m</span></div>
             </div>
             <div className="bg-[#0F172A] border border-[#1E293B] p-2 rounded flex flex-col justify-center">
                <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest mb-0.5 flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-red-500"/> 征地线</div>
                <div className="text-lg font-mono text-red-400 flex items-baseline">{selected.landLevel.toFixed(2)}<span className="text-[10px] text-[#64748B] ml-1">m</span></div>
             </div>
             <div className="bg-[#0F172A] border border-[#1E293B] p-2 rounded flex flex-col justify-center">
                <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest mb-0.5 flex items-center gap-1"><Activity className="w-3 h-3 text-purple-400"/> 历史最高水位</div>
                <div className="text-lg font-mono text-purple-400 flex items-baseline">{selected.stats.highestWarning.toFixed(2)}<span className="text-[10px] text-[#64748B] ml-1">m</span></div>
             </div>
             <div className="bg-[#0F172A] border border-[#1E293B] p-2 rounded flex flex-col justify-center">
                <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest mb-0.5 flex items-center gap-1"><Droplet className="w-3 h-3 text-green-500"/> 历史最低水位</div>
                <div className="text-lg font-mono text-green-400 flex items-baseline">{selected.stats.lowestLevel.toFixed(2)}<span className="text-[10px] text-[#64748B] ml-1">m</span></div>
             </div>
          </div>

          <div className="px-4 py-1.5 flex items-center justify-between">
             <div className="text-xs font-bold text-[#94A3B8] border-l-2 border-tech-cyan pl-2">实时水位线</div>
             <div className="flex bg-[#0F172A] border border-[#1E293B] rounded">
                {(['day', 'week', 'month'] as const).map(t => (
                  <button 
                    key={t}
                    onClick={() => setTimeRange(t)}
                    className={cn(
                      "px-3 py-1 text-[10px] transition-colors",
                      timeRange === t ? "bg-tech-border text-tech-cyan" : "text-[#64748B] hover:text-[#94A3B8]"
                    )}
                  >
                    {t === 'day' ? '日' : t === 'week' ? '周' : '月'}
                  </button>
                ))}
             </div>
          </div>

          {/* Chart Container */}
          <div className="flex-1 w-full px-2 min-h-[160px] pb-2 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" fontSize={10} tickMargin={8} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} domain={yDomain} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111622', borderColor: '#1E293B', borderRadius: '4px', fontSize: '12px' }}
                  itemStyle={{ color: '#00F2FF' }}
                />
                
                {/* Warning Line (Orange) */}
                <ReferenceLine 
                  y={selected.warningLevel} 
                  stroke="#F59E0B" 
                  strokeDasharray="3 3" 
                />
                {/* Land Acquisition Line (Red) */}
                <ReferenceLine 
                  y={selected.landLevel} 
                  stroke="#EF4444" 
                  strokeDasharray="3 3" 
                />

                <Line 
                  type="monotone" 
                  dataKey="level" 
                  stroke={selected.color} 
                  strokeWidth={2}
                  dot={{ r: 2, fill: '#111622', stroke: selected.color, strokeWidth: 2 }}
                  activeDot={{ r: 4, fill: selected.color }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="p-3 border-t border-[#1E293B] grid grid-cols-2 gap-2 mt-auto bg-[#0F172A]/30">
             <div className="bg-[#0F172A] border border-[#1E293B] p-2 rounded flex flex-col">
                <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest mb-1 flex items-center gap-1"><Bell className="w-3 h-3 text-yellow-400"/>累计淹没时长</div>
                <div className="text-white font-mono text-sm">{selected.stats.cumulativeImmersion}</div>
             </div>
             <div className="bg-[#0F172A] border border-[#1E293B] p-2 rounded flex flex-col">
                <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest mb-1 flex items-center gap-1"><Droplet className="w-3 h-3 text-tech-cyan"/>预泄时间</div>
                <div className="text-white font-mono text-sm">{selected.stats.preDischargeTime}</div>
             </div>
             <div className="bg-[#0F172A] border border-[#1E293B] p-2 rounded flex flex-col">
                <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest mb-1 flex items-center gap-1"><Droplets className="w-3 h-3 text-blue-400"/>预泄量</div>
                <div className="text-white font-mono text-sm">{selected.stats.preDischargeVolume}</div>
             </div>
             <div className="bg-[#0F172A] border border-[#1E293B] p-2 rounded flex flex-col">
                <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest mb-1 flex items-center gap-1"><Sun className="w-3 h-3 text-orange-400"/>干旱情况</div>
                <div className="text-white font-mono text-sm">
                   {selected.stats.droughtDays} <span className={cn("text-[10px] ml-1", selected.stats.droughtLevel === '无' ? "text-green-400" : "text-orange-400")}>{selected.stats.droughtLevel}</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* CENTER: Main Visual Map */}
      <div className="flex-1 bg-[#111622] rounded-lg border border-[#1E293B] relative overflow-hidden flex flex-col shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] [background-size:30px_30px] opacity-40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0F17_100%)] pointer-events-none"></div>

        {/* Header / Selector Overlay */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-4">
           <div className="bg-[#0F172A]/80 backdrop-blur border border-tech-cyan/30 px-4 py-2 rounded-lg flex items-center gap-3">
              <MapIcon className="w-5 h-5 text-tech-cyan" />
              <div className="flex flex-col">
                <span className="text-[10px] text-tech-cyan font-mono uppercase tracking-widest leading-none mb-1">Target Sector</span>
                <span className="text-white font-bold tracking-widest">{selected.name}</span>
              </div>
           </div>
           <div className="flex bg-[#0F172A]/80 backdrop-blur border border-[#1E293B] p-1 rounded-lg">
             {RESERVOIRS.map(r => (
               <button
                 key={r.id}
                 onClick={() => setSelectedId(r.id)}
                 className={cn(
                   "px-3 py-1.5 text-xs font-medium rounded transition-all",
                   selectedId === r.id ? "bg-[#1E293B] text-white" : "text-[#64748B] hover:text-[#94A3B8]"
                 )}
               >
                 {r.name}
               </button>
             ))}
           </div>
        </div>

        {/* Nodes */}
        {RESERVOIRS.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelectedId(r.id)}
            className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 group z-20"
            style={{ top: r.pos.top, left: r.pos.left }}
          >
            {/* Ripple layers */}
            {selectedId === r.id && (
              <>
                <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: r.color, transform: 'scale(3)' }}></span>
                <span className="absolute inset-0 rounded-full animate-ping opacity-40 delay-75" style={{ backgroundColor: r.color, transform: 'scale(1.5)' }}></span>
              </>
            )}
            
            <div 
              className={cn(
                "relative w-5 h-5 rounded-full border-[3px] border-[#0B0F17] z-10 transition-transform",
                selectedId === r.id ? "scale-125" : "hover:scale-110"
              )}
              style={{ backgroundColor: r.color, boxShadow: `0 0 15px ${r.color}` }}
            />
            
            {/* Label */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#0F172A]/90 backdrop-blur border border-[#1E293B] px-2 py-1 rounded whitespace-nowrap pointer-events-none">
              <span className="text-[10px] text-white font-medium">{r.name}</span>
            </div>
          </button>
        ))}
      </div>

      {/* RIGHT: Events Area */}
      <div className="w-[340px] flex flex-col gap-4">
        {/* Warnings */}
        <div className="bg-[#111622] rounded-lg border border-[#1E293B] flex flex-col h-1/2">
          <div className="p-4 border-b border-[#1E293B] flex justify-between items-center">
            <h2 className="text-white font-bold text-sm tracking-widest flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              异常预警
            </h2>
          </div>
          <div className="px-4 py-3 border-b border-[#1E293B] grid grid-cols-2 gap-2 bg-[#0F172A]/50">
             <div>
               <div className="text-[10px] text-[#64748B] uppercase">近一年预警次数</div>
               <div className="text-lg font-mono text-white mt-0.5">{selected.stats.warningYearCount} <span className="text-xs text-[#64748B]">次</span></div>
             </div>
             <div>
               <div className="text-[10px] text-[#64748B] uppercase">当前预警水位</div>
               <div className="text-lg font-mono text-red-400 mt-0.5">{selected.warningLevel.toFixed(2)} <span className="text-xs text-[#64748B]">m</span></div>
             </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
            {WARNINGS.map(w => (
              <div 
                key={w.id} 
                onClick={() => navigate(`/risk/warning?id=${w.id}`)}
                className="p-3 bg-[#0F172A] border border-[#1E293B] hover:border-tech-cyan/40 rounded flex items-start gap-3 cursor-pointer transition-colors group"
              >
                <div className={cn(
                  "w-2 h-2 rounded-full mt-1 shrink-0",
                  w.status === 'danger' ? "bg-red-500 animate-pulse" : w.status === 'warning' ? "bg-yellow-500" : "bg-slate-500"
                )}></div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white font-medium truncate">{w.text}</div>
                  <div className="text-[10px] text-[#64748B] mt-1">{w.target}</div>
                </div>
                <div className="text-[10px] text-[#475569] font-mono group-hover:text-tech-cyan pt-1 flex items-center gap-1">
                  {w.time}
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claims */}
        <div className="bg-[#111622] rounded-lg border border-[#1E293B] flex flex-col h-1/2">
          <div className="p-4 border-b border-[#1E293B] flex justify-between items-center">
            <h2 className="text-white font-bold text-sm tracking-widest flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              理赔追踪
            </h2>
          </div>
          <div className="p-4 border-b border-[#1E293B] space-y-2 bg-[#0F172A]/50">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#64748B]">已赔金额</span>
              <span className="text-tech-cyan font-mono font-bold">{selected.stats.paid}</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-[#475569]">转移安置理赔余额</span>
              <span className="text-[#E0E6ED] font-mono">{selected.stats.transferQuota}</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-[#475569]">人身伤亡理赔余额</span>
              <span className="text-[#E0E6ED] font-mono">{selected.stats.injuryQuota}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] pt-1.5 border-t border-[#1E293B] mt-1">
              <span className="text-[#475569] font-bold">剩余总赔付额度</span>
              <span className="text-green-400 font-mono font-bold">{selected.stats.totalQuota}</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
             {CLAIMS.map(c => (
              <div 
                key={c.id} 
                onClick={() => navigate(`/risk/claims?id=${c.id}`)}
                className="p-3 bg-[#0F172A] border border-[#1E293B] hover:border-tech-cyan/40 rounded flex flex-col justify-center cursor-pointer transition-colors group relative"
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="text-xs text-white font-medium">{c.text}</div>
                  <div className="text-[10px] text-[#475569] font-mono">{c.id}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded",
                    c.status === 'processing' ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"
                  )}>
                    {c.status === 'processing' ? '处理中' : '已结案'}
                  </div>
                  <div className="text-xs font-mono text-[#E0E6ED] flex items-center gap-1 group-hover:text-tech-cyan transition-colors">
                    {c.amount}
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
