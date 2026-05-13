import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Map, Activity, AlertTriangle, ShieldCheck, Clock, CheckCircle, BarChart2,
  PieChart, CloudRain, Sun, Wind, Droplets, Mountain
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import { cn } from '@/lib/utils';

const MOCK_COMPARISON_DATA = [
  { name: '台风', Taishun: 2, Wencheng: 1 },
  { name: '暴雨', Taishun: 5, Wencheng: 4 },
  { name: '洪水', Taishun: 1, Wencheng: 2 },
  { name: '地质', Taishun: 3, Wencheng: 1 },
  { name: '干旱', Taishun: 0, Wencheng: 1 },
];

export default function County() {
  const navigate = useNavigate();
  const [region, setRegion] = useState('all');
  
  return (
    <div className="h-full flex flex-col overflow-y-auto w-full fade-in p-6 gap-6">
      <header className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
             <span className="w-1.5 h-5 bg-[#8b5cf6] rounded-sm"></span>
             <span>县域灾害监控</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1 pl-4 uppercase tracking-wider font-mono">
            MONITORING / COUNTY DISASTER
          </p>
        </div>
        
        {/* 筛选区 */}
        <div className="flex items-center gap-4 bg-[#111622] border border-[#1E293B] p-2 rounded-lg">
           <div className="flex flex-col gap-1 px-2">
              <label className="text-[9px] text-[#64748B] font-bold tracking-widest uppercase">地区筛选</label>
              <select 
                 value={region} 
                 onChange={e => setRegion(e.target.value)}
                 className="bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1 text-xs text-white outline-none cursor-pointer min-w-[120px]"
              >
                 <option value="all">全部 (泰顺/文成)</option>
                 <option value="taishun">泰顺县</option>
                 <option value="wencheng">文成县</option>
              </select>
           </div>
           
           <div className="flex flex-col gap-1 px-2 border-l border-[#1E293B]">
              <label className="text-[9px] text-[#64748B] font-bold tracking-widest uppercase">灾害类型</label>
              <select className="bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1 text-xs text-white outline-none cursor-pointer min-w-[100px]">
                 <option value="all">全灾种</option>
                 <option value="typhoon">台风</option>
                 <option value="rainstorm">暴雨</option>
                 <option value="flood">洪水</option>
              </select>
           </div>
        </div>
      </header>

      {/* 总览指标区 */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 shrink-0">
          <div className="col-span-2 bg-[#111622] border border-[#1E293B] rounded-lg p-5 flex flex-col justify-center gap-3 relative overflow-hidden">
             <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-4 translate-y-4">
                <Map className="w-32 h-32" />
             </div>
             <span className="text-xs text-[#94A3B8] font-bold z-10">当前有效灾害事件</span>
             <div className="flex items-baseline gap-3 z-10">
                <span className="text-4xl font-mono text-white tracking-tight">12</span>
                <span className="text-xs text-[#64748B]">起</span>
             </div>
             <div className="flex gap-4 mt-2 z-10">
                <div className="text-[10px] text-[#64748B] bg-[#0F172A] px-2 py-1 rounded border border-[#1E293B]">泰顺: <span className="text-white font-mono">7</span></div>
                <div className="text-[10px] text-[#64748B] bg-[#0F172A] px-2 py-1 rounded border border-[#1E293B]">文成: <span className="text-white font-mono">5</span></div>
             </div>
          </div>
          
          <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-5 flex flex-col justify-between">
             <span className="text-[10px] text-[#64748B] uppercase tracking-widest">最高外部预警</span>
             <div className="flex items-center gap-2 my-2">
                <ShieldCheck className="w-5 h-5 text-orange-500" />
                <span className="text-lg font-bold text-orange-500">暴雨橙色</span>
             </div>
             <span className="text-[10px] text-[#94A3B8]">温州市气象台发布</span>
          </div>

          <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-5 flex flex-col justify-between">
             <span className="text-[10px] text-[#64748B] uppercase tracking-widest">涉险水库数</span>
             <div className="flex items-center gap-2 my-2">
                <span className="text-3xl font-mono text-[#8b5cf6] tracking-tight">4</span>
                <span className="text-[10px] text-[#64748B]">座</span>
             </div>
             <span className="text-[10px] text-[#94A3B8]">跨预警 / 征地线水位</span>
          </div>

          <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-4 flex flex-col gap-2 justify-center">
             <div className="flex items-center justify-between text-[10px]"><span className="text-[#64748B] flex items-center gap-1"><CloudRain className="w-3 h-3"/>暴雨</span><span className="text-white font-mono">6</span></div>
             <div className="flex items-center justify-between text-[10px]"><span className="text-[#64748B] flex items-center gap-1"><Wind className="w-3 h-3"/>台风</span><span className="text-white font-mono">2</span></div>
             <div className="flex items-center justify-between text-[10px]"><span className="text-[#64748B] flex items-center gap-1"><Droplets className="w-3 h-3"/>洪水</span><span className="text-white font-mono">3</span></div>
             <div className="flex items-center justify-between text-[10px]"><span className="text-[#64748B] flex items-center gap-1"><Mountain className="w-3 h-3"/>地质</span><span className="text-white font-mono">1</span></div>
          </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-[450px]">
         
         {/* 中部图表区 */}
         <div className="xl:col-span-2 flex flex-col gap-6">
            <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-5 flex-1 flex flex-col">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                     <BarChart2 className="w-4 h-4 text-[#8b5cf6]" />
                     泰顺/文成分县灾害类型对比
                  </h3>
               </div>
               
               <div className="flex-1 min-h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={MOCK_COMPARISON_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                        <XAxis dataKey="name" stroke="#475569" fontSize={11} tickMargin={10} />
                        <YAxis stroke="#475569" fontSize={11} />
                        <RechartsTooltip 
                           contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', fontSize: '12px', color: '#fff' }}
                           cursor={{ fill: '#1E293B', opacity: 0.4 }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }} />
                        <Bar dataKey="Taishun" name="泰顺县" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        <Bar dataKey="Wencheng" name="文成县" fill="#0ea5e9" radius={[4, 4, 0, 0]} maxBarSize={40} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-5 h-48 flex flex-col">
               <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-[#8b5cf6]" />
                  受灾水库影响快速导航
               </h3>
               <div className="flex gap-4 overflow-x-auto no-scrollbar">
                  {[
                     { name: '珊溪水库', county: '文成县', level: '橙色预警', diff: '+0.60m', id: 'shanxi' },
                     { name: '桥墩水库', county: '泰顺县', level: '黄色预警', diff: '+0.12m', id: 'qiaodun' },
                     { name: '赵山渡水库', county: '瑞安市(周边)', level: '正常', diff: '-1.40m', id: 'zhaoshandu' }
                  ].map((res, idx) => (
                     <div key={idx} className="bg-[#0F172A] border border-[#1E293B] rounded-lg p-3 min-w-[200px] flex flex-col cursor-pointer hover:border-[#8b5cf6]/50 transition-colors" onClick={() => navigate(`/monitoring/realtime?reservoirId=${res.id}`)}>
                        <div className="flex justify-between items-start mb-2">
                           <span className="font-bold text-white text-sm">{res.name}</span>
                           <span className={cn("text-[9px] px-1.5 py-0.5 rounded border", res.level.includes('橙') ? "text-orange-400 border-orange-500/30" : res.level.includes('黄') ? "text-yellow-400 border-yellow-500/30" : "text-green-400 border-green-500/30")}>{res.level}</span>
                        </div>
                        <span className="text-[10px] text-[#64748B] mb-2">{res.county}</span>
                        <div className="mt-auto pt-2 border-t border-[#1E293B] flex justify-between items-center">
                           <span className="text-[10px] text-[#64748B]">越线水位</span>
                           <span className="text-xs font-mono text-white">{res.diff}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* 右侧流事件区 */}
         <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6 shrink-0">
               <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                 <AlertTriangle className="w-4 h-4 text-[#8b5cf6]" />
                 最近灾害播报
               </h3>
               <span className="text-[10px] text-[#64748B] flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div> 实时连线</span>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4">
               
               <div className="bg-orange-500/5 text-orange-400 border border-orange-500/20 rounded-lg p-3 flex flex-col gap-2 relative overflow-hidden group hover:bg-orange-500/10 cursor-pointer">
                  <div className="flex justify-between items-start">
                     <span className="text-xs font-bold bg-orange-500/20 px-2 py-0.5 rounded">暴雨橙色预警</span>
                     <span className="text-[9px] font-mono opacity-60">10:45 AM</span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">
                     泰顺县气象台发布暴雨橙色预警信号：受强对流云团影响，预计未来3小时我县大部乡镇有强降水。
                  </p>
                  <div className="flex justify-between items-center text-[9px] border-t border-orange-500/20 pt-2 mt-1">
                     <span className="opacity-70">来源: 浙江省预警发布中心</span>
                     <span className="flex items-center gap-1 font-mono text-orange-300">关联水库: 3座</span>
                  </div>
               </div>

               <div className="bg-[#0F172A] border border-[#1E293B] rounded-lg p-3 flex flex-col gap-2 group hover:border-[#334155] cursor-pointer">
                  <div className="flex justify-between items-start">
                     <span className="text-xs font-bold text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded">地质灾害气象风险黄色预警</span>
                     <span className="text-[9px] text-[#64748B] font-mono">08:30 AM</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#94A3B8]">
                     文成县自然资源和规划局、文成县气象局联合发布地质灾害气象风险黄色预警，24小时内部分山区发生滑坡风险较高。
                  </p>
                  <div className="flex justify-between items-center text-[9px] border-t border-[#1E293B] pt-2 mt-1">
                     <span className="text-[#64748B]">来源: 文成县自然资源局</span>
                     <span className="flex items-center gap-1 font-mono text-[#94A3B8]">影响范围: 2个乡镇</span>
                  </div>
               </div>

               <div className="bg-[#0F172A] border border-[#1E293B] rounded-lg p-3 flex flex-col gap-2 group hover:border-[#334155] cursor-pointer">
                  <div className="flex justify-between items-start">
                     <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">水库调蓄预报</span>
                     <span className="text-[9px] text-[#64748B] font-mono">昨日 18:00</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#94A3B8]">
                     当前库区上游降雨量超过50mm，未来可能触发预泄洪调节指令，请随时关注珊溪水库监控站网。
                  </p>
                  <div className="flex justify-between items-center text-[9px] border-t border-[#1E293B] pt-2 mt-1">
                     <span className="text-[#64748B]">来源: 飞云江水情监控平台</span>
                     <span className="flex items-center gap-1 font-mono text-[#94A3B8]">关联水库: 珊溪水库</span>
                  </div>
               </div>
               
               <div className="bg-green-500/5 text-green-400 border border-green-500/20 rounded-lg p-3 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                     <span className="text-xs font-bold bg-green-500/20 px-2 py-0.5 rounded">台风蓝色预警解除</span>
                     <span className="text-[9px] font-mono opacity-60">前日 15:30</span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">
                     台风影响基本结束，风力已降至安全范围，解除蓝色预警。
                  </p>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
}
