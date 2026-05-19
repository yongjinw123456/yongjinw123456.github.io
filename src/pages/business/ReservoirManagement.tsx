import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MapPin, AlertTriangle, ShieldCheck, FileText, X, Edit, Eye, ChevronRight, Droplets, History, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type ReservoirRecord = {
  id: string;
  name: string;
  location: string;
  insuranceStatus: '未承保' | '未生效' | '保障中' | '已过保';
  currentLevel: number | null;
  warningStatus: '正常' | '黄色预警' | '橙色预警' | '红色预警';
  lastMonitorTime: string | null;
};

const MOCK_LIST: ReservoirRecord[] = [
  { id: '1', name: '珊溪水库', location: '浙江省温州市文成县珊溪镇', insuranceStatus: '保障中', currentLevel: 142.50, warningStatus: '橙色预警', lastMonitorTime: '2024-05-12 14:00' },
  { id: '2', name: '桥墩水库', location: '浙江省温州市苍南县桥墩镇', insuranceStatus: '保障中', currentLevel: 34.20, warningStatus: '红色预警', lastMonitorTime: '2024-05-12 14:15' },
  { id: '3', name: '赵山渡水库', location: '浙江省温州市瑞安市高楼镇', insuranceStatus: '已过保', currentLevel: 20.10, warningStatus: '正常', lastMonitorTime: '2024-05-12 13:50' },
  { id: '4', name: '泽雅水库', location: '浙江省温州市瓯海区泽雅镇', insuranceStatus: '未生效', currentLevel: 56.40, warningStatus: '正常', lastMonitorTime: '2024-05-12 13:30' },
  { id: '5', name: '百丈漈水库', location: '浙江省温州市文成县百丈漈镇', insuranceStatus: '未承保', currentLevel: null, warningStatus: '正常', lastMonitorTime: null },
];

export default function ReservoirManagement() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit' | 'view'>('create');
  const [activeRecord, setActiveRecord] = useState<ReservoirRecord | null>(null);

  const [isInsuranceDrawerOpen, setIsInsuranceDrawerOpen] = useState(false);
  const [isWaterLevelDrawerOpen, setIsWaterLevelDrawerOpen] = useState(false);
  const [wlTab, setWlTab] = useState<'add'|'history'>('add');


  const openDrawer = (mode: 'create' | 'edit' | 'view', record?: ReservoirRecord) => {
    setDrawerMode(mode);
    setActiveRecord(record || null);
    setIsDrawerOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '保障中': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case '未承保': return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
      case '已过保': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case '未生效': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case '正常': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case '黄色预警': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case '橙色预警': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case '红色预警': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="h-full flex flex-col p-6 gap-4 fade-in duration-300">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
             <span className="w-1.5 h-5 bg-tech-cyan rounded-sm"></span>
             <span>水库标的管理</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1 pl-4 uppercase tracking-wider font-mono">
            BUSINESS / RESERVOIR MANAGEMENT
          </p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => openDrawer('create')}
             className="bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 font-bold px-4 py-2 rounded flex items-center gap-2 text-sm transition-colors shadow-[0_0_10px_rgba(0,242,255,0.3)]"
           >
             <Plus className="w-4 h-4" />
             新增水库标的
           </button>
        </div>
      </header>

      {/* Filter Section */}
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between shrink-0 bg-[#111622] p-4 rounded-xl border border-[#1E293B]">
        <div className="flex gap-4 items-center shrink-0">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input 
              type="text" 
              placeholder="搜索水库名称..." 
              className="w-full bg-[#0F172A] border border-[#1E293B] rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-tech-cyan transition-colors"
            />
          </div>
          <select className="bg-[#0F172A] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-tech-cyan transition-colors">
            <option value="">全部状态</option>
            <option value="保障中">保障中</option>
            <option value="已过保">已过保</option>
            <option value="未承保">未承保</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
           {MOCK_LIST.map((row) => (
             <div key={row.id} className="bg-[#111622] border border-[#1E293B] rounded-xl overflow-hidden hover:border-[#334155] transition-all group flex flex-col">
               <div className="p-4 flex-1">
                 <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-2">
                     <h3 className="font-bold text-white text-base">{row.name}</h3>
                     <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest", getStatusColor(row.insuranceStatus))}>
                       {row.insuranceStatus}
                     </span>
                   </div>
                 </div>
                 
                 <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate" title={row.location}>{row.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#1E293B]">
                       <div>
                         <span className="text-[10px] text-[#64748B] uppercase tracking-widest block mb-1">当前水位</span>
                         <div className="flex items-baseline gap-1">
                           <span className="text-xl font-bold font-mono text-white">{row.currentLevel ? row.currentLevel.toFixed(2) : '--'}</span>
                           {row.currentLevel && <span className="text-xs text-[#64748B]">m</span>}
                         </div>
                       </div>
                       <div>
                         <span className="text-[10px] text-[#64748B] uppercase tracking-widest block mb-1">预警状态</span>
                         <div className="flex items-center gap-1.5 mt-1.5">
                            <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold border", getStatusColor(row.warningStatus))}>{row.warningStatus}</span>
                         </div>
                       </div>
                    </div>
                 </div>
               </div>

               <div className="bg-[#0F172A] p-3 flex items-center justify-between border-t border-[#1E293B] shrink-0">
                  <div className="text-[10px] text-[#64748B] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    更新: {row.lastMonitorTime || '--'}
                  </div>
                  
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

                  <div className="flex items-center gap-1">
                     <button 
                       onClick={() => openDrawer('view', row)}
                       className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="基本信息"
                     >
                       <Eye className="w-4 h-4" />
                     </button>
                     <button 
                       onClick={() => openDrawer('edit', row)}
                       className="p-1.5 text-[#64748B] hover:text-tech-cyan hover:bg-[#1E293B] rounded transition-colors" title="编辑"
                     >
                       <Edit className="w-4 h-4" />
                     </button>
                  </div>
               </div>
             </div>
           ))}
          </div>
        </div>

        <div className="shrink-0 p-3 bg-[#111622] border border-[#1E293B] rounded-lg flex items-center justify-between text-xs text-[#64748B]">
          <span>共 <strong className="text-white font-mono">5</strong> 条记录</span>
          <div className="flex items-center gap-1">
             <button className="px-2 py-1 border border-[#1E293B] rounded hover:bg-[#1E293B] hover:text-white transition-colors disabled:opacity-50">上一页</button>
             <button className="px-2 py-1 bg-[#1E293B] border border-[#1E293B] text-tech-cyan rounded font-mono">1</button>
             <button className="px-2 py-1 border border-[#1E293B] rounded hover:bg-[#1E293B] hover:text-white transition-colors disabled:opacity-50">下一页</button>
          </div>
        </div>

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-[#0B0F17]/80 backdrop-blur-sm z-40" 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[480px] bg-[#111622] border-l border-[#1E293B] shadow-[0_0_40px_rgba(0,0,0,0.8)] z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#1E293B] bg-[#0F172A]">
                 <h3 className="text-sm font-bold text-white flex items-center gap-2">
                   {drawerMode === 'create' ? <Plus className="w-4 h-4 text-tech-cyan" /> : drawerMode === 'edit' ? <Edit className="w-4 h-4 text-tech-cyan"/> : <FileText className="w-4 h-4 text-tech-cyan"/>}
                   {drawerMode === 'create' ? '新建水库标的' : drawerMode === 'edit' ? '编辑水库标的' : '水库标的基本信息'}
                 </h3>
                 <button onClick={() => setIsDrawerOpen(false)} className="p-1 text-[#64748B] hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 {/* 基础信息 */}
                 <div className="space-y-4">
                    <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2">基础信息</h4>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-[#94A3B8]">水库名称 <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        disabled={drawerMode === 'view'}
                        defaultValue={activeRecord?.name} 
                        className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60 disabled:cursor-not-allowed" 
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-[#94A3B8]">省市区 <span className="text-red-500">*</span></label>
                      <select disabled={drawerMode === 'view'} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60">
                         <option>浙江省 - 温州市 - 苍南县</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-[#94A3B8]">具体地址 <span className="text-red-500">*</span></label>
                      <textarea 
                        disabled={drawerMode === 'view'}
                        rows={2} 
                        defaultValue={activeRecord?.location}
                        className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded px-3 py-2 text-xs text-white outline-none resize-none disabled:opacity-60 disabled:cursor-not-allowed" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-[#94A3B8]">经纬度 <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input 
                            type="text" 
                            disabled={drawerMode === 'view'}
                            defaultValue="120.456123, 27.654321"
                            className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded pl-3 pr-8 py-2 text-xs text-white font-mono outline-none disabled:opacity-60" 
                          />
                          <MapPin className="w-4 h-4 text-tech-cyan absolute right-2 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>
                 </div>

                 {/* 相关单位 */}
                 <div className="space-y-4">
                    <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2">相关单位</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-[#94A3B8]">业主单位名称 <span className="text-red-500">*</span></label>
                        <input type="text" disabled={drawerMode === 'view'} defaultValue="苍南县水务集团" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-[#94A3B8]">业主联系人 <span className="text-red-500">*</span></label>
                        <input type="text" disabled={drawerMode === 'view'} defaultValue="张明" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-[#94A3B8]">业主联系电话 <span className="text-red-500">*</span></label>
                        <input type="text" disabled={drawerMode === 'view'} defaultValue="13800138000" className="w-full bg-[#0F172A] border border-[#1E293B] font-mono rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="text-xs text-[#94A3B8]">监管单位名称 <span className="text-red-500">*</span></label>
                        <input type="text" disabled={drawerMode === 'view'} defaultValue="苍南县水利局" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-[#94A3B8]">监管联系人 <span className="text-red-500">*</span></label>
                        <input type="text" disabled={drawerMode === 'view'} defaultValue="李强" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-[#94A3B8]">监管联系电话 <span className="text-red-500">*</span></label>
                        <input type="text" disabled={drawerMode === 'view'} defaultValue="13900139000" className="w-full bg-[#0F172A] border border-[#1E293B] font-mono rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                      </div>
                    </div>
                 </div>

                 {/* 阈值设置 */}
                 <div className="space-y-4">
                    <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2">阈值设置</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-[#94A3B8]">水库预警线 (m) <span className="text-red-500">*</span></label>
                        <input type="number" disabled={drawerMode === 'view'} defaultValue="32.00" className="w-full bg-[#0F172A] border border-[#1E293B] text-orange-400 font-mono rounded px-3 py-2 text-xs outline-none disabled:opacity-60" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-[#94A3B8]">水库征地线 (m) <span className="text-red-500">*</span></label>
                        <input type="number" disabled={drawerMode === 'view'} defaultValue="36.00" className="w-full bg-[#0F172A] border border-[#1E293B] text-red-400 font-mono rounded px-3 py-2 text-xs outline-none disabled:opacity-60" />
                      </div>
                    </div>
                 </div>
              </div>

              <div className="p-4 border-t border-[#1E293B] bg-[#0F172A] flex justify-end gap-3">
                 <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 rounded text-xs font-medium text-[#94A3B8] border border-[#1E293B] hover:bg-[#1E293B] transition-colors">
                    取消
                 </button>
                 {drawerMode !== 'view' ? (
                   <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 rounded text-xs font-bold bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 transition-colors shadow-[0_0_10px_rgba(0,242,255,0.3)]">
                      保存数据
                   </button>
                 ) : (
                    <button onClick={() => setDrawerMode('edit')} className="px-4 py-2 rounded text-xs font-bold bg-[#1E293B] text-white hover:bg-[#475569] transition-colors border border-tech-cyan/30">
                      切换至编辑
                   </button>
                 )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Insurance Drawer */}
      <AnimatePresence>
        {isInsuranceDrawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsInsuranceDrawerOpen(false)} className="fixed inset-0 bg-[#0B0F17]/80 backdrop-blur-sm z-40" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-[600px] bg-[#111622] border-l border-[#1E293B] shadow-[0_0_40px_rgba(0,0,0,0.8)] z-50 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-[#1E293B] bg-[#0F172A] shrink-0">
                 <h3 className="text-sm font-bold text-white flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-tech-cyan" /> 保险详情 - {activeRecord?.name}</h3>
                 <button onClick={() => setIsInsuranceDrawerOpen(false)} className="p-1 text-[#64748B] hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                 {/* 基础信息 */}
                 <section>
                    <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      基础信息
                    </h4>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">保单号</label>
                        <div className="text-sm text-white font-mono bg-[#0F172A] px-3 py-2 rounded border border-[#1E293B]">INS202405001</div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">承保对象</label>
                        <div className="text-sm text-white bg-[#0F172A] px-3 py-2 rounded border border-[#1E293B]">{activeRecord?.name || '--'}</div>
                      </div>
                      <div className="space-y-1.5 col-span-2">
                        <label className="text-xs text-[#94A3B8]">保险期限</label>
                        <div className="text-sm text-white bg-[#0F172A] px-3 py-2 rounded border border-[#1E293B] w-full">2024.01.01 - 2025.01.01</div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">保险费 (元)</label>
                        <div className="text-sm text-white bg-[#0F172A] px-3 py-2 rounded border border-[#1E293B] font-mono w-full">300,000</div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">每次事故绝对免赔额 (元)</label>
                        <div className="text-sm text-white bg-[#0F172A] px-3 py-2 rounded border border-[#1E293B] font-mono w-full">100,000</div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">年累计赔偿限额 (元)</label>
                        <div className="text-sm text-green-400 bg-[#0F172A] px-3 py-2 rounded border border-[#1E293B] font-mono w-full">30,000,000</div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">承保公司</label>
                        <div className="text-sm text-white bg-[#0F172A] px-3 py-2 rounded border border-[#1E293B] w-full">太平洋财产保险</div>
                      </div>
                    </div>
                 </section>

                 {/* 联系人 */}
                 <section className="bg-[#0F172A]/50 border border-[#1E293B] rounded p-4">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">保险业务员</label>
                        <div className="text-sm text-white bg-[#111622] px-3 py-2 rounded border border-[#1E293B] w-full">孙七</div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">业务员联系方式</label>
                        <div className="text-sm text-white bg-[#111622] px-3 py-2 rounded border border-[#1E293B] w-full font-mono">13500005555</div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">理赔人员</label>
                        <div className="text-sm text-white bg-[#111622] px-3 py-2 rounded border border-[#1E293B] w-full">周八</div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">理赔人员联系方式</label>
                        <div className="text-sm text-white bg-[#111622] px-3 py-2 rounded border border-[#1E293B] w-full font-mono">13400006666</div>
                      </div>
                    </div>
                 </section>

                 {/* 阶梯与上浮 */}
                 <section>
                    <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">事故赔付与上浮配置</h4>
                    <div className="space-y-6">
                      {/* 阶梯 */}
                      <div className="bg-[#111622] border border-[#1E293B] rounded p-4">
                        <h5 className="text-xs text-white font-bold mb-3">阶梯赔付配置</h5>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left bg-[#0F172A] border border-[#1E293B] rounded">
                            <thead>
                              <tr className="text-[10px] text-[#64748B] border-b border-[#1E293B]">
                                <th className="px-3 py-2 font-medium">阶梯名称</th>
                                <th className="px-3 py-2 font-medium">起始水位(m)</th>
                                <th className="px-3 py-2 font-medium">结束水位(m)</th>
                                <th className="px-3 py-2 font-medium">固定金额(元)</th>
                                <th className="px-3 py-2 font-medium">单价(元/cm)</th>
                                <th className="px-3 py-2 font-medium">区间上限(元)</th>
                              </tr>
                            </thead>
                            <tbody className="text-xs text-white divide-y divide-[#1E293B]">
                               <tr>
                                 <td className="px-3 py-2">一级赔付</td>
                                 <td className="px-3 py-2 font-mono">142.04</td>
                                 <td className="px-3 py-2 font-mono">144.04</td>
                                 <td className="px-3 py-2 font-mono">400,000</td>
                                 <td className="px-3 py-2 font-mono">0</td>
                                 <td className="px-3 py-2 font-mono">400,000</td>
                               </tr>
                               <tr>
                                 <td className="px-3 py-2">二级赔付</td>
                                 <td className="px-3 py-2 font-mono">144.04</td>
                                 <td className="px-3 py-2 font-mono">147.71</td>
                                 <td className="px-3 py-2 font-mono">2,000,000</td>
                                 <td className="px-3 py-2 font-mono">0</td>
                                 <td className="px-3 py-2 font-mono">2,000,000</td>
                               </tr>
                               <tr>
                                 <td className="px-3 py-2">三级赔付</td>
                                 <td className="px-3 py-2 font-mono">147.71</td>
                                 <td className="px-3 py-2 font-mono">--</td>
                                 <td className="px-3 py-2 font-mono">30,000,000</td>
                                 <td className="px-3 py-2 font-mono">15,000</td>
                                 <td className="px-3 py-2 font-mono">30,000,000</td>
                               </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* 上浮 */}
                      <div className="bg-[#111622] border border-[#1E293B] rounded p-4">
                        <h5 className="text-xs text-white font-bold mb-3">多阶梯淹没时间赔付上浮条件</h5>
                        <div className="overflow-x-auto">
                           <table className="w-full text-left bg-[#0F172A] border border-[#1E293B] rounded">
                            <thead>
                              <tr className="text-[10px] text-[#64748B] border-b border-[#1E293B]">
                                <th className="px-3 py-2 font-medium">条件名称</th>
                                <th className="px-3 py-2 font-medium">淹没时间(H)范围</th>
                                <th className="px-3 py-2 font-medium">赔付上浮比例(k)</th>
                              </tr>
                            </thead>
                            <tbody className="text-xs text-white divide-y divide-[#1E293B]">
                               <tr>
                                 <td className="px-3 py-2">时间条件1</td>
                                 <td className="px-3 py-2 font-mono">0 ≤ H &lt; 24</td>
                                 <td className="px-3 py-2 font-mono">0%</td>
                               </tr>
                               <tr>
                                 <td className="px-3 py-2">时间条件2</td>
                                 <td className="px-3 py-2 font-mono">24 ≤ H &lt; 48</td>
                                 <td className="px-3 py-2 font-mono">5%</td>
                               </tr>
                               <tr>
                                 <td className="px-3 py-2">时间条件3</td>
                                 <td className="px-3 py-2 font-mono">H ≥ 48</td>
                                 <td className="px-3 py-2 font-mono">10%</td>
                               </tr>
                            </tbody>
                           </table>
                        </div>
                      </div>
                    </div>
                 </section>

                 {/* 分项规则 */}
                 <div className="grid grid-cols-2 gap-6">
                    <section>
                      <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">转移安置规则</h4>
                      <div className="space-y-3">
                         <div className="space-y-1.5">
                           <label className="text-xs text-[#94A3B8]">每人每次赔付金额 (元)</label>
                           <div className="text-sm text-white bg-[#0F172A] px-3 py-2 rounded border border-[#1E293B] font-mono">200</div>
                         </div>
                         <div className="space-y-1.5">
                           <label className="text-xs text-[#94A3B8]">每次赔付限额 (元)</label>
                           <div className="text-sm text-white bg-[#0F172A] px-3 py-2 rounded border border-[#1E293B] font-mono">500,000</div>
                         </div>
                         <div className="space-y-1.5">
                           <label className="text-xs text-[#94A3B8]">年累计赔付限额 (元)</label>
                           <div className="text-sm text-blue-400 bg-[#0F172A] px-3 py-2 rounded border border-[#1E293B] font-mono">2,000,000</div>
                         </div>
                      </div>
                    </section>
                    <section>
                      <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">人身伤亡规则</h4>
                      <div className="space-y-3">
                         <div className="space-y-1.5">
                           <label className="text-xs text-[#94A3B8]">每人每次赔付限额 (元)</label>
                           <div className="text-sm text-white bg-[#0F172A] px-3 py-2 rounded border border-[#1E293B] font-mono">150,000</div>
                         </div>
                         <div className="space-y-1.5">
                           <label className="text-xs text-[#94A3B8]">年累计赔付限额 (元)</label>
                           <div className="text-sm text-blue-400 bg-[#0F172A] px-3 py-2 rounded border border-[#1E293B] font-mono">5,000,000</div>
                         </div>
                      </div>
                    </section>
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
              <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col pt-0 mt-4">
                 {wlTab === 'add' ? (
                   <div className="space-y-4 flex-1 flex flex-col">
                     <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded mb-4 flex gap-2"><AlertTriangle className="shrink-0 w-4 h-4" />这只是用于在未关联水位监测设备的情况下手动上报。</div>
                     
                     <div className="flex gap-4">
                       <div className="space-y-1.5 flex-1">
                         <label className="text-[10px] text-[#94A3B8] uppercase tracking-widest">选择日期</label>
                         <input type="date" defaultValue="2024-05-12" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none focus:border-tech-cyan transition-colors" />
                       </div>
                       <div className="space-y-1.5 flex-1">
                         <label className="text-[10px] text-[#94A3B8] uppercase tracking-widest">批量设置水位 (m)</label>
                         <div className="flex gap-2">
                           <input type="number" step="0.01" className="flex-1 w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none focus:border-tech-cyan transition-colors font-mono" placeholder="如 142.50" />
                           <button className="px-3 py-2 bg-[#1E293B] hover:bg-[#334155] text-white rounded text-xs transition-colors shrink-0">应用</button>
                         </div>
                       </div>
                     </div>

                     <div className="space-y-2 mt-4 flex-1 flex flex-col min-h-0">
                        <label className="text-[10px] text-[#94A3B8] uppercase tracking-widest">24小时水位填报</label>
                        <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-2 pb-4">
                           {Array.from({length: 24}).map((_, i) => (
                             <div key={i} className="flex items-center gap-2 bg-[#0F172A] px-3 py-1.5 rounded border border-[#1E293B] focus-within:border-tech-cyan transition-colors">
                               <span className="text-[#64748B] text-xs font-mono w-10">{i.toString().padStart(2, '0')}:00</span>
                               <input type="number" step="0.01" className="flex-1 w-full bg-transparent text-xs text-white outline-none text-right font-mono" placeholder="水位" />
                               <span className="text-[#64748B] text-[10px]">m</span>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="pt-4 border-t border-[#1E293B] mt-auto">
                        <button onClick={() => setIsWaterLevelDrawerOpen(false)} className="px-4 py-2.5 rounded text-sm font-bold bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 w-full transition-colors shadow-[0_0_10px_rgba(0,242,255,0.3)]">确认提交</button>
                     </div>
                   </div>
                 ) : (
                   <div className="flex-1 flex flex-col min-h-0">
                      <div className="flex justify-between items-center bg-[#0F172A] p-2 rounded border border-[#1E293B] mb-4 shrink-0">
                        <input type="date" defaultValue="2024-05-12" className="bg-transparent text-xs text-white outline-none focus:text-tech-cyan transition-colors px-2 cursor-pointer" />
                        <button className="text-[#0B0F17] bg-tech-cyan hover:bg-tech-cyan/90 text-xs font-medium px-4 py-1.5 rounded transition-colors shadow-[0_0_10px_rgba(0,242,255,0.2)]">查询</button>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                        <table className="w-full text-left bg-[#0F172A] border border-[#1E293B] rounded relative">
                          <thead className="sticky top-0 bg-[#0F172A] z-10 shadow-sm">
                            <tr className="text-[10px] text-[#64748B] border-b border-[#1E293B] uppercase tracking-widest"><th className="px-3 py-2">时间</th><th className="px-3 py-2">水位(m)</th><th className="px-3 py-2 text-right">操作</th></tr>
                          </thead>
                          <tbody className="text-xs text-white divide-y divide-[#1E293B]">
                            {Array.from({length: 24}).map((_, i) => {
                              const hour = 23 - i;
                              const baseLevel = activeRecord?.currentLevel || 142.50;
                              return (
                                <tr key={i} className="hover:bg-[#1E293B]/30 group">
                                  <td className="px-3 py-2 font-mono text-[#94A3B8]">{hour.toString().padStart(2, '0')}:00</td>
                                  <td className="px-3 py-2">
                                    <input type="number" defaultValue={(baseLevel - (23-hour)*0.01).toFixed(2)} className="w-20 bg-[#111622] px-2 py-1 rounded border border-[#334155] outline-none text-white font-mono focus:border-tech-cyan transition-colors" />
                                  </td>
                                  <td className="px-3 py-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-tech-cyan hover:underline text-xs bg-tech-cyan/10 px-2 py-1 rounded">保存修改</button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                   </div>
                 )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
