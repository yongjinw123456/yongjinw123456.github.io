import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Monitor, AlertTriangle, FileText, Activity, Map, ArrowUp, ArrowDown, Camera,
  Clock, CheckCircle, XCircle, ShieldAlert, Droplet, Wifi, WifiOff
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { cn } from '@/lib/utils';

const MOCK_DATA = Array.from({ length: 24 }).map((_, i) => {
  const hour = `${i.toString().padStart(2, '0')}:00`;
  const base = 143;
  const variation = Math.sin(i / 4) * 2 + Math.random() * 0.5;
  return { time: hour, value: Number((base + variation).toFixed(2)) };
});

export default function Realtime() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialReservoirId = searchParams.get('reservoirId') || 'shanxi';

  const [reservoirId, setReservoirId] = useState(initialReservoirId);

  const warningLine = 144.00;
  const expropriationLine = 145.00;
  const currentWaterLevel = 144.60;
  
  const diffWarning = currentWaterLevel - warningLine;
  const diffExpropriation = currentWaterLevel - expropriationLine;

  const isOverWarning = currentWaterLevel > warningLine;
  
  return (
    <div className="h-full flex flex-col overflow-y-auto w-full fade-in p-6 gap-6">
      <header className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
             <span className="w-1.5 h-5 bg-tech-cyan rounded-sm"></span>
             <span>实时数据监控</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1 pl-4 uppercase tracking-wider font-mono">
            MONITORING / REALTIME DATA
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-[#111622] border border-[#1E293B] px-4 py-2 rounded-lg">
           <label className="text-xs text-[#64748B] font-bold tracking-widest uppercase">当前监控水库:</label>
           <select 
              value={reservoirId} 
              onChange={e => setReservoirId(e.target.value)}
              className="bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1 text-xs text-white outline-none cursor-pointer"
           >
              <option value="shanxi">珊溪水库 (温州市 - 文成县)</option>
              <option value="qiaodun">桥墩水库 (苍南县)</option>
           </select>
        </div>
      </header>
      
      {/* 顶部关键指标区 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
         <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
               <span className="text-xs text-[#94A3B8] font-bold">当前实时水位</span>
               <Droplet className="w-4 h-4 text-tech-cyan" />
            </div>
            <div className="flex items-baseline gap-2">
               <span className="text-3xl font-mono text-white tracking-tight">{currentWaterLevel.toFixed(2)}</span>
               <span className="text-xs text-[#64748B]">米</span>
            </div>
            <div className="mt-4 flex flex-col gap-1 text-[10px] font-mono">
               <div className="flex justify-between items-center bg-[#0F172A] px-2 py-1.5 rounded border border-[#1E293B]">
                  <span className="text-[#64748B]">较预警线</span>
                  <span className={cn("font-medium flex items-center gap-1", diffWarning > 0 ? "text-orange-400" : "text-green-400")}>
                    {diffWarning > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(diffWarning).toFixed(2)}m
                  </span>
               </div>
               <div className="flex justify-between items-center bg-[#0F172A] px-2 py-1.5 rounded border border-[#1E293B]">
                  <span className="text-[#64748B]">较征地线</span>
                  <span className={cn("font-medium flex items-center gap-1", diffExpropriation > 0 ? "text-red-400" : "text-green-400")}>
                    {diffExpropriation > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(diffExpropriation).toFixed(2)}m
                  </span>
               </div>
            </div>
         </div>
         
         <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
               <span className="text-xs text-[#94A3B8] font-bold">水库预警态势</span>
               <ShieldAlert className="w-4 h-4 text-orange-400" />
            </div>
            <div className="flex items-baseline gap-2">
               <span className="text-3xl font-mono text-orange-400 tracking-tight">橙色</span>
               <span className="text-xs text-[#64748B]">当前等级</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-mono">
               <div className="bg-[#0F172A] px-2 py-1.5 rounded border border-[#1E293B] flex flex-col gap-0.5">
                  <span className="text-[#64748B]">连续超限时长</span>
                  <span className="text-orange-400 font-medium">14 小时</span>
               </div>
               <div className="bg-[#0F172A] px-2 py-1.5 rounded border border-[#1E293B] flex flex-col gap-0.5">
                  <span className="text-[#64748B]">今日预警触发</span>
                  <span className="text-white font-medium">2 次</span>
               </div>
            </div>
         </div>
         
         <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
               <span className="text-xs text-[#94A3B8] font-bold">数据采集质量</span>
               <Activity className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex items-baseline gap-2">
               <span className="text-3xl font-mono text-green-400 tracking-tight">99.8%</span>
               <span className="text-xs text-[#64748B]">采集成功率 (24h)</span>
            </div>
            <div className="mt-4 flex justify-between items-center bg-[#0F172A] px-3 py-2 rounded border border-[#1E293B] text-[10px] font-mono">
               <div className="flex gap-4">
                  <span className="flex flex-col"><span className="text-[#64748B]">异常/缺失</span><span className="text-white">1 次</span></span>
                  <span className="flex flex-col"><span className="text-[#64748B]">最近异常时间</span><span className="text-white">昨日 23:05</span></span>
               </div>
               <Wifi className="w-4 h-4 text-[#475569]" />
            </div>
         </div>
         
         <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
               <span className="text-xs text-[#94A3B8] font-bold">关联业务与状态</span>
               <FileText className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex items-baseline gap-2">
               <span className="text-3xl font-mono text-white tracking-tight">3</span>
               <span className="text-xs text-[#64748B]">笔理赔记录</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-mono">
               <div className="bg-[#0F172A] px-2 py-1.5 rounded border border-[#1E293B] flex flex-col gap-0.5">
                  <span className="text-[#64748B]">待确认理赔</span>
                  <span className="text-blue-400 font-medium">1 笔</span>
               </div>
               <div className="bg-[#0F172A] px-2 py-1.5 rounded border border-[#1E293B] flex flex-col gap-0.5">
                  <span className="text-[#64748B]">保单状态</span>
                  <span className="text-green-400 font-medium whitespace-nowrap">保障中</span>
               </div>
            </div>
         </div>
      </div>

      {/* 中部区 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-[400px]">
        
        {/* 图表区 (占2列) */}
        <div className="xl:col-span-2 bg-[#111622] border border-[#1E293B] rounded-lg p-5 flex flex-col gap-4">
           <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-tech-cyan" />
                近24小时水位趋势与阈值对比
              </h3>
              <div className="flex items-center gap-4 text-[10px]">
                 <div className="flex items-center gap-1.5"><span className="w-2 h-0.5 bg-tech-cyan"></span><span className="text-[#94A3B8]">实时水位</span></div>
                 <div className="flex items-center gap-1.5"><span className="w-2 h-0.5 bg-orange-500"></span><span className="text-[#94A3B8]">预警线 (144.00)</span></div>
                 <div className="flex items-center gap-1.5"><span className="w-2 h-0.5 bg-red-500"></span><span className="text-[#94A3B8]">征地线 (145.00)</span></div>
              </div>
           </div>
           
           <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={MOCK_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                       <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00F2FF" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00F2FF" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis dataKey="time" stroke="#475569" fontSize={10} tickMargin={10} minTickGap={20} />
                    <YAxis domain={['dataMin - 1', 'dataMax + 2']} stroke="#475569" fontSize={10} tickFormatter={(val) => val.toFixed(1)} />
                    <Tooltip
                       contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', fontSize: '12px', color: '#fff' }}
                       itemStyle={{ color: '#00F2FF' }}
                    />
                    <ReferenceLine y={warningLine} stroke="#f97316" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: '预警线', fill: '#f97316', fontSize: 10 }} />
                    <ReferenceLine y={expropriationLine} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: '征地线', fill: '#ef4444', fontSize: 10 }} />
                    <ReferenceLine y={currentWaterLevel} stroke="#00F2FF" strokeDasharray="1 1" />
                    <Area type="monotone" dataKey="value" stroke="#00F2FF" strokeWidth={2} fillOpacity={1} fill="url(#colorWater)" activeDot={{ r: 4, fill: '#00F2FF', stroke: '#fff' }} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
           
           <div className="grid grid-cols-3 gap-4 border-t border-[#1E293B] pt-4 mt-2">
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] text-[#64748B] uppercase tracking-wider">近7日最高水位</span>
                 <span className="text-sm font-mono text-orange-400">145.20 米 (5-11)</span>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] text-[#64748B] uppercase tracking-wider">近7日最低水位</span>
                 <span className="text-sm font-mono text-white">141.50 米 (5-06)</span>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] text-[#64748B] uppercase tracking-wider">近7日平均水位</span>
                 <span className="text-sm font-mono text-[#94A3B8]">143.12 米</span>
              </div>
           </div>
        </div>

        {/* 监控与摘要区 (占1列) */}
        <div className="flex flex-col gap-6">
           
           {/* 实景监控 */}
           <div className="bg-[#111622] border border-[#1E293B] rounded-lg overflow-hidden flex flex-col shrink-0">
              <div className="p-3 border-b border-[#1E293B] flex items-center justify-between">
                 <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                   <Camera className="w-4 h-4 text-tech-cyan" />
                   大坝监测点 01
                 </h3>
                 <span className="flex items-center gap-1.5 text-[10px] text-green-400"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>在线</span>
              </div>
              <div className="aspect-video bg-[#0B0F17] relative flex items-center justify-center">
                 {/* Placeholder for CCTV stream */}
                 <div className="absolute inset-0 border border-white/5 m-4 rounded pointer-events-none"></div>
                 <Camera className="w-10 h-10 text-[#1E293B]" />
                 <span className="absolute bottom-2 right-3 text-[10px] font-mono text-white/50 bg-black/40 px-2 py-0.5 rounded">2026-05-12 16:20:00</span>
              </div>
           </div>

           {/* 事件摘要 & 时间线 */}
           <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-5 flex flex-col flex-1 gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center justify-between">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-tech-cyan" /> 最近事件摘要</span>
                <div className="flex gap-2">
                  <button onClick={() => navigate('/risk/warning')} className="text-[10px] text-[#64748B] hover:text-white transition-colors underline underline-offset-2">风控台</button>
                  <button onClick={() => navigate('/risk/claims/records')} className="text-[10px] text-[#64748B] hover:text-white transition-colors underline underline-offset-2">理赔台</button>
                </div>
              </h3>

              <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar pr-2 mt-2 relative">
                 <div className="absolute left-[9px] top-2 bottom-4 w-px bg-[#1E293B]"></div>
                 
                 {/* 预警摘要 (未处理) */}
                 <div className="flex gap-4 relative z-10">
                    <div className="w-[19px] h-[19px] rounded-full bg-[#111622] border-2 border-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                       <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                    </div>
                    <div className="flex flex-col gap-1.5 p-3 bg-orange-500/5 border border-orange-500/20 rounded w-full cursor-pointer hover:bg-orange-500/10 transition-colors" onClick={() => navigate('/risk/warning')}>
                       <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-orange-400">当前预警等级：橙色预警 (144.60m) - 珊溪水库</span>
                          <span className="text-[9px] text-[#64748B] font-mono">10:05</span>
                       </div>
                       <span className="text-[10px] text-[#94A3B8]">预警说明：预警事件持续超线，水位较昨日上涨 2.1 m。</span>
                    </div>
                 </div>

                 {/* 预警摘要 (已处理) */}
                 <div className="flex gap-4 relative z-10">
                    <div className="w-[19px] h-[19px] rounded-full bg-[#111622] border-2 border-[#1E293B] flex items-center justify-center shrink-0 mt-0.5">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></div>
                    </div>
                    <div className="flex flex-col gap-1.5 p-3 bg-[#0F172A] border border-[#1E293B] rounded w-full cursor-pointer hover:bg-[#1E293B] transition-colors" onClick={() => navigate('/risk/warning')}>
                       <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-[#94A3B8]">处理结果：解除预警 - 桥墩水库</span>
                          <span className="text-[9px] text-[#64748B] font-mono">08:30</span>
                       </div>
                       <span className="text-[10px] text-[#64748B]">情况说明：水位已回落至正常水平，解除预警状态。</span>
                    </div>
                 </div>

                 {/* 理赔摘要 */}
                 <div className="flex gap-4 relative z-10">
                    <div className="w-[19px] h-[19px] rounded-full bg-[#111622] border-2 border-blue-400 flex items-center justify-center shrink-0 mt-0.5"></div>
                    <div className="flex flex-col gap-1.5 p-3 bg-[#0F172A] border border-[#1E293B] rounded w-full cursor-pointer hover:bg-[#1E293B] transition-colors" onClick={() => navigate('/risk/claims/records')}>
                       <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-blue-400">保单号：INS202405001</span>
                          <span className="text-[9px] text-[#64748B] font-mono">昨日 16:30</span>
                       </div>
                       <span className="text-[10px] text-[#94A3B8]">管理员 提交的理赔记录，预计赔付金额 5,480,000 元。</span>
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
}
