const fs = require('fs');

let code = fs.readFileSync('src/pages/business/ReservoirManagement.tsx', 'utf8');

// Imports
code = code.replace(
  "import { Search, Plus, MapPin, AlertTriangle, ShieldCheck, FileText, X, Edit, Eye, ChevronRight } from 'lucide-react';",
  "import { Search, Plus, MapPin, AlertTriangle, ShieldCheck, FileText, X, Edit, Eye, ChevronRight, Droplets, History, Clock } from 'lucide-react';"
);

// State
let stateInsert = `
  const [isInsuranceDrawerOpen, setIsInsuranceDrawerOpen] = useState(false);
  const [isWaterLevelDrawerOpen, setIsWaterLevelDrawerOpen] = useState(false);
  const [wlTab, setWlTab] = useState<'add'|'history'>('add');
`;

code = code.replace(
  "const [activeRecord, setActiveRecord] = useState<ReservoirRecord | null>(null);",
  "const [activeRecord, setActiveRecord] = useState<ReservoirRecord | null>(null);\n" + stateInsert
);

// Buttons
let buttonsInsert = `
                   <div className="flex gap-2">
                     <button 
                       onClick={() => { setActiveRecord(row); setIsInsuranceDrawerOpen(true); }}
                       className={cn("flex items-center justify-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs font-medium w-fit", row.insuranceStatus === '保障中' ? "bg-tech-cyan/10 text-tech-cyan border border-tech-cyan/20 hover:bg-tech-cyan/20" : "bg-[#1E293B] text-[#475569] cursor-not-allowed")} 
                       disabled={row.insuranceStatus !== '保障中'}
                     >
                       <ShieldCheck className="w-3.5 h-3.5" />
                       保险方案
                     </button>
                     <button 
                       onClick={() => { setActiveRecord(row); setIsWaterLevelDrawerOpen(true); }}
                       className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs font-medium w-fit bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20"
                     >
                       <Droplets className="w-3.5 h-3.5" />
                       水位填报
                     </button>
                   </div>
`;

code = code.replace(
  /<button[\s\S]*?<ShieldCheck className="w-3\.5 h-3\.5"\s*\/>\s*保险方案\s*<\/button>/,
  buttonsInsert.trim()
);

// Drawers
let drawersInsert = `
      {/* Insurance Drawer */}
      <AnimatePresence>
        {isInsuranceDrawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsInsuranceDrawerOpen(false)} className="fixed inset-0 bg-[#0B0F17]/80 backdrop-blur-sm z-40" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-[480px] bg-[#111622] border-l border-[#1E293B] shadow-[0_0_40px_rgba(0,0,0,0.8)] z-50 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-[#1E293B] bg-[#0F172A]">
                 <h3 className="text-sm font-bold text-white flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-tech-cyan" /> 保险详情 - {activeRecord?.name}</h3>
                 <button onClick={() => setIsInsuranceDrawerOpen(false)} className="p-1 text-[#64748B] hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 {/* Mocking insurance data per requirements */}
                 <div className="space-y-4">
                    <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2">基础信息</h4>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div><span className="text-[#94A3B8]">承保公司：</span><span className="text-white">太平洋财产保险</span></div>
                      <div><span className="text-[#94A3B8]">业务员：</span><span className="text-white">孙七 13500005555</span></div>
                      <div><span className="text-[#94A3B8]">理赔专员：</span><span className="text-white">周八 13400006666</span></div>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2">阶梯赔付配置</h4>
                    <table className="w-full text-left bg-[#0F172A] border border-[#1E293B] rounded">
                      <thead><tr className="text-[10px] text-[#64748B] border-b border-[#1E293B]"><th className="px-3 py-2">阶梯名称</th><th className="px-3 py-2">水位(m)</th><th className="px-3 py-2">固定金额(元)</th></tr></thead>
                      <tbody className="text-xs text-white divide-y divide-[#1E293B]">
                        <tr><td className="px-3 py-2">一级赔付</td><td className="px-3 py-2 font-mono">142~144</td><td className="px-3 py-2 text-orange-400 font-mono">400,000</td></tr>
                        <tr><td className="px-3 py-2">二级赔付</td><td className="px-3 py-2 font-mono">144~147</td><td className="px-3 py-2 text-orange-400 font-mono">2,000,000</td></tr>
                      </tbody>
                    </table>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Water Level Reporter Drawer */}
      <AnimatePresence>
        {isWaterLevelDrawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsWaterLevelDrawerOpen(false)} className="fixed inset-0 bg-[#0B0F17]/80 backdrop-blur-sm z-40" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-[480px] bg-[#111622] border-l border-[#1E293B] shadow-[0_0_40px_rgba(0,0,0,0.8)] z-50 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-[#1E293B] bg-[#0F172A]">
                 <h3 className="text-sm font-bold text-white flex items-center gap-2"><Droplets className="w-4 h-4 text-blue-400" /> 水位填报 - {activeRecord?.name}</h3>
                 <button onClick={() => setIsWaterLevelDrawerOpen(false)} className="p-1 text-[#64748B] hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex gap-4 px-6 pt-4 bg-[#0F172A] border-b border-[#1E293B]">
                 <button onClick={() => setWlTab('add')} className={cn("pb-2 text-xs font-bold border-b-2 transition-colors", wlTab === 'add' ? "border-tech-cyan text-tech-cyan" : "border-transparent text-[#64748B] hover:text-white")}>新增水位</button>
                 <button onClick={() => setWlTab('history')} className={cn("pb-2 text-xs font-bold border-b-2 transition-colors", wlTab === 'history' ? "border-tech-cyan text-tech-cyan" : "border-transparent text-[#64748B] hover:text-white")}>历史水位</button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 {wlTab === 'add' ? (
                   <div className="space-y-4">
                     <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded mb-4 flex gap-2"><AlertTriangle className="shrink-0 w-4 h-4" />注意：该功能仅在未关联水位监测设备的情况下使用。否则无法直接创建或修改水位。</div>
                     <div className="space-y-1.5"><label className="text-xs text-[#94A3B8]">采集时间</label><input type="datetime-local" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none focus:border-tech-cyan" /></div>
                     <div className="space-y-1.5"><label className="text-xs text-[#94A3B8]">当前水位 (m)</label><input type="number" step="0.01" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white font-mono outline-none focus:border-tech-cyan" placeholder="如 123.45" /></div>
                     <button onClick={() => setIsWaterLevelDrawerOpen(false)} className="mt-4 px-4 py-2 rounded text-xs font-bold bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 w-full">确认提交</button>
                   </div>
                 ) : (
                   <div className="space-y-4">
                      <table className="w-full text-left bg-[#0F172A] border border-[#1E293B] rounded">
                        <thead><tr className="text-[10px] text-[#64748B] border-b border-[#1E293B]"><th className="px-3 py-2">时间</th><th className="px-3 py-2">水位(m)</th><th className="px-3 py-2">操作人</th><th className="px-3 py-2 text-right">操作</th></tr></thead>
                        <tbody className="text-xs text-white divide-y divide-[#1E293B]">
                          <tr><td className="px-3 py-2">2024-05-12 14:00</td><td className="px-3 py-2 font-mono">142.50</td><td className="px-3 py-2">Admin</td><td className="px-3 py-2 text-right text-tech-cyan cursor-pointer">修改</td></tr>
                          <tr><td className="px-3 py-2">2024-05-12 13:00</td><td className="px-3 py-2 font-mono">142.45</td><td className="px-3 py-2">Admin</td><td className="px-3 py-2 text-right text-tech-cyan cursor-pointer">修改</td></tr>
                        </tbody>
                      </table>
                   </div>
                 )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
`;

code = code.replace(
  "</AnimatePresence>\n\n    </div>",
  "</AnimatePresence>\n" + drawersInsert + "\n    </div>"
);

fs.writeFileSync('src/pages/business/ReservoirManagement.tsx', code, 'utf8');
