import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calculator, ArrowRight, Save, Info, AlertTriangle, Play, X } from 'lucide-react';
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
  // (Moved below)
  
  // Computed values mock based on warning level (in a real app, from backend)

  // Left side state
  const [waterLevel, setWaterLevel] = useState<number>(145.00);
  const [totalDuration, setTotalDuration] = useState<number>(2);
  const [stepDurations, setStepDurations] = useState<{ id: string; name: string; range: string; duration: number }[]>([
    { id: '1', name: '阶梯1', range: '144.04 - 147.71', duration: 24 }
  ]);
  const [peopleRelocated, setPeopleRelocated] = useState<number>(0);
  const [peopleInjured, setPeopleInjured] = useState<number>(0);
  const [injuryAmountManual, setInjuryAmountManual] = useState<number>(0);

  // Readonly params for steps
  const hitStep = "阶梯1";
  const s_j = 144.04;
  const e_j = 147.71;
  const F_j = 2000000;
  const P_j = 30000;
  const P_r = 200;

  // Limits
  const M_j = 13000000; // 阶梯累计赔付上限, not explicitly required but implied
  const L_total_limit = 30000000; // 总限额
  const L_total_used = 5000000; // 已使用总额度
  const L_total_year_remaining = L_total_limit - L_total_used;
  
  const L_r_limit = 5000000; // 转移限额
  const L_r_used = 1000000; // 转移已使用
  const L_r_year_remaining = L_r_limit - L_r_used;

  const L_c_limit = 8000000; // 人伤限额
  const L_c_used = 0; // 人伤已使用
  const L_c_year_remaining = L_c_limit - L_c_used;

  // Calculate Base
  const N_j = Math.max(0, Math.floor((waterLevel - s_j) / 0.01));
  const waterLevelIncrement = N_j * P_j;
  const A_base = waterLevel < s_j ? 0 : F_j + waterLevelIncrement;
  
  // Relocation
  const R = peopleRelocated * P_r;
  
  // Injury
  const C = injuryAmountManual;

  // Total
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

  const handleGenerateDraft = () => {
    // Navigate to records and trigger create modal
    navigate(`/risk/claims/records?action=create&warningEventId=${warningEventId}&reservoirId=${reservoirId}`, {
      state: {
        accidentAmountManual: A_base,
        upfloatAmount: 0,
        relocationAmountManual: R,
        injuryAmountManual: C,
        totalAmountManual: T_final
      }
    });
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
          {/* Left: Input Params */}
          <div className="space-y-6">
              {/* 预警与水位参数 */}
              <div className="bg-[#1A2035] rounded-xl border border-[#2A344A] p-6 space-y-5 shadow-lg">
                <h4 className="text-sm font-bold text-white border-b border-[#2A344A] pb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-tech-cyan rounded-sm"></span>预警与水位参数
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 col-span-2 md:col-span-1">
                    <label className="text-[10px] text-[#94A3B8] uppercase tracking-widest">理赔对象</label>
                    <select value={reservoirId} onChange={e => setReservoirId(e.target.value)} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none">
                      <option value="shanxi">珊溪水库</option>
                      <option value="qiaodun">桥墩水库</option>
                      <option value="zhaoshandu">赵山渡水库</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 col-span-2 md:col-span-1">
                    <label className="text-[10px] text-[#94A3B8] uppercase tracking-widest">理赔类型</label>
                    <select value={claimType} onChange={e => setClaimType(e.target.value)} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none">
                      <option value="防洪">防洪理赔</option>
                      <option value="干旱">干旱理赔</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 col-span-2 md:col-span-1">
                    <label className="text-[10px] text-[#94A3B8] uppercase tracking-widest">关联保单</label>
                    <select className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-tech-cyan font-mono outline-none appearance-none focus:border-tech-cyan transition-colors">
                      <option value="POL-20240510-001">POL-20240510-001 (保障中)</option>
                      <option value="POL-20230510-002">POL-20230510-002 (保障中)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[10px] text-[#94A3B8] uppercase tracking-widest">关联预警事件 <span className="text-red-500">*</span></label>
                    <select value={warningEventId} onChange={e => setWarningEventId(e.target.value)} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-orange-400 font-mono outline-none">
                      <option value="">请选择预警事件</option>
                      <option value="EVT-001">EVT-001</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 col-span-2 md:col-span-1">
                    <label className="text-[10px] text-[#94A3B8] uppercase tracking-widest">最高水位 H_max (米)</label>
                    <input type="number" step="0.01" value={waterLevel} onChange={e => setWaterLevel(Number(e.target.value))} className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded px-3 py-2 text-xs text-white font-mono outline-none transition-colors" />
                  </div>
                  <div className="space-y-1.5 col-span-2 md:col-span-1">
                    <label className="text-[10px] text-[#94A3B8] uppercase tracking-widest">总淹没时长 (小时)</label>
                    <input type="number" step="0.1" value={totalDuration} onChange={e => setTotalDuration(Number(e.target.value))} className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded px-3 py-2 text-xs text-white font-mono outline-none transition-colors" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                      <label className="text-[#94A3B8]">各阶梯区间淹没时长 <span className="text-[#64748B] normal-case tracking-normal">(选填记录用，自动从预警事件中读取，不参与计算)</span></label>
                    </div>
                    {stepDurations.map((step) => (
                      <div key={step.id} className="flex gap-2 items-center bg-[#0F172A] p-2 rounded border border-[#1E293B] cursor-not-allowed opacity-80">
                        <input type="text" readOnly value={step.name} className="flex-1 min-w-[70px] bg-transparent border-b border-transparent text-xs text-white outline-none px-1 py-0.5 cursor-not-allowed" />
                        <input type="text" readOnly value={step.range} className="flex-[1.5] min-w-[100px] bg-transparent border-b border-transparent text-xs text-white outline-none px-1 py-0.5 cursor-not-allowed text-center" />
                        <div className="flex items-center gap-1">
                          <input type="number" readOnly value={step.duration} className="w-16 bg-transparent text-xs text-white outline-none px-1 py-0.5 font-mono text-right cursor-not-allowed" />
                          <span className="text-[10px] text-[#64748B]">时</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 基础赔付参数 */}
              <div className="bg-[#1A2035] rounded-xl border border-[#2A344A] p-6 space-y-4 shadow-lg">
                <h4 className="text-sm font-bold text-white border-b border-[#2A344A] pb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-500 rounded-sm"></span>基础赔付参数 <span className="text-[10px] font-normal text-[#64748B] ml-2">(保单读取快照)</span>
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[#64748B] block">命中阶梯</span>
                    <span className="text-white bg-[#0F172A] px-2 py-1 rounded inline-block border border-[#1E293B]">{hitStep}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#64748B] block">阶梯起始水位 s_j (m)</span>
                    <span className="font-mono text-white block bg-[#0F172A] px-2 py-1 rounded border border-[#1E293B]">{s_j.toFixed(2)}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#64748B] block">阶梯结束水位 e_j (m)</span>
                    <span className="font-mono text-white block bg-[#0F172A] px-2 py-1 rounded border border-[#1E293B]">{e_j.toFixed(2)}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#64748B] block">固定赔付金额 F_j (元)</span>
                    <span className="font-mono text-blue-400 block bg-[#0F172A] px-2 py-1 rounded border border-[#1E293B]">¥{F_j.toLocaleString()}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#64748B] block">超出水位步数 N_j</span>
                    <span className="font-mono text-white block bg-[#0F172A] px-2 py-1 rounded border border-[#1E293B]">{N_j} 步</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#64748B] block">超出水位单价 P_j</span>
                    <span className="font-mono text-white block bg-[#0F172A] px-2 py-1 rounded border border-[#1E293B]">¥{P_j.toLocaleString()}/0.01m</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#64748B] block">区间累计赔付上限 M_j</span>
                    <span className="font-mono text-white block bg-[#0F172A] px-2 py-1 rounded border border-[#1E293B]">¥{M_j.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* 转移安置与人伤参数 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1A2035] rounded-xl border border-[#2A344A] p-6 space-y-4 shadow-lg shrink-0">
                  <h4 className="text-sm font-bold text-white border-b border-[#2A344A] pb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-orange-500 rounded-sm"></span>转移安置参数
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#94A3B8] block">转移安置人数 N_r</label>
                      <input type="number" min="0" value={peopleRelocated} onChange={e => setPeopleRelocated(Number(e.target.value))} className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded px-3 py-2 text-sm text-white outline-none font-mono transition-colors" />
                    </div>
                    <div className="flex justify-between items-center bg-[#0F172A] border border-[#1E293B] px-3 py-2 rounded">
                       <span className="text-xs text-[#64748B]">转移安置费 P_r / 人</span>
                       <span className="text-xs font-mono text-white">¥{P_r}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#1A2035] rounded-xl border border-[#2A344A] p-6 space-y-4 shadow-lg shrink-0">
                  <h4 className="text-sm font-bold text-white border-b border-[#2A344A] pb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-red-500 rounded-sm"></span>人身伤亡参数
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#94A3B8] block">人身伤亡人数 N_c</label>
                      <input type="number" min="0" value={peopleInjured} onChange={e => setPeopleInjured(Number(e.target.value))} className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded px-3 py-2 text-sm text-white outline-none font-mono transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#94A3B8] block">人身伤亡总赔付额 C</label>
                      <input type="number" min="0" value={injuryAmountManual || ''} onChange={e => setInjuryAmountManual(Number(e.target.value))} placeholder="请输入金额" className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded px-3 py-2 text-sm text-white outline-none font-mono transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Results Cards */}
            <div className="space-y-6 flex flex-col relative">
               <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none z-0">
                 <Calculator className="w-96 h-96" />
               </div>

               {/* 基础赔付结果卡 */}
               <div className="bg-[#1A2035]/80 backdrop-blur-md rounded-xl border border-[#2A344A] shadow-[0_4px_20px_rgba(0,0,0,0.4)] overflow-hidden relative z-10 transition-all hover:border-blue-500/30 group">
                 <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-transparent"></div>
                 <div className="p-5">
                   <h4 className="text-sm font-bold text-white mb-4 textShadow">基础赔付分析</h4>
                   <div className="flex justify-between items-baseline mb-4">
                     <span className="text-[#94A3B8] text-xs flex flex-col">
                        <span>基础赔付金额 (A_base)</span>
                     </span>
                     <span className="text-2xl font-mono text-blue-400 font-bold tracking-tight">¥{A_base.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-baseline mb-4 pt-2 border-t border-[#2A344A]">
                     <span className="text-[#94A3B8] text-xs">每次事故绝对免赔额</span>
                     <span className="text-sm font-mono text-white font-bold">¥50,000</span>
                   </div>
                   <div className="flex justify-between items-baseline mb-4 pt-2 border-t border-[#2A344A]">
                     <span className="text-tech-cyan text-xs">免赔后事故金额</span>
                     <span className="text-xl font-mono text-tech-cyan font-bold tracking-tight">¥{Math.max(0, A_base - 50000).toLocaleString()}</span>
                   </div>
                   <div className="text-[10px] font-mono text-[#64748B] bg-[#0F172A] p-2 rounded border border-[#1E293B] leading-relaxed mb-4">
                     公式: A_base = F_j + floor((H_max - s_j) / 0.01) × P_j<br/>
                     计算: ¥{F_j.toLocaleString()} + {N_j} × ¥{P_j.toLocaleString()}
                   </div>
                   <div className="flex justify-between items-center text-xs border-t border-[#2A344A] pt-4">
                     <span className="text-[#64748B]">阶梯总赔付限额 M_j</span>
                     <span className="font-mono text-white">¥{M_j.toLocaleString()}</span>
                   </div>
                 </div>
               </div>

               {/* 分项结果卡组 */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                 {/* 转移安置 */}
                 <div className="bg-[#1A2035]/80 backdrop-blur-md rounded-xl border border-[#2A344A] shadow-[0_4px_20px_rgba(0,0,0,0.4)] p-5 hover:border-orange-500/30 transition-all">
                   <div className="flex justify-between items-center mb-4">
                     <h4 className="text-sm font-bold text-white">转移安置费</h4>
                     <span className="text-lg font-mono text-orange-400 font-bold">¥{R.toLocaleString()}</span>
                   </div>
                   <div className="space-y-2 text-xs border-t border-[#2A344A] pt-3">
                     <div className="flex justify-between items-center">
                       <span className="text-[#64748B]">转移安置分项限额</span>
                       <span className="font-mono text-white">¥{L_r_limit.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between items-center">
                       <span className="text-[#64748B]">剩余转移安置额度</span>
                       <span className="font-mono text-white">¥{L_r_year_remaining.toLocaleString()}</span>
                     </div>
                   </div>
                 </div>

                 {/* 人身伤亡 */}
                 <div className="bg-[#1A2035]/80 backdrop-blur-md rounded-xl border border-[#2A344A] shadow-[0_4px_20px_rgba(0,0,0,0.4)] p-5 hover:border-red-500/30 transition-all">
                   <div className="flex justify-between items-center mb-4">
                     <h4 className="text-sm font-bold text-white">人身伤亡赔付</h4>
                     <span className="text-lg font-mono text-red-400 font-bold">¥{C.toLocaleString()}</span>
                   </div>
                   <div className="space-y-2 text-xs border-t border-[#2A344A] pt-3">
                     <div className="flex justify-between items-center">
                       <span className="text-[#64748B]">人身伤亡分项限额</span>
                       <span className="font-mono text-white">¥{L_c_limit.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between items-center">
                       <span className="text-[#64748B]">剩余人身伤亡额度</span>
                       <span className="font-mono text-white">¥{L_c_year_remaining.toLocaleString()}</span>
                     </div>
                   </div>
                 </div>
               </div>

               {/* 总赔付结果卡 */}
               <div className="bg-gradient-to-br from-[#12192B] to-[#0A0E17] rounded-xl border border-tech-cyan/30 shadow-[0_0_30px_rgba(0,242,255,0.05)] relative z-10 overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tech-cyan via-blue-500 to-purple-500"></div>
                 <div className="p-6">
                   <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                     <Play className="w-4 h-4 text-tech-cyan" /> 最终核算结论
                   </h4>
                   <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
                        <span className="text-xs text-[#64748B] block mb-1">原始汇总值 (T_raw)</span>
                        <span className="text-xl font-mono text-white">¥{T_raw.toLocaleString()}</span>
                      </div>
                      <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
                        <span className="text-xs text-[#64748B] block mb-1">保单剩余总额度</span>
                        <span className="text-xl font-mono text-green-400">¥{L_total_year_remaining.toLocaleString()}</span>
                      </div>
                   </div>
                   
                   <div className="flex flex-col items-end pt-4 border-t border-[#2A344A]">
                      <span className="text-xs text-[#94A3B8] mb-1">最终总赔付金额 (T_final)</span>
                      <span className="text-5xl font-mono text-tech-cyan font-bold tracking-tighter drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]">
                        ¥{T_final.toLocaleString()}
                      </span>
                      {T_raw > L_total_year_remaining && (
                        <span className="text-[10px] text-red-400 mt-2 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> 超出保单剩余额度，已按剩余额度截断
                        </span>
                      )}
                   </div>
                 </div>
                 <div className="bg-[#0F172A]/50 px-6 py-3 border-t border-[#2A344A] text-[10px] text-[#64748B] flex justify-between">
                   <span>保单总限额: ¥{L_total_limit.toLocaleString()}</span>
                   <span>已使用额度: ¥{L_total_used.toLocaleString()}</span>
                 </div>
               </div>

               {/* 计算说明 */}
               <div className="bg-[#1A2035]/50 border border-[#2A344A] p-4 rounded-xl relative z-10 text-xs">
                 <h5 className="font-bold text-[#94A3B8] mb-2">计算规则说明</h5>
                 <ul className="list-disc list-inside text-[#64748B] space-y-1.5 leading-relaxed">
                   <li>最终赔付金额 <code className="bg-[#0F172A] px-1 rounded">T_final = min(A_base + R + C, 保单剩余总额度)</code>。</li>
                 </ul>
               </div>

            </div>
          </div>
      </div>

      <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-4 shrink-0 flex justify-end gap-3 mt-auto">
        <button 
          onClick={handleGenerateDraft} 
          disabled={!reservoirId}
          className="bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed font-bold px-6 py-2 rounded flex items-center gap-2 text-sm transition-colors shadow-[0_0_10px_rgba(0,242,255,0.3)]"
        >
          <Save className="w-4 h-4" />
          生成理赔草稿
        </button>
      </div>
    </div>
  );
}
