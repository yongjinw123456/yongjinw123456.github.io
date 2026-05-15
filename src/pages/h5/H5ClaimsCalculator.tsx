import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Save, Calculator, X } from 'lucide-react';

export default function H5ClaimsCalculator() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialWarningEventId = searchParams.get('warningEventId') || '';
  const initialReservoirId = searchParams.get('reservoirId') || 'shanxi';

  const [reservoirId, setReservoirId] = useState(initialReservoirId);
  const [warningEventId, setWarningEventId] = useState(initialWarningEventId);

  const [waterLevel, setWaterLevel] = useState<number>(145.00);
  const [totalDuration, setTotalDuration] = useState<number>(2);
  const [stepDurations, setStepDurations] = useState<{ id: string; name: string; range: string; duration: number }[]>([
    { id: '1', name: '阶梯1', range: '144.04-147.71', duration: 24 }
  ]);
  const [peopleRelocated, setPeopleRelocated] = useState<number>(0);
  const [peopleInjured, setPeopleInjured] = useState<number>(0);
  const [injuryAmountManual, setInjuryAmountManual] = useState<number>(0);

  // Constants
  const hitStep = "阶梯1";
  const s_j = 144.04;
  const F_j = 2000000;
  const P_j = 30000;
  const P_r = 200;

  // Limits
  const L_total_year_remaining = 25000000;

  // Calculators
  const N_j = Math.max(0, Math.floor((waterLevel - s_j) / 0.01));
  const waterLevelIncrement = N_j * P_j;
  const A_base = waterLevel < s_j ? 0 : F_j + waterLevelIncrement;
  const R = peopleRelocated * P_r;
  const C = injuryAmountManual;
  const T_raw = A_base + R + C;
  const T_final = Math.min(T_raw, L_total_year_remaining);

  const addStepDuration = () => {
    setStepDurations([...stepDurations, { id: Date.now().toString(), name: '', range: '', duration: 0 }]);
  };

  const updateStepDuration = (id: string, field: string, value: any) => {
    setStepDurations(stepDurations.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeStepDuration = (id: string) => {
    setStepDurations(stepDurations.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-black sm:bg-tech-bg relative flex items-center justify-center sm:py-6 sm:px-4">
      {/* Device preview mode hint */}
      <div className="absolute top-4 right-4 items-center gap-2 px-3 py-2.5 bg-tech-panel border border-tech-border rounded-md shadow-lg z-10 hidden sm:flex">
         <span className="text-xs text-[#64748B] uppercase font-bold tracking-wider">Device Preview Mode</span>
      </div>

      <div className="w-full h-[100dvh] sm:max-w-[400px] sm:h-[800px] sm:max-h-[90vh] bg-[#0B0F17] relative sm:overflow-hidden sm:rounded-[2rem] sm:border-[6px] sm:border-[#111622] sm:shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col shrink-0">
        <div className="bg-[#111622] sticky top-0 z-10 border-b border-[#1E293B]">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => navigate(-1)} className="text-[#94A3B8] p-1">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-tech-cyan" /> 理赔计算器
            </h1>
            <div className="w-6"></div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-[90px]">
          {/* 输入区 */}
          <div className="bg-[#111622] border border-[#1E293B] rounded-xl overflow-hidden shadow-sm">
             <div className="p-3 border-b border-[#1E293B] bg-[#0F172A]/50">
               <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-3 bg-tech-cyan rounded-sm"></span> 基本与水位参数
               </h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#94A3B8] uppercase tracking-widest">理赔对象</label>
                  <select value={reservoirId} onChange={e => setReservoirId(e.target.value)} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-sm text-white outline-none">
                    <option value="shanxi">珊溪水库</option>
                    <option value="qiaodun">桥墩水库</option>
                    <option value="zhaoshandu">赵山渡水库</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#94A3B8] uppercase tracking-widest">关联预警事件</label>
                  <select value={warningEventId} onChange={e => setWarningEventId(e.target.value)} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-sm text-orange-400 outline-none">
                    <option value="">(无关联预警)</option>
                    <option value="EVT-001">EVT-001</option>
                  </select>
                </div>
                <div className="flex gap-3">
                   <div className="space-y-1.5 flex-1">
                     <label className="text-xs text-[#94A3B8] uppercase tracking-widest">最高水位(m)</label>
                     <input type="number" step="0.01" value={waterLevel} onChange={e => setWaterLevel(Number(e.target.value))} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-sm text-white font-mono outline-none" />
                   </div>
                   <div className="space-y-1.5 flex-1">
                     <label className="text-xs text-[#94A3B8] uppercase tracking-widest">总淹没时长(h)</label>
                     <input type="number" step="0.1" value={totalDuration} onChange={e => setTotalDuration(Number(e.target.value))} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-sm text-white font-mono outline-none" />
                   </div>
                </div>

                <div className="space-y-2 mt-4 pt-4 border-t border-[#1E293B]">
                   <div className="flex justify-between items-center text-xs uppercase tracking-widest">
                     <label className="text-[#94A3B8]">各阶梯区间淹没时长</label>
                     <button onClick={addStepDuration} className="text-tech-cyan">+ 添加</button>
                   </div>
                   {stepDurations.map(step => (
                     <div key={step.id} className="flex gap-2 items-center bg-[#0F172A] p-2 rounded border border-[#1E293B]">
                       <input type="text" placeholder="阶梯" value={step.name} onChange={e => updateStepDuration(step.id, 'name', e.target.value)} className="w-12 bg-transparent border-b border-[#334155] text-sm text-white outline-none px-1 py-1" />
                       <input type="text" placeholder="范围" value={step.range} onChange={e => updateStepDuration(step.id, 'range', e.target.value)} className="flex-1 bg-transparent border-b border-[#334155] text-sm text-white outline-none px-1 py-1" />
                       <input type="number" value={step.duration} onChange={e => updateStepDuration(step.id, 'duration', Number(e.target.value))} className="w-12 bg-transparent border-b border-[#334155] text-sm text-white outline-none px-1 py-1 font-mono text-center" />
                       <span className="text-xs text-[#64748B]">h</span>
                       <button onClick={() => removeStepDuration(step.id)} className="text-[#64748B] hover:text-red-400"><X className="w-5 h-5" /></button>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="bg-[#111622] border border-[#1E293B] rounded-xl overflow-hidden shadow-sm">
             <div className="p-3 border-b border-[#1E293B] bg-[#0F172A]/50 flex gap-2 items-center">
               <span className="w-1 h-3 bg-orange-500 rounded-sm"></span> 
               <h3 className="text-sm font-bold text-white">转移与伤亡参数</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="flex gap-3">
                   <div className="space-y-1.5 flex-1">
                     <label className="text-xs text-[#94A3B8]">安置人数 N_r</label>
                     <input type="number" value={peopleRelocated} onChange={e => setPeopleRelocated(Number(e.target.value))} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-sm text-white outline-none" />
                   </div>
                   <div className="space-y-1.5 flex-1">
                     <label className="text-xs text-[#94A3B8]">安置费单价 P_r</label>
                     <div className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-sm text-white font-mono outline-none opacity-80">¥200</div>
                   </div>
                </div>
                <div className="flex gap-3">
                   <div className="space-y-1.5 flex-1">
                     <label className="text-xs text-[#94A3B8]">伤亡人数 N_c</label>
                     <input type="number" value={peopleInjured} onChange={e => setPeopleInjured(Number(e.target.value))} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-sm text-white outline-none" />
                   </div>
                   <div className="space-y-1.5 flex-1">
                     <label className="text-xs text-[#94A3B8]">伤亡总赔付额 C</label>
                     <input type="number" value={injuryAmountManual || ''} onChange={e => setInjuryAmountManual(Number(e.target.value))} placeholder="金额" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-sm text-white font-mono outline-none" />
                   </div>
                </div>
             </div>
          </div>

          {/* 结果区 */}
          <div className="bg-tech-cyan/5 border border-tech-cyan/20 rounded-xl overflow-hidden">
             <div className="p-4 space-y-3">
               <div className="flex justify-between items-center border-b border-tech-cyan/10 pb-3">
                 <span className="text-sm text-[#94A3B8]">基础赔付 (A_base)</span>
                 <span className="text-base font-mono text-blue-400 font-bold">¥{A_base.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center border-b border-tech-cyan/10 pb-3">
                 <span className="text-sm text-[#94A3B8]">转移安置 (R)</span>
                 <span className="text-base font-mono text-orange-400 font-bold">¥{R.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center border-b border-tech-cyan/10 pb-3">
                 <span className="text-sm text-[#94A3B8]">人身伤亡 (C)</span>
                 <span className="text-base font-mono text-red-400 font-bold">¥{C.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center pt-1">
                 <span className="text-base text-white font-bold">预估赔付总额</span>
                 <span className="text-2xl font-mono text-tech-cyan font-bold drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]">
                   ¥{T_final.toLocaleString()}
                 </span>
               </div>
             </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#0F172A]/90 backdrop-blur border-t border-[#1E293B] z-20">
          <button 
            onClick={() => {
               // 模拟暂存草稿，然后退回，或者跳转页面
               navigate('/h5/events');
            }}
            className="w-full bg-tech-cyan text-[#0B0F17] py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,242,255,0.3)] transition-all active:scale-95"
          >
            <Save className="w-5 h-5" /> 暂存理赔评估草稿
          </button>
        </div>
      </div>
    </div>
  );
}
