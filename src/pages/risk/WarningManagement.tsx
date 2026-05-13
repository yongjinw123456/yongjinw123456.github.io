import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, AlertTriangle, Eye, ShieldAlert, CheckCircle, List, ArrowRight, X, Clock, FileText, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type WarningEvent = {
  id: string;
  reservoirId: string;
  reservoirName: string;
  latestWarningTime: string;
  warningLevel: '黄色预警' | '橙色预警' | '红色预警';
  thresholdSource: '预警线' | '征地线' | '二级赔付线' | '三级赔付线' | '自定义阈值';
  currentLevel: number;
  highestLevel: number;
  warningLine: number;
  landLine: number;
  status: '待处理' | '已解除' | '已处理';
  createdAt: string;
};

const MOCK_LIST: WarningEvent[] = [
  {
    id: 'EVT-001',
    reservoirId: 'qiaodun',
    reservoirName: '桥墩水库',
    latestWarningTime: '2024-05-12 14:15',
    warningLevel: '红色预警',
    thresholdSource: '征地线',
    currentLevel: 34.20,
    highestLevel: 35.10,
    warningLine: 32.00,
    landLine: 36.00,
    status: '待处理',
    createdAt: '2024-05-11 08:30'
  },
  {
    id: 'EVT-002',
    reservoirId: 'shanxi',
    reservoirName: '珊溪水库',
    latestWarningTime: '2024-05-12 14:00',
    warningLevel: '橙色预警',
    thresholdSource: '预警线',
    currentLevel: 142.50,
    highestLevel: 143.20,
    warningLine: 140.00,
    landLine: 145.00,
    status: '处理中', // Adjusted manually to match requirements? No, req says 待处理, 已处理, 已解除
    createdAt: '2024-05-12 09:15'
  } as any,
  {
    id: 'EVT-003',
    reservoirId: 'zhaoshandu',
    reservoirName: '赵山渡水库',
    latestWarningTime: '2024-05-10 16:30',
    warningLevel: '黄色预警',
    thresholdSource: '自定义阈值',
    currentLevel: 21.50,
    highestLevel: 22.80,
    warningLine: 20.00,
    landLine: 24.00,
    status: '已处理',
    createdAt: '2024-05-09 10:00'
  },
  {
    id: 'EVT-004',
    reservoirId: 'shanxi',
    reservoirName: '珊溪水库',
    latestWarningTime: '2024-05-01 10:00',
    warningLevel: '黄色预警',
    thresholdSource: '预警线',
    currentLevel: 140.50,
    highestLevel: 141.00,
    warningLine: 140.00,
    landLine: 145.00,
    status: '已解除',
    createdAt: '2024-05-01 08:00'
  }
];

export default function WarningManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialReservoirId = searchParams.get('reservoirId') || '';

  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [isRecordsDrawerOpen, setIsRecordsDrawerOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<WarningEvent | null>(null);
  
  const [processType, setProcessType] = useState<'解除' | '预警归因'>('预警归因');

  const openProcessModal = (evt: WarningEvent) => {
    setActiveEvent(evt);
    setProcessType('预警归因');
    setIsProcessModalOpen(true);
  };

  const openRecordsDrawer = (evt: WarningEvent) => {
    setActiveEvent(evt);
    setIsRecordsDrawerOpen(true);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case '黄色预警': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case '橙色预警': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case '红色预警': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '待处理': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case '已处理': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case '已解除': return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };

  // Correcting mock data
  const list = MOCK_LIST.map(item => ({...item, status: item.status === '处理中' ? '待处理' : item.status}));

  return (
    <div className="h-full flex flex-col p-6 gap-4 fade-in duration-300">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
             <span className="w-1.5 h-5 bg-tech-cyan rounded-sm"></span>
             <span>预警管理</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1 pl-4 uppercase tracking-wider font-mono">
            RISK / WARNING MANAGEMENT
          </p>
        </div>
      </header>

      {/* Filter Section */}
      <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-4 shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">水库选择</label>
            <select defaultValue={initialReservoirId} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1.5 text-xs text-white outline-none appearance-none cursor-pointer">
              <option value="">全部水库</option>
              <option value="shanxi">珊溪水库</option>
              <option value="qiaodun">桥墩水库</option>
              <option value="zhaoshandu">赵山渡水库</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">预警时间</label>
            <div className="flex items-center gap-2">
              <input type="date" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-2 py-1.5 text-xs text-white outline-none" />
              <span className="text-[#475569]">-</span>
              <input type="date" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-2 py-1.5 text-xs text-white outline-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">预警状态</label>
            <select className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1.5 text-xs text-white outline-none appearance-none cursor-pointer">
              <option value="">全部状态</option>
              <option value="待处理">待处理</option>
              <option value="已解除">已解除</option>
              <option value="已处理">已处理</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">预警等级</label>
            <select className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1.5 text-xs text-white outline-none appearance-none cursor-pointer">
              <option value="">全部等级</option>
              <option value="黄色预警">黄色预警</option>
              <option value="橙色预警">橙色预警</option>
              <option value="红色预警">红色预警</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 bg-[#111622] border border-[#1E293B] rounded-lg flex flex-col min-h-0">
        <div className="overflow-x-auto overflow-y-auto flex-1 no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#0F172A] text-[10px] text-[#64748B] uppercase tracking-widest border-b border-[#1E293B]">
                <th className="px-4 py-3 font-medium">预警对象</th>
                <th className="px-4 py-3 font-medium">当前预警等级</th>
                <th className="px-4 py-3 font-medium">命中阈值来源</th>
                <th className="px-4 py-3 font-medium text-right">当前水位线(m)</th>
                <th className="px-4 py-3 font-medium text-right">最高水位线(m)</th>
                <th className="px-4 py-3 font-medium text-right">预警线 / 征地线</th>
                <th className="px-4 py-3 font-medium">预警状态</th>
                <th className="px-4 py-3 font-medium">时间信息</th>
                <th className="px-4 py-3 font-medium text-right sticky right-0 bg-[#0F172A]">操作</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[#E0E6ED] divide-y divide-[#1E293B]">
              {list.map((row) => (
                <tr key={row.id} className="hover:bg-[#1E293B]/30 transition-colors group">
                  <td className="px-4 py-3 font-medium">
                     <button 
                       onClick={() => navigate(`/business/reservoir?reservoirId=${row.reservoirId}`)}
                       className="text-tech-cyan hover:underline"
                     >
                       {row.reservoirName}
                     </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-0.5 rounded border text-[10px] whitespace-nowrap inline-flex items-center gap-1", getLevelColor(row.warningLevel))}>
                      <ShieldAlert className="w-3 h-3" />
                      {row.warningLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#94A3B8]">{row.thresholdSource}</td>
                  <td className="px-4 py-3 text-right">
                     <button 
                       onClick={() => navigate(`/monitoring/realtime?reservoirId=${row.reservoirId}`)}
                       className="font-mono text-tech-cyan hover:underline"
                     >
                       {row.currentLevel.toFixed(2)}
                     </button>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-red-400">{row.highestLevel.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-mono text-[#94A3B8]">
                     <span className="text-orange-400">{row.warningLine.toFixed(2)}</span> / <span className="text-red-400">{row.landLine.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-0.5 rounded border text-[10px] whitespace-nowrap", getStatusColor(row.status))}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[#94A3B8] title='最新预警时间'">
                         <Clock className="w-3 h-3 text-orange-400" />
                         <span className="font-mono">{row.latestWarningTime}</span>
                      </div>
                      <div className="text-[10px] text-[#64748B] font-mono" title="创建时间">
                         创建: {row.createdAt}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right sticky right-0 bg-[#111622] group-hover:bg-[#151c2a] transition-colors border-l border-[#1E293B]">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => openRecordsDrawer(row)}
                         className="flex items-center gap-1 p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors whitespace-nowrap" 
                         title="查看预警记录"
                       >
                         <List className="w-4 h-4" />
                         <span className="hidden xl:inline text-[10px]">记录</span>
                       </button>
                       {row.status === '待处理' && (
                         <button 
                           onClick={() => openProcessModal(row)}
                           className="flex items-center gap-1 p-1.5 text-orange-400 hover:text-white hover:bg-orange-500/20 rounded transition-colors whitespace-nowrap bg-orange-500/10" 
                           title="预警处理"
                         >
                           <CheckCircle className="w-4 h-4" />
                           <span className="hidden xl:inline text-[10px]">处理</span>
                         </button>
                       )}
                       <button 
                         onClick={() => navigate(`/risk/claims/calculator?warningEventId=${row.id}&reservoirId=${row.reservoirId}`)}
                         className="flex items-center gap-1 p-1.5 text-tech-cyan hover:text-white hover:bg-tech-cyan/20 rounded transition-colors whitespace-nowrap bg-tech-cyan/10" 
                         title="转入理赔"
                       >
                         <ArrowRight className="w-4 h-4" />
                         <span className="hidden xl:inline text-[10px]">转理赔</span>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-[#1E293B] bg-[#0F172A] flex items-center justify-between text-xs text-[#64748B] shrink-0">
          <span>共 <strong className="text-white font-mono">{list.length}</strong> 条记录</span>
          <div className="flex items-center gap-1">
             <button className="px-2 py-1 border border-[#1E293B] rounded hover:bg-[#1E293B] hover:text-white transition-colors disabled:opacity-50">上一页</button>
             <button className="px-2 py-1 bg-[#1E293B] border border-[#1E293B] text-tech-cyan rounded font-mono">1</button>
             <button className="px-2 py-1 border border-[#1E293B] rounded hover:bg-[#1E293B] hover:text-white transition-colors disabled:opacity-50">下一页</button>
          </div>
        </div>
      </div>

      {/* Process Modal */}
      <AnimatePresence>
        {isProcessModalOpen && activeEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0B0F17]/80 backdrop-blur-sm"
              onClick={() => setIsProcessModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#111622] rounded-lg border border-[#1E293B] shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-[#1E293B] flex items-center justify-between bg-[#0F172A] rounded-t-lg">
                 <h3 className="text-sm font-bold text-white flex items-center gap-2">
                   <ShieldAlert className="w-4 h-4 text-orange-400" />
                   预警处理 - {activeEvent.reservoirName}
                 </h3>
                 <button onClick={() => setIsProcessModalOpen(false)} className="text-[#64748B] hover:text-white">
                   <X className="w-5 h-5" />
                 </button>
              </div>
              <div className="p-6 space-y-5">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">处理方式 <span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                       <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="processType" className="accent-tech-cyan" checked={processType === '预警归因'} onChange={() => setProcessType('预警归因')} />
                          <span className="text-sm text-white">预警归因</span>
                       </label>
                       <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="processType" className="accent-tech-cyan" checked={processType === '解除'} onChange={() => setProcessType('解除')} />
                          <span className="text-sm text-white">解除预警</span>
                       </label>
                    </div>
                 </div>

                 {processType === '预警归因' && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2 overflow-hidden">
                      <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">预警归因 <span className="text-red-500">*</span></label>
                      <div className="flex flex-wrap gap-2">
                         <label className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0F172A] border border-[#1E293B] cursor-pointer hover:border-tech-cyan transition-colors">
                            <input type="checkbox" className="accent-tech-cyan" />
                            <span className="text-xs text-white">台风</span>
                         </label>
                         <label className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0F172A] border border-[#1E293B] cursor-pointer hover:border-tech-cyan transition-colors">
                            <input type="checkbox" className="accent-tech-cyan" />
                            <span className="text-xs text-white">暴雨</span>
                         </label>
                         <label className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0F172A] border border-[#1E293B] cursor-pointer hover:border-tech-cyan transition-colors">
                            <input type="checkbox" className="accent-tech-cyan" />
                            <span className="text-xs text-white">设备故障</span>
                         </label>
                         <label className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0F172A] border border-[#1E293B] cursor-pointer hover:border-tech-cyan transition-colors">
                            <input type="checkbox" className="accent-tech-cyan" />
                            <span className="text-xs text-white">上游泄洪</span>
                         </label>
                      </div>
                   </motion.div>
                 )}

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">处理说明</label>
                    <textarea 
                      rows={3} 
                      className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded p-3 text-sm text-white outline-none resize-none placeholder:text-[#475569]"
                      placeholder="请输入说明文字(0-500字)..."
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">处理附件</label>
                    <div className="border border-dashed border-[#334155] rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-tech-cyan hover:bg-[#0F172A]/50 transition-colors">
                       <Upload className="w-6 h-6 text-[#64748B] mb-2" />
                       <span className="text-xs text-[#94A3B8]">点击或拖拽文件到此处上传</span>
                    </div>
                 </div>
              </div>
              <div className="p-4 border-t border-[#1E293B] bg-[#0F172A] rounded-b-lg flex justify-end gap-3">
                 <button onClick={() => setIsProcessModalOpen(false)} className="px-4 py-2 rounded text-sm font-medium text-[#94A3B8] border border-[#1E293B] hover:bg-[#1E293B] transition-colors">
                    取消
                 </button>
                 <button onClick={() => setIsProcessModalOpen(false)} className="px-4 py-2 rounded text-sm font-bold bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 transition-colors shadow-[0_0_10px_rgba(0,242,255,0.3)]">
                    {processType === '解除' ? '确认解除' : '提交归因'}
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Records Drawer */}
      <AnimatePresence>
        {isRecordsDrawerOpen && activeEvent && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsRecordsDrawerOpen(false)}
              className="fixed inset-0 bg-[#0B0F17]/80 backdrop-blur-sm z-40" 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[800px] bg-[#111622] border-l border-[#1E293B] shadow-[0_0_40px_rgba(0,0,0,0.8)] z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#1E293B] bg-[#0F172A] shrink-0">
                 <h3 className="text-sm font-bold text-white flex items-center gap-2">
                   <List className="w-4 h-4 text-tech-cyan" />
                   预警记录详情 - {activeEvent.reservoirName}
                 </h3>
                 <button onClick={() => setIsRecordsDrawerOpen(false)} className="p-1 text-[#64748B] hover:text-white rounded transition-colors">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* 预警记录列表 */}
                <div className="bg-[#111622] border border-[#1E293B] rounded flex flex-col overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-[#0F172A] text-[10px] text-[#64748B] uppercase tracking-widest border-b border-[#1E293B]">
                        <tr>
                          <th className="px-3 py-2 font-medium">预警时间</th>
                          <th className="px-3 py-2 font-medium">预警等级</th>
                          <th className="px-3 py-2 font-medium">阈值来源</th>
                          <th className="px-3 py-2 font-medium">预警类型</th>
                          <th className="px-3 py-2 font-medium text-right">水位线(m)</th>
                          <th className="px-3 py-2 font-medium">数据来源</th>
                          <th className="px-3 py-2 font-medium">状态</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs text-white divide-y divide-[#1E293B]">
                         {[...Array(5)].map((_, i) => (
                           <tr key={i} className="hover:bg-[#1E293B]/20">
                             <td className="px-3 py-2 font-mono">2024-05-12 {14-i}:00</td>
                             <td className="px-3 py-2">
                               <span className={cn("px-2 py-0.5 rounded text-[10px]", i === 0 ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-orange-500/10 text-orange-400 border border-orange-500/20")}>
                                 {i === 0 ? '红色预警' : '橙色预警'}
                               </span>
                             </td>
                             <td className="px-3 py-2 text-[#94A3B8]">{i === 0 ? '征地线' : '预警线'}</td>
                             <td className="px-3 py-2 text-[#94A3B8]">水位预警</td>
                             <td className="px-3 py-2 font-mono text-right text-tech-cyan">{(34.20 - i*0.5).toFixed(2)}</td>
                             <td className="px-3 py-2">
                               <div className="flex flex-col gap-0.5">
                                  <span className="text-white">接口推送</span>
                                  <span className="text-[10px] text-[#64748B]">成功</span>
                               </div>
                             </td>
                             <td className="px-3 py-2">
                               <span className={cn("px-2 py-0.5 rounded text-[10px]", activeEvent.status === '待处理' ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "bg-green-500/10 text-green-400 border border-green-500/20")}>
                                 {activeEvent.status}
                               </span>
                             </td>
                           </tr>
                         ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
