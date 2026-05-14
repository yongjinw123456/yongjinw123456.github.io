import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Plus, Download, FileText, CheckCircle, XCircle, Edit, Save, Trash2, Eye, ShieldCheck, Upload, AlertTriangle, AlertCircle, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

type ClaimRecord = {
  id: string;
  reservoirName: string;
  reservoirId: string;
  warningEventDesc: string;
  warningEventId: string;
  totalAmount: number;
  accidentAmount: number;
  relocationAmount: number;
  injuryAmount: number;
  upfloatAmount: number;
  attachments: number;
  status: '暂存中' | '待业主确认' | '待归档' | '已驳回' | '已归档';
  ownerConfirmStatus: '待确认' | '已确认' | '已驳回' | '-';
  createdAt: string;
  updatedAt: string;
};

const MOCK_LIST: ClaimRecord[] = [
  {
    id: 'CLM-202405-001',
    reservoirName: '珊溪水库',
    reservoirId: 'shanxi',
    warningEventDesc: '[EVT-002]橙色预警(5/12)',
    warningEventId: 'EVT-002',
    totalAmount: 5480000,
    accidentAmount: 4880000,
    relocationAmount: 0,
    injuryAmount: 0,
    upfloatAmount: 600000,
    attachments: 2,
    status: '待业主确认',
    ownerConfirmStatus: '待确认',
    createdAt: '2024-05-12 15:30',
    updatedAt: '2024-05-12 16:00'
  },
  {
    id: 'CLM-202405-002',
    reservoirName: '桥墩水库',
    reservoirId: 'qiaodun',
    warningEventDesc: '[EVT-001]红色预警(5/11)',
    warningEventId: 'EVT-001',
    totalAmount: 1800000,
    accidentAmount: 1500000,
    relocationAmount: 150000,
    injuryAmount: 0,
    upfloatAmount: 150000,
    attachments: 5,
    status: '已归档',
    ownerConfirmStatus: '已确认',
    createdAt: '2024-05-11 14:00',
    updatedAt: '2024-05-12 10:20'
  },
  {
    id: 'CLM-202405-003',
    reservoirName: '赵山渡水库',
    reservoirId: 'zhaoshandu',
    warningEventDesc: '[EVT-003]黄色预警(5/09)',
    warningEventId: 'EVT-003',
    totalAmount: 450000,
    accidentAmount: 400000,
    relocationAmount: 50000,
    injuryAmount: 0,
    upfloatAmount: 0,
    attachments: 0,
    status: '暂存中',
    ownerConfirmStatus: '-',
    createdAt: '2024-05-10 11:00',
    updatedAt: '2024-05-10 11:00'
  }
];

export default function ClaimsRecords() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const action = searchParams.get('action');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit' | 'view'>('view');
  const [activeRecord, setActiveRecord] = useState<ClaimRecord | null>(null);

  useEffect(() => {
    if (action === 'create') {
      const stateDraft = location.state as any;
      if (stateDraft) {
         openDrawer('create', {
           id: '',
           reservoirName: '',
           reservoirId: searchParams.get('reservoirId') || '',
           warningEventDesc: '',
           warningEventId: searchParams.get('warningEventId') || '',
           totalAmount: stateDraft.totalAmountManual,
           accidentAmount: stateDraft.accidentAmountManual,
           relocationAmount: stateDraft.relocationAmountManual,
           injuryAmount: stateDraft.injuryAmountManual,
           upfloatAmount: stateDraft.upfloatAmount,
           attachments: 0,
           status: '暂存中',
           ownerConfirmStatus: '-',
           createdAt: '',
           updatedAt: ''
         } as ClaimRecord);
      } else {
         openDrawer('create');
      }
    }
  }, [action]);

  const openDrawer = (mode: 'create' | 'edit' | 'view', record?: ClaimRecord) => {
    setDrawerMode(mode);
    setActiveRecord(record || null);
    setIsDrawerOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '暂存中': return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
      case '待业主确认': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case '待归档': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case '已驳回': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case '已归档': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };
  
  const getOwnerConfirmColor = (status: string) => {
    switch (status) {
      case '待确认': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case '已确认': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case '已驳回': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="h-full flex flex-col p-6 gap-4 fade-in duration-300">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
             <span className="w-1.5 h-5 bg-tech-cyan rounded-sm"></span>
             <span>理赔记录</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1 pl-4 uppercase tracking-wider font-mono">
            RISK / CLAIMS RECORDS
          </p>
        </div>
        <div className="flex gap-2">
           <button 
             className="bg-[#1E293B] text-white hover:bg-[#334155] px-4 py-2 rounded flex items-center gap-2 text-sm transition-colors border border-[#334155]"
           >
             <Download className="w-4 h-4" />
             导出
           </button>
           <button 
             onClick={() => openDrawer('create')}
             className="bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 font-bold px-4 py-2 rounded flex items-center gap-2 text-sm transition-colors shadow-[0_0_10px_rgba(0,242,255,0.3)]"
           >
             <Plus className="w-4 h-4" />
             新增理赔
           </button>
        </div>
      </header>

      {/* Filter Section */}
      <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-4 shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">理赔对象</label>
            <select className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1.5 text-xs text-white outline-none appearance-none cursor-pointer">
              <option value="">全部水库</option>
              <option value="shanxi">珊溪水库</option>
              <option value="qiaodun">桥墩水库</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">理赔核算状态</label>
            <select className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1.5 text-xs text-white outline-none appearance-none cursor-pointer">
              <option value="">全状态</option>
              <option value="暂存中">暂存中</option>
              <option value="待业主确认">待业主确认</option>
              <option value="待归档">待归档</option>
              <option value="已驳回">已驳回</option>
              <option value="已归档">已归档</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">发生时间</label>
            <div className="flex items-center gap-2">
              <input type="date" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-2 py-1.5 text-xs text-white outline-none" />
              <span className="text-[#475569]">-</span>
              <input type="date" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-2 py-1.5 text-xs text-white outline-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">水库确认状态</label>
            <select className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1.5 text-xs text-white outline-none appearance-none cursor-pointer">
              <option value="">全状态</option>
              <option value="待确认">待确认</option>
              <option value="已确认">已确认</option>
              <option value="已驳回">已驳回</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">关联保单</label>
            <select className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1.5 text-xs text-white outline-none appearance-none cursor-pointer">
              <option value="">全部保单</option>
              <option value="pol1">POL-20240510-001</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 bg-[#111622] border border-[#1E293B] rounded-lg flex flex-col min-h-0">
        <div className="overflow-x-auto overflow-y-auto flex-1 no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1400px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#0F172A] text-[10px] text-[#64748B] uppercase tracking-widest border-b border-[#1E293B]">
                <th className="px-4 py-3 font-medium">理赔对象</th>
                <th className="px-4 py-3 font-medium">关联预警事件</th>
                <th className="px-4 py-3 font-medium text-right bg-[#0F172A]/80 border-x border-[#1E293B]/50">总赔付金额(元)</th>
                <th className="px-4 py-3 font-medium">理赔资料</th>
                <th className="px-4 py-3 font-medium">理赔核算状态</th>
                <th className="px-4 py-3 font-medium">水库确认状态</th>
                <th className="px-4 py-3 font-medium">时间信息</th>
                <th className="px-4 py-3 font-medium text-right sticky right-0 bg-[#0F172A]">操作</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[#E0E6ED] divide-y divide-[#1E293B]">
              {MOCK_LIST.map((row) => (
                <tr key={row.id} className="hover:bg-[#1E293B]/30 transition-colors group">
                  <td className="px-4 py-3 font-medium">
                     <button onClick={() => navigate(`/business/reservoir?reservoirId=${row.reservoirId}`)} className="text-tech-cyan hover:underline">{row.reservoirName}</button>
                  </td>
                  <td className="px-4 py-3">
                     <button onClick={() => navigate(`/risk/warning`)} className="text-[#94A3B8] hover:text-white transition-colors">{row.warningEventDesc}</button>
                  </td>
                  <td className="px-4 py-3 text-right bg-[#0F172A]/30 border-x border-[#1E293B]/30">
                     <div className="flex flex-col items-end gap-1">
                        <span className="font-mono text-white text-sm">{(row.totalAmount / 10000).toFixed(2)}万</span>
                        <div className="flex items-center gap-1.5 text-[9px] text-[#64748B] font-mono">
                           <span title="事故金额">A:{(row.accidentAmount / 10000).toFixed(1)}万</span>
                           <span title="上浮金额">U:{(row.upfloatAmount / 10000).toFixed(1)}万</span>
                           <span title="转移安置">R:{(row.relocationAmount / 10000).toFixed(1)}万</span>
                           <span title="人伤金额">C:{(row.injuryAmount / 10000).toFixed(1)}万</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-4 py-3">
                     {row.attachments > 0 ? (
                        <div className="flex items-center gap-1 text-blue-400">
                           <FileText className="w-3.5 h-3.5" />
                           <span>{row.attachments}个文件</span>
                        </div>
                     ) : (
                        <span className="text-[#475569]">无附件</span>
                     )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-0.5 rounded border text-[10px] whitespace-nowrap", getStatusColor(row.status))}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-0.5 rounded border text-[10px] whitespace-nowrap", getOwnerConfirmColor(row.ownerConfirmStatus))}>
                      {row.ownerConfirmStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[#94A3B8]">创: {row.createdAt}</span>
                      <span className="text-[#64748B]">更: {row.updatedAt}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right sticky right-0 bg-[#111622] group-hover:bg-[#151c2a] transition-colors border-l border-[#1E293B]">
                    <div className="flex items-center justify-end gap-1.5">
                       <button onClick={() => openDrawer('view', row)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="查看详情">
                         <Eye className="w-4 h-4" />
                       </button>
                       {(row.status === '暂存中' || row.status === '已驳回') && (
                          <button onClick={() => openDrawer('edit', row)} className="p-1.5 text-[#64748B] hover:text-tech-cyan hover:bg-[#1E293B] rounded transition-colors" title="编辑属性">
                            <Edit className="w-4 h-4" />
                          </button>
                       )}
                       {(row.status === '暂存中' || row.status === '已驳回') && (
                          <button className="p-1.5 text-blue-400 hover:text-white hover:bg-blue-500/20 rounded transition-colors" title="提交业主确认">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                       )}
                       {row.status === '待归档' && (
                          <button className="p-1.5 text-green-400 hover:text-white hover:bg-green-500/20 rounded transition-colors" title="手动归档">
                            <Save className="w-4 h-4" />
                          </button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-[#1E293B] bg-[#0F172A] flex items-center justify-between text-xs text-[#64748B] shrink-0">
          <span>共 <strong className="text-white font-mono">{MOCK_LIST.length}</strong> 条记录</span>
          <div className="flex items-center gap-1">
             <button className="px-2 py-1 border border-[#1E293B] rounded hover:bg-[#1E293B] hover:text-white transition-colors disabled:opacity-50">上一页</button>
             <button className="px-2 py-1 bg-[#1E293B] border border-[#1E293B] text-tech-cyan rounded font-mono">1</button>
             <button className="px-2 py-1 border border-[#1E293B] rounded hover:bg-[#1E293B] hover:text-white transition-colors disabled:opacity-50">下一页</button>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div 
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-[#0B0F17]/80 backdrop-blur-sm z-40" 
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div 
            key="drawer"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[900px] bg-[#111622] border-l border-[#1E293B] shadow-[0_0_40px_rgba(0,0,0,0.8)] z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-[#1E293B] bg-[#0F172A] shrink-0">
                 <h3 className="text-sm font-bold text-white flex items-center gap-2">
                   {drawerMode === 'create' ? <Plus className="w-4 h-4 text-tech-cyan" /> : drawerMode === 'edit' ? <Edit className="w-4 h-4 text-tech-cyan"/> : <FileText className="w-4 h-4 text-tech-cyan"/>}
                   {drawerMode === 'create' ? '新增理赔记录' : drawerMode === 'edit' ? '编辑理赔记录' : '理赔记录详情'}
                 </h3>
                 <button onClick={() => setIsDrawerOpen(false)} className="p-1 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors">
                    关闭
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                 {/* 基本信息 */}
                 <section>
                    <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      基础信息
                    </h4>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">理赔类型 <span className="text-red-500">*</span></label>
                        <select disabled={drawerMode === 'view'} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60">
                           <option value="防洪">防洪理赔</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">理赔对象 <span className="text-red-500">*</span></label>
                        <select disabled={drawerMode === 'view'} defaultValue={activeRecord?.reservoirId || searchParams.get('reservoirId') || ''} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60">
                           <option value="">选择水库</option>
                           <option value="shanxi">珊溪水库</option>
                           <option value="qiaodun">桥墩水库</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">关联保单 <span className="text-red-500">*</span></label>
                        <select disabled className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-tech-cyan font-mono outline-none disabled:opacity-80">
                           <option value="">POL-20240510-001</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">关联预警事件 <span className="text-red-500">*</span></label>
                        <select disabled={drawerMode === 'view'} defaultValue={activeRecord?.warningEventId || searchParams.get('warningEventId') || ''} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-orange-400 font-mono outline-none disabled:opacity-60">
                           <option value="">请选择</option>
                           <option value="EVT-001">EVT-001</option>
                           <option value="EVT-002">EVT-002</option>
                        </select>
                      </div>
                    </div>
                 </section>

                 {/* 公式卡片区 */}
                 <section>
                    <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4 flex items-center gap-2">
                      <Calculator className="w-3.5 h-3.5" />
                      理赔核算详情
                    </h4>
                    
                    <div className="bg-[#111622] rounded-lg border border-[#1E293B] p-5 space-y-6">
                       
                       {/* 事故 */}
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#1E293B]">
                         <div>
                            <div className="text-[10px] text-[#64748B] mb-2 uppercase">事故财产损失</div>
                            <div className="text-[10px] bg-[#0F172A] p-2 rounded font-mono text-[#94A3B8] border border-[#1E293B]">
                               A = min(A1 + A2, L_a_once, L_a_year_remaining)
                            </div>
                            <div className="text-[10px] mt-2 grid grid-cols-2 gap-1 text-[#64748B]">
                              <span>A1 (阶梯): 3,000,000</span>
                              <span>A2 (上浮): {activeRecord?.upfloatAmount || 2480000}</span>
                              <span>L_a_once: 500w</span><span>L_a_yr: 1000w</span>
                            </div>
                         </div>
                         <div className="bg-[#0F172A]/50 border border-[#1E293B] rounded p-3">
                            <label className="text-xs text-[#94A3B8] mb-1.5 block">事故赔付金额 (元) <span className="text-red-500">*</span></label>
                            <input type="number" disabled={drawerMode === 'view'} defaultValue={activeRecord?.accidentAmount !== undefined ? (activeRecord.accidentAmount + (activeRecord.upfloatAmount || 0)) : 5480000} className="w-full bg-[#111622] border border-[#1E293B] focus:border-tech-cyan rounded px-2 py-1.5 text-xs text-white font-mono outline-none disabled:opacity-60" />
                            <label className="text-[10px] text-[#94A3B8] mt-3 mb-1.5 block">事故赔付调整说明</label>
                            <textarea disabled={drawerMode === 'view'} className="w-full bg-[#111622] border border-[#1E293B] focus:border-tech-cyan rounded px-2 py-1.5 text-xs text-white outline-none resize-none h-[40px] disabled:opacity-60" placeholder="若调整请填写..." />
                         </div>
                       </div>

                       {/* 分项 */}
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#1E293B]">
                         <div>
                            <div className="text-[10px] text-[#64748B] mb-2 uppercase">转移安置</div>
                            <div className="text-[10px] bg-[#0F172A] p-2 rounded font-mono text-[#94A3B8] border border-[#1E293B]">
                               R = min(N_r × P_r, L_r_once, L_r_year_remaining)
                            </div>
                            <div className="text-[10px] mt-2 grid grid-cols-2 gap-1 text-[#64748B]">
                              <span>N_r: <input type="number" disabled={drawerMode==='view'} defaultValue={0} className="w-12 bg-transparent border-b border-[#334155] text-white"/> 人</span>
                              <span>P_r: 200</span>
                              <span>L_r_once: 50w</span><span>L_r_yr: 150w</span>
                            </div>
                         </div>
                         <div className="bg-[#0F172A]/50 border border-[#1E293B] rounded p-3 flex flex-col justify-center">
                            <label className="text-xs text-[#94A3B8] mb-1.5 block">转移安置金额 (元)</label>
                            <input type="number" disabled defaultValue={activeRecord?.relocationAmount || 0} className="w-full bg-[#111622]/50 border border-[#1E293B] rounded px-2 py-1.5 text-xs text-white font-mono outline-none disabled:opacity-80" />
                         </div>

                         <div>
                            <div className="text-[10px] text-[#64748B] mb-2 uppercase">人身伤亡</div>
                            <div className="text-[10px] bg-[#0F172A] p-2 rounded font-mono text-[#94A3B8] border border-[#1E293B]">
                               C = min(N_c × P_c, L_c_year_remaining)
                            </div>
                            <div className="text-[10px] mt-2 grid grid-cols-2 gap-1 text-[#64748B]">
                              <span>N_c: <input type="number" disabled={drawerMode==='view'} defaultValue={0} className="w-12 bg-transparent border-b border-[#334155] text-white"/> 人</span>
                              <span>P_c: 15w</span>
                              <span>L_c_yr: 300w</span>
                            </div>
                         </div>
                         <div className="bg-[#0F172A]/50 border border-[#1E293B] rounded p-3">
                            <label className="text-xs text-[#94A3B8] mb-1.5 block">人身伤亡金额 (元)</label>
                            <input type="number" disabled={drawerMode === 'view'} defaultValue={activeRecord?.injuryAmount || 0} className="w-full bg-[#111622] border border-[#1E293B] focus:border-tech-cyan rounded px-2 py-1.5 text-xs text-white font-mono outline-none disabled:opacity-60" />
                            <label className="text-[10px] text-[#94A3B8] mt-3 mb-1.5 block">人伤调整说明</label>
                            <textarea disabled={drawerMode === 'view'} className="w-full bg-[#111622] border border-[#1E293B] focus:border-tech-cyan rounded px-2 py-1.5 text-xs text-white outline-none resize-none h-[40px] disabled:opacity-60" placeholder="若调整请填写..." />
                         </div>
                       </div>

                       {/* 汇总 */}
                       <div className="bg-[#1E293B]/30 border border-[#334155] rounded p-4 flex items-center justify-between">
                         <div className="space-y-1">
                            <div className="text-[10px] text-[#94A3B8] uppercase">最终总赔付金额 (元)</div>
                            <div className="text-xs text-[#64748B] font-mono">T_final = min(A + R + C, L_total_year_remaining)</div>
                            <div className="text-[10px] text-green-400 font-mono">剩余保单额度: 25,000,000</div>
                         </div>
                         <div className="text-2xl font-mono text-tech-cyan drop-shadow-[0_0_10px_rgba(0,242,255,0.4)]">
                            {activeRecord ? activeRecord.totalAmount : 5480000}
                         </div>
                       </div>

                    </div>
                 </section>

                 <section>
                    <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">理赔资料</h4>
                    {drawerMode !== 'view' && (
                        <div className="border border-dashed border-[#334155] rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-tech-cyan transition-colors mb-4 bg-[#0F172A]/50">
                           <Upload className="w-6 h-6 text-[#64748B] mb-2" />
                           <span className="text-xs text-[#94A3B8]">点击或拖拽文件到此处上传</span>
                        </div>
                    )}
                    <div className="space-y-2">
                       <div className="bg-[#0F172A] border border-[#1E293B] rounded p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <FileText className="w-4 h-4 text-blue-400" />
                             <div>
                               <div className="text-xs text-white mb-0.5">现场勘查报告.pdf</div>
                               <div className="text-[10px] text-[#64748B]">2.4 MB</div>
                             </div>
                          </div>
                          <button className="text-[10px] text-tech-cyan hover:underline">下载</button>
                       </div>
                       <div className="bg-[#0F172A] border border-[#1E293B] rounded p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <FileText className="w-4 h-4 text-orange-400" />
                             <div>
                               <div className="text-xs text-white mb-0.5">理赔申请书-签章版.pdf</div>
                               <div className="text-[10px] text-[#64748B]">1.1 MB</div>
                             </div>
                          </div>
                          <button className="text-[10px] text-tech-cyan hover:underline">下载</button>
                       </div>
                    </div>
                 </section>

              </div>

              <div className="p-4 border-t border-[#1E293B] bg-[#0F172A] flex justify-end gap-3 shrink-0">
                 <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 rounded text-xs font-medium text-[#94A3B8] border border-[#1E293B] hover:bg-[#1E293B] transition-colors">
                    关闭
                 </button>
                 {drawerMode !== 'view' && (
                   <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 rounded text-xs font-bold bg-[#1E293B] text-white hover:bg-[#334155] border border-[#334155] transition-colors">
                      暂存草稿
                   </button>
                 )}
                 {drawerMode !== 'view' && (
                   <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 rounded text-xs font-bold bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 transition-colors shadow-[0_0_10px_rgba(0,242,255,0.3)]">
                      提交确认
                   </button>
                 )}
              </div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
