import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calculator, ArrowRight, Save, Info, AlertTriangle, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function ClaimsCalculator() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialWarningEventId = searchParams.get('warningEventId') || '';
  const initialReservoirId = searchParams.get('reservoirId') || '';

  // Input states
  const [reservoirId, setReservoirId] = useState(initialReservoirId);
  const [claimType, setClaimType] = useState('防洪');
  const [policyId, setPolicyId] = useState('POL-20240510-001');
  const [warningEventId, setWarningEventId] = useState(initialWarningEventId);

  // Manual inputs for calculation
  const [peopleRelocated, setPeopleRelocated] = useState<number>(0);
  const [peopleInjured, setPeopleInjured] = useState<number>(0);
  const [injuredAmountManual, setInjuredAmountManual] = useState<number | ''>('');
  const [injuredAdjustmentDesc, setInjuredAdjustmentDesc] = useState('');
  
  // Computed values mock based on warning level (in a real app, from backend)
  const isCalculated = !!warningEventId && !!reservoirId;

  // Constants (mocked from "snapshot")
  const H_max = 145.00; // 最高水位
  const s_j = 144.04; // 阶梯起始水位
  const e_j = 147.71; // 阶梯结束水位
  const F_j = 2000000; // 固定赔付金额
  const P_j = 30000; // 超出水位单价 (元/0.01米)
  const M_j = 13000000; // 区间累计赔付上限

  const deductiblePerAccident = 100000; // 绝对免赔额
  
  const N_r = peopleRelocated;
  const P_r = 200; // 转移安置每人每次
  const L_r_once = 500000; // 转移安置单次限额
  const L_r_year_remaining = 1500000; // 转移安置年累计剩余
  
  const N_c = peopleInjured;
  const P_c = 150000; // 人伤每人每次
  const L_c_year_remaining = 3000000; // 人伤年累计剩余

  const L_total_year_remaining = 25000000; // 保单总剩余额度
  
  // Calculate Base
  const N_j = Math.max(0, Math.floor((H_max - s_j) / 0.01));
  const A_base = Math.min(F_j + N_j * P_j, M_j);
  
  // Deductible
  const A_deducted = Math.max(A_base - deductiblePerAccident, 0);

  // Upfloat (上浮)
  const isUpfloatTriggered = true;
  const d_days = 2; // 淹没天数
  const k_factor = 1.1; // 赔付系数 110%
  const U = A_deducted * (k_factor - 1);
  const A = A_deducted + U;

  // Relocation
  const R = Math.min(N_r * P_r, L_r_once, L_r_year_remaining);
  
  // Injury
  const calculated_C = Math.min(N_c * P_c, L_c_year_remaining);
  const C = injuredAmountManual !== '' ? Number(injuredAmountManual) : calculated_C;

  // Total
  const T_raw = A + R + C;
  const T_final = Math.min(T_raw, L_total_year_remaining);

  const handleGenerateDraft = () => {
    // Navigate to records and trigger create modal
    navigate(`/risk/claims/records?action=create&warningEventId=${warningEventId}&reservoirId=${reservoirId}`);
  };

  return (
    <div className="h-full flex flex-col p-6 gap-4 fade-in duration-300 overflow-hidden">
      <header className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
             <span className="w-1.5 h-5 bg-tech-cyan rounded-sm"></span>
             <span>理赔计算器</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1 pl-4 uppercase tracking-wider font-mono">
            RISK / CLAIMS CALCULATOR
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4">
        {/* 参数区 */}
        <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-5 shrink-0">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-tech-cyan" />
            输入参数
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div className="space-y-1.5">
               <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">理赔对象 <span className="text-red-500">*</span></label>
               <select value={reservoirId} onChange={e => setReservoirId(e.target.value)} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none">
                 <option value="">请选择水库</option>
                 <option value="shanxi">珊溪水库</option>
                 <option value="qiaodun">桥墩水库</option>
                 <option value="zhaoshandu">赵山渡水库</option>
               </select>
             </div>
             <div className="space-y-1.5">
               <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">理赔类型 <span className="text-red-500">*</span></label>
               <select value={claimType} onChange={e => setClaimType(e.target.value)} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none">
                 <option value="防洪">防洪</option>
               </select>
             </div>
             <div className="space-y-1.5">
               <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">关联保单 <span className="text-red-500">*</span></label>
               <select value={policyId} onChange={e => setPolicyId(e.target.value)} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-tech-cyan outline-none font-mono">
                 <option value="POL-20240510-001">POL-20240510-001 (保障中)</option>
               </select>
             </div>
             <div className="space-y-1.5">
               <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">关联预警事件 <span className="text-red-500">*</span></label>
               <select value={warningEventId} onChange={e => setWarningEventId(e.target.value)} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-orange-400 outline-none font-mono">
                 <option value="">请选择预警事件</option>
                 <option value="EVT-001">EVT-001 (当前最高: 145.00m)</option>
               </select>
             </div>
             
             {isCalculated && (
               <>
                 <div className="space-y-1.5">
                   <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">转移安置人数 <span className="text-[#94A3B8] font-normal">(选填)</span></label>
                   <input type="number" min="0" value={peopleRelocated} onChange={e => setPeopleRelocated(Number(e.target.value))} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none font-mono" />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">人身伤亡人数 <span className="text-[#94A3B8] font-normal">(选填)</span></label>
                   <input type="number" min="0" value={peopleInjured} onChange={e => setPeopleInjured(Number(e.target.value))} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none font-mono" />
                 </div>
                 <div className="space-y-1.5 col-span-2">
                   <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">人伤赔付金额人工调整 <span className="text-[#94A3B8] font-normal">(选填)</span></label>
                   <div className="flex gap-2">
                     <input type="number" min="0" placeholder="默认系统计算" value={injuredAmountManual} onChange={e => setInjuredAmountManual(e.target.value ? Number(e.target.value) : '')} className="flex-1 bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none font-mono placeholder:text-[#475569]" />
                     <input type="text" placeholder="调整说明(必填)" value={injuredAdjustmentDesc} onChange={e => setInjuredAdjustmentDesc(e.target.value)} className="flex-[2] bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none placeholder:text-[#475569]" disabled={injuredAmountManual === ''} />
                   </div>
                 </div>
               </>
             )}
          </div>
        </div>

        {/* 计算结果与公式展示 */}
        {isCalculated ? (
          <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-5 flex flex-col gap-6">
             <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Play className="w-4 h-4 text-tech-cyan" />
                  计算结果与公式
                </h3>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 事故赔付 */}
                <div className="bg-[#0F172A] border border-[#1E293B] rounded p-4 space-y-4">
                   <h4 className="text-[11px] text-tech-cyan font-bold border-b border-[#1E293B] pb-2 flex justify-between">
                     <span>事故赔付公式</span>
                     <span className="font-mono text-white text-sm">{(A_base / 10000).toFixed(2)} 万</span>
                   </h4>
                   <div className="text-[10px] text-[#94A3B8] font-mono bg-[#0B0F17] p-2 rounded border border-[#1E293B]/50 leading-relaxed">
                     A_base = min(F_j + floor((H_max - s_j) / 0.01) × P_j, M_j)<br/>
                     <span className="text-tech-cyan">
                       A_base = min({(F_j/10000).toFixed(0)}万 + floor(({H_max.toFixed(2)} - {s_j.toFixed(2)}) / 0.01) × {(P_j/10000).toFixed(1)}万, {(M_j/10000).toFixed(0)}万)
                     </span>
                   </div>
                   <div className="grid grid-cols-2 gap-2 text-[10px]">
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">H_max (最高水位)</span><span className="text-white font-mono">{H_max.toFixed(2)}m</span></div>
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">s_j (阶梯起始)</span><span className="text-white font-mono">{s_j.toFixed(2)}m</span></div>
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">F_j (固定赔付)</span><span className="text-white font-mono">{(F_j/10000).toFixed(0)}万</span></div>
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">P_j (水位单价)</span><span className="text-white font-mono">{(P_j/10000).toFixed(1)}万</span></div>
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">M_j (阶梯上限)</span><span className="text-white font-mono">{(M_j/10000).toFixed(0)}万</span></div>
                   </div>
                   <div className="mt-2 text-[10px] font-mono">
                     <div className="flex justify-between text-[#94A3B8] pt-1">
                        <span>免赔额扣减 = max(A_base - 绝对免赔额, 0)</span>
                        <span className="text-white text-xs">{(A_deducted/10000).toFixed(2)} 万</span>
                     </div>
                   </div>
                </div>

                {/* 上浮金额 */}
                <div className="bg-[#0F172A] border border-[#1E293B] rounded p-4 space-y-4">
                   <h4 className="text-[11px] text-tech-cyan font-bold border-b border-[#1E293B] pb-2 flex justify-between">
                     <span>上浮公式</span>
                     <span className="font-mono text-white text-sm">{(A / 10000).toFixed(2)} 万</span>
                   </h4>
                   <div className="text-[10px] text-[#94A3B8] font-mono bg-[#0B0F17] p-2 rounded border border-[#1E293B]/50 leading-relaxed">
                     A = A_deducted × k(d)<br/>
                     <span className="text-tech-cyan">
                       A = {(A_deducted/10000).toFixed(2)}万 × {k_factor * 100}%
                     </span>
                   </div>
                   <div className="grid grid-cols-2 gap-2 text-[10px]">
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">触发上浮灾害</span><span className="text-orange-400">台风</span></div>
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">d (淹没时长)</span><span className="text-white font-mono">{d_days}天</span></div>
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">k (赔付系数)</span><span className="text-orange-400 font-mono">{k_factor*100}%</span></div>
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">U (上浮增量)</span><span className="text-white font-mono">{(U/10000).toFixed(2)}万</span></div>
                   </div>
                </div>

                {/* 分项 - 转移安置 */}
                <div className="bg-[#0F172A] border border-[#1E293B] rounded p-4 space-y-4">
                   <h4 className="text-[11px] text-tech-cyan font-bold border-b border-[#1E293B] pb-2 flex justify-between">
                     <span>转移安置公式</span>
                     <span className="font-mono text-white text-sm">{(R / 10000).toFixed(2)} 万</span>
                   </h4>
                   <div className="text-[10px] text-[#94A3B8] font-mono bg-[#0B0F17] p-2 rounded border border-[#1E293B]/50 leading-relaxed">
                     R = min(N_r × P_r, L_r_once, L_r_year_remaining)<br/>
                     <span className="text-tech-cyan">
                       R = min({N_r} × {P_r}, {L_r_once}, {L_r_year_remaining})
                     </span>
                   </div>
                   <div className="grid grid-cols-2 gap-2 text-[10px]">
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">N_r (转移人数)</span><span className="text-white font-mono">{N_r}人</span></div>
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">P_r (每次金额)</span><span className="text-white font-mono">{P_r}元</span></div>
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">L_r_once (单次限额)</span><span className="text-white font-mono">{(L_r_once/10000).toFixed(0)}万</span></div>
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">L_r_yr_rem (累计剩余)</span><span className="text-blue-400 font-mono">{(L_r_year_remaining/10000).toFixed(0)}万</span></div>
                   </div>
                   {N_r * P_r > L_r_once && <div className="text-[9px] text-orange-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> 分项单次限额截断</div>}
                </div>

                {/* 分项 - 人身伤亡 */}
                <div className="bg-[#0F172A] border border-[#1E293B] rounded p-4 space-y-4">
                   <h4 className="text-[11px] text-tech-cyan font-bold border-b border-[#1E293B] pb-2 flex justify-between">
                     <span>人身伤亡公式</span>
                     <span className="font-mono text-white text-sm">{(C / 10000).toFixed(2)} 万</span>
                   </h4>
                   <div className="text-[10px] text-[#94A3B8] font-mono bg-[#0B0F17] p-2 rounded border border-[#1E293B]/50 leading-relaxed">
                     {injuredAmountManual !== '' ? (
                        <>
                           C = Manual Override<br/>
                           <span className="text-orange-400">手工调整生效</span>
                        </>
                     ) : (
                        <>
                           C = min(N_c × P_c, L_c_year_remaining)<br/>
                           <span className="text-tech-cyan">
                             C = min({N_c} × {(P_c/10000).toFixed(0)}万, {(L_c_year_remaining/10000).toFixed(0)}万)
                           </span>
                        </>
                     )}
                   </div>
                   <div className="grid grid-cols-2 gap-2 text-[10px]">
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">N_c (伤亡人数)</span><span className="text-white font-mono">{N_c}人</span></div>
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">P_c (每次金额)</span><span className="text-white font-mono">{(P_c/10000).toFixed(0)}万</span></div>
                     <div className="flex justify-between border-b border-[#1E293B] pb-1"><span className="text-[#64748B]">L_c_yr_rem (累计剩余)</span><span className="text-blue-400 font-mono">{(L_c_year_remaining/10000).toFixed(0)}万</span></div>
                   </div>
                   {N_c * P_c > L_c_year_remaining && injuredAmountManual === '' && <div className="text-[9px] text-orange-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> 分项年额度截断</div>}
                </div>

                {/* 总赔付公式 */}
                <div className="bg-[#1E293B]/50 border border-tech-cyan/30 rounded p-4 space-y-4 col-span-1 lg:col-span-2 shadow-[0_0_15px_rgba(0,242,255,0.05)]">
                   <h4 className="text-[12px] text-tech-cyan font-bold border-b border-tech-cyan/20 pb-2 flex justify-between">
                     <span>总赔付公式</span>
                     <span className="font-mono text-tech-cyan text-lg">{(T_final / 10000).toFixed(2)} 万</span>
                   </h4>
                   <div className="text-[11px] text-[#94A3B8] font-mono bg-[#0B0F17] p-2.5 rounded border border-[#1E293B] leading-relaxed">
                     T_raw = A + R + C <span className="float-right">T_raw = {(T_raw/10000).toFixed(2)}万</span><br/>
                     T_final = min(T_raw, L_total_year_remaining)<br/>
                     <span className="text-white">
                       T_final = min({(T_raw/10000).toFixed(2)}万, {(L_total_year_remaining/10000).toFixed(0)}万)
                     </span>
                   </div>
                   <div className="flex justify-between items-center text-[10px]">
                     <span className="text-[#64748B]">L_total_year_remaining (保单总剩余额度): <span className="text-green-400 font-mono">{(L_total_year_remaining/10000).toFixed(0)}万</span></span>
                   </div>
                   {T_raw > L_total_year_remaining && <div className="text-[11px] text-red-400 flex items-center gap-1 bg-red-500/10 p-2 rounded"><AlertTriangle className="w-4 h-4"/> 警告: 总赔付金额超过保单剩余总限额截断 (截断金额: {((T_raw - L_total_year_remaining)/10000).toFixed(2)}万)</div>}
                </div>
             </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-[#475569] border border-dashed border-[#1E293B] rounded-lg mt-4 bg-[#111622]/50">
             <Calculator className="w-12 h-12 mb-3 opacity-20" />
             <p className="text-xs">请完整选择理赔参数以生成计算结果</p>
          </div>
        )}
      </div>

      <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-4 shrink-0 flex justify-end gap-3 mt-auto">
        <button 
          onClick={handleGenerateDraft} 
          disabled={!isCalculated}
          className="bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed font-bold px-6 py-2 rounded flex items-center gap-2 text-sm transition-colors shadow-[0_0_10px_rgba(0,242,255,0.3)]"
        >
          <Save className="w-4 h-4" />
          生成理赔草稿
        </button>
      </div>
    </div>
  );
}
