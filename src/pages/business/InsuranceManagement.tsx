import { useState } from 'react';
import { Search, Plus, FileText, Trash2, Edit, Eye, ShieldCheck, Calendar, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type InsuranceRecord = {
  id: string;
  policyId: string;
  reservoirName: string;
  period: string;
  premium: number;
  deductible: number;
  annualLimit: number;
  company: string;
  salesman: string;
  salesmanPhone: string;
  claimsman: string;
  claimsmanPhone: string;
  status: '未生效' | '保障中' | '已过保';
  creator: string;
  createdAt: string;
};

const MOCK_LIST: InsuranceRecord[] = [
  {
    id: '1',
    policyId: 'POL-20240510-001',
    reservoirName: '珊溪水库',
    period: '2024-01-01 至 2024-12-31',
    premium: 500000,
    deductible: 100000,
    annualLimit: 30000000,
    company: '中国人民财产保险股份有限公司',
    salesman: '张三',
    salesmanPhone: '13800001111',
    claimsman: '李四',
    claimsmanPhone: '13900002222',
    status: '保障中',
    creator: 'Admin',
    createdAt: '2023-12-20 10:30'
  },
  {
    id: '2',
    policyId: 'POL-20240510-002',
    reservoirName: '桥墩水库',
    period: '2023-05-01 至 2024-04-30',
    premium: 450000,
    deductible: 100000,
    annualLimit: 25000000,
    company: '中国平安财产保险股份有限公司',
    salesman: '王五',
    salesmanPhone: '13700003333',
    claimsman: '赵六',
    claimsmanPhone: '13600004444',
    status: '已过保',
    creator: 'System',
    createdAt: '2023-04-15 14:20'
  },
  {
    id: '3',
    policyId: 'POL-20240510-003',
    reservoirName: '赵山渡水库',
    period: '2024-06-01 至 2025-05-31',
    premium: 600000,
    deductible: 150000,
    annualLimit: 35000000,
    company: '太平洋财产保险股份有限公司',
    salesman: '孙七',
    salesmanPhone: '13500005555',
    claimsman: '周八',
    claimsmanPhone: '13400006666',
    status: '未生效',
    creator: 'Admin',
    createdAt: '2024-05-10 09:15'
  }
];

export default function InsuranceManagement() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit' | 'view'>('create');
  const [activeRecord, setActiveRecord] = useState<InsuranceRecord | null>(null);

  const [tiers, setTiers] = useState([
    { id: '1', name: '一级赔付', start: '142.04', end: '144.04', fixed: '400,000', price: '8,000', limit: '2,000,000' },
    { id: '2', name: '二级赔付', start: '144.04', end: '147.71', fixed: '2,000,000', price: '30,000', limit: '13,000,000' },
    { id: '3', name: '三级赔付', start: '147.71', end: '--', fixed: '30,000,000', price: '--', limit: '--' },
  ]);

  const [floats, setFloats] = useState([
    { id: '1', duration: '<= 1 天', ratio: '100%', increment: '0%', color: 'text-white' },
    { id: '2', duration: '1 ~ 3 天', ratio: '110%', increment: '10%', color: 'text-blue-400' },
    { id: '3', duration: '3 ~ 7 天', ratio: '120%', increment: '20%', color: 'text-orange-400' },
    { id: '4', duration: '> 7 天', ratio: '130%', increment: '30%', color: 'text-red-400' },
  ]);

  const handleAddTier = () => {
    setTiers([...tiers, { id: Date.now().toString(), name: `新增赔付阶梯${tiers.length+1}`, start: '0', end: '0', fixed: '0', price: '0', limit: '0' }]);
  };

  const handleAddFloat = () => {
    setFloats([...floats, { id: Date.now().toString(), duration: '新档位', ratio: '100%', increment: '0%', color: 'text-white' }]);
  };

  const openDrawer = (mode: 'create' | 'edit' | 'view', record?: InsuranceRecord) => {
    setDrawerMode(mode);
    setActiveRecord(record || null);
    setIsDrawerOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '保障中': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case '未生效': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case '已过保': return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="h-full flex flex-col p-6 gap-4 fade-in duration-300">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
             <span className="w-1.5 h-5 bg-tech-cyan rounded-sm"></span>
             <span>保险管理</span>
          </h2>
          <p className="text-xs text-[#64748B] mt-1 pl-4 uppercase tracking-wider font-mono">
            BUSINESS / INSURANCE MANAGEMENT
          </p>
        </div>
        <button 
          onClick={() => openDrawer('create')}
          className="bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 font-bold px-4 py-2 rounded flex items-center gap-2 text-sm transition-colors shadow-[0_0_10px_rgba(0,242,255,0.3)]"
        >
          <Plus className="w-4 h-4" />
          新建保单
        </button>
      </header>

      {/* Filter Section */}
      <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-4 shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">保单号</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-[#475569]" />
              <input type="text" placeholder="精确或模糊查询" className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded pl-8 pr-3 py-1.5 text-xs text-white outline-none transition-colors placeholder:text-[#475569]" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">关联水库</label>
            <select className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1.5 text-xs text-white outline-none appearance-none cursor-pointer">
              <option value="">全部水库</option>
              <option value="shanxi">珊溪水库</option>
              <option value="qiaodun">桥墩水库</option>
              <option value="zhaoshandu">赵山渡水库</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">承保状态</label>
            <select className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1.5 text-xs text-white outline-none appearance-none cursor-pointer">
              <option value="">全部状态</option>
              <option value="未生效">未生效</option>
              <option value="保障中">保障中</option>
              <option value="已过保">已过保</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">保险期间</label>
            <div className="flex items-center gap-2">
              <input type="date" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-2 py-1.5 text-xs text-white outline-none" />
              <span className="text-[#475569]">-</span>
              <input type="date" className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-2 py-1.5 text-xs text-white outline-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">承保公司</label>
            <input type="text" placeholder="模糊查询" className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded px-3 py-1.5 text-xs text-white outline-none transition-colors placeholder:text-[#475569]" />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 bg-[#111622] border border-[#1E293B] rounded-lg flex flex-col min-h-0">
        <div className="overflow-x-auto overflow-y-auto flex-1 no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#0F172A] text-[10px] text-[#64748B] uppercase tracking-widest border-b border-[#1E293B]">
                <th className="px-4 py-3 font-medium">保单号</th>
                <th className="px-4 py-3 font-medium">承保对象</th>
                <th className="px-4 py-3 font-medium">保险期限</th>
                <th className="px-4 py-3 font-medium text-right">保险费(元)</th>
                <th className="px-4 py-3 font-medium text-right">每次事故绝对免赔额(元)</th>
                <th className="px-4 py-3 font-medium text-right">年累计赔偿限额(元)</th>
                <th className="px-4 py-3 font-medium">承保公司</th>
                <th className="px-4 py-3 font-medium">承保状态</th>
                <th className="px-4 py-3 font-medium">创建信息</th>
                <th className="px-4 py-3 font-medium text-right sticky right-0 bg-[#0F172A]">操作</th>
              </tr>
            </thead>
            <tbody className="text-xs text-[#E0E6ED] divide-y divide-[#1E293B]">
              {MOCK_LIST.map((row) => (
                <tr key={row.id} className="hover:bg-[#1E293B]/30 transition-colors group">
                  <td className="px-4 py-3 font-medium text-white">{row.policyId}</td>
                  <td className="px-4 py-3 text-tech-cyan hover:underline cursor-pointer">{row.reservoirName}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-[#94A3B8]">
                      <Calendar className="w-3 h-3 text-[#475569]" />
                      {row.period}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-white">{(row.premium / 10000).toFixed(2)}万</td>
                  <td className="px-4 py-3 text-right font-mono text-white">{(row.deductible / 10000).toFixed(2)}万</td>
                  <td className="px-4 py-3 text-right font-mono text-white">{(row.annualLimit / 10000).toFixed(2)}万</td>
                  <td className="px-4 py-3 text-[#94A3B8]">{row.company}</td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-0.5 rounded border text-[10px] whitespace-nowrap", getStatusColor(row.status))}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-white">{row.creator}</span>
                      <span className="text-[10px] text-[#64748B] font-mono">{row.createdAt}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right sticky right-0 bg-[#111622] group-hover:bg-[#151c2a] transition-colors border-l border-[#1E293B]">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => openDrawer('view', row)}
                         className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="查看详情"
                       >
                         <Eye className="w-4 h-4" />
                       </button>
                       <button 
                         onClick={() => openDrawer('edit', row)}
                         className="p-1.5 text-[#64748B] hover:text-tech-cyan hover:bg-[#1E293B] rounded transition-colors" title="编辑保单"
                       >
                         <Edit className="w-4 h-4" />
                       </button>
                       <button 
                         className="p-1.5 text-[#64748B] hover:text-red-400 hover:bg-[#1E293B] rounded transition-colors" title="删除保单"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-[#1E293B] bg-[#0F172A] flex items-center justify-between text-xs text-[#64748B] shrink-0">
          <span>共 <strong className="text-white font-mono">3</strong> 条记录</span>
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
              className="fixed top-0 right-0 h-full w-[600px] sm:w-[800px] bg-[#111622] border-l border-[#1E293B] shadow-[0_0_40px_rgba(0,0,0,0.8)] z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#1E293B] bg-[#0F172A] shrink-0">
                 <h3 className="text-sm font-bold text-white flex items-center gap-2">
                   {drawerMode === 'create' ? <Plus className="w-4 h-4 text-tech-cyan" /> : drawerMode === 'edit' ? <Edit className="w-4 h-4 text-tech-cyan"/> : <FileText className="w-4 h-4 text-tech-cyan"/>}
                   {drawerMode === 'create' ? '新建保单配置' : drawerMode === 'edit' ? '编辑保单配置' : '保单配置详情'}
                 </h3>
                 <button onClick={() => setIsDrawerOpen(false)} className="px-2 py-1 text-[#64748B] hover:text-white hover:bg-slate-800 rounded transition-colors flex items-center justify-center border border-transparent hover:border-slate-700">
                    <X className="w-4 h-4 mr-1" /> 关闭
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                 {/* 基础信息 */}
                 <section>
                    <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      基础信息
                    </h4>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">保单号 <span className="text-red-500">*</span></label>
                        <input type="text" disabled={drawerMode === 'view'} defaultValue={activeRecord?.policyId} className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60 disabled:cursor-not-allowed" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">承保对象 <span className="text-red-500">*</span></label>
                        <select disabled={drawerMode === 'view'} defaultValue={activeRecord?.reservoirName || ''} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60">
                           <option value="">请选择水库</option>
                           <option value="珊溪水库">珊溪水库</option>
                           <option value="桥墩水库">桥墩水库</option>
                        </select>
                      </div>
                      <div className="space-y-1.5 col-span-2">
                        <label className="text-xs text-[#94A3B8]">保险期限 <span className="text-red-500">*</span></label>
                        <div className="flex items-center gap-2 w-full">
                          <input type="date" disabled={drawerMode === 'view'} className="flex-1 bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                          <span className="text-[#475569]">至</span>
                          <input type="date" disabled={drawerMode === 'view'} className="flex-1 bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">保险费 (元) <span className="text-red-500">*</span></label>
                        <input type="number" disabled={drawerMode === 'view'} defaultValue={activeRecord?.premium} className="w-full bg-[#0F172A] border border-[#1E293B] font-mono rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">每次事故绝对免赔额 (元) <span className="text-red-500">*</span></label>
                        <input type="number" disabled={drawerMode === 'view'} defaultValue={activeRecord?.deductible || 100000} className="w-full bg-[#0F172A] border border-[#1E293B] font-mono rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">年累计赔偿限额 (元) <span className="text-red-500">*</span></label>
                        <input type="number" disabled={drawerMode === 'view'} defaultValue={activeRecord?.annualLimit || 30000000} className="w-full bg-[#0F172A] border border-[#1E293B] font-mono rounded px-3 py-2 text-xs text-green-400 outline-none disabled:opacity-60" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">承保公司 <span className="text-red-500">*</span></label>
                        <input type="text" disabled={drawerMode === 'view'} defaultValue={activeRecord?.company} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                      </div>
                    </div>
                 </section>

                 {/* 联系人 */}
                 <section className="bg-[#0F172A]/50 border border-[#1E293B] rounded p-4">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">保险业务员 <span className="text-red-500">*</span></label>
                        <input type="text" disabled={drawerMode === 'view'} defaultValue={activeRecord?.salesman} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">业务员联系方式 <span className="text-red-500">*</span></label>
                        <input type="text" disabled={drawerMode === 'view'} defaultValue={activeRecord?.salesmanPhone} className="w-full bg-[#0F172A] border border-[#1E293B] font-mono rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">理赔人员 <span className="text-red-500">*</span></label>
                        <input type="text" disabled={drawerMode === 'view'} defaultValue={activeRecord?.claimsman} className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8]">理赔人员联系方式 <span className="text-red-500">*</span></label>
                        <input type="text" disabled={drawerMode === 'view'} defaultValue={activeRecord?.claimsmanPhone} className="w-full bg-[#0F172A] border border-[#1E293B] font-mono rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
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
                                {drawerMode !== 'view' && <th className="px-3 py-2 font-medium text-right">操作</th>}
                              </tr>
                            </thead>
                            <tbody className="text-xs text-white divide-y divide-[#1E293B]">
                               {tiers.map((t, index) => (
                                 <tr key={t.id}>
                                    <td className="px-3 py-2">
                                      {drawerMode !== 'view' ? <input className="w-20 bg-[#111622] rounded px-2 py-1 text-xs border border-[#1E293B] focus:border-tech-cyan outline-none" value={t.name} onChange={(e) => { const nt = [...tiers]; nt[index].name = e.target.value; setTiers(nt); }}/> : t.name}
                                    </td>
                                    <td className="px-3 py-2 font-mono">
                                      {drawerMode !== 'view' ? <input className="w-16 bg-[#111622] rounded px-2 py-1 text-xs border border-[#1E293B] focus:border-tech-cyan outline-none" value={t.start} onChange={(e) => { const nt = [...tiers]; nt[index].start = e.target.value; setTiers(nt); }}/> : t.start}
                                    </td>
                                    <td className="px-3 py-2 font-mono text-[#475569]">
                                      {drawerMode !== 'view' ? <input className="w-16 bg-[#111622] rounded px-2 py-1 text-xs border border-[#1E293B] focus:border-tech-cyan outline-none" value={t.end} onChange={(e) => { const nt = [...tiers]; nt[index].end = e.target.value; setTiers(nt); }}/> : t.end}
                                    </td>
                                    <td className="px-3 py-2 font-mono text-orange-400">
                                      {drawerMode !== 'view' ? <input className="w-24 bg-[#111622] rounded px-2 py-1 text-xs border border-[#1E293B] focus:border-tech-cyan outline-none" value={t.fixed} onChange={(e) => { const nt = [...tiers]; nt[index].fixed = e.target.value; setTiers(nt); }}/> : t.fixed}
                                    </td>
                                    <td className="px-3 py-2 font-mono text-[#475569]">
                                      {drawerMode !== 'view' ? <input className="w-20 bg-[#111622] rounded px-2 py-1 text-xs border border-[#1E293B] focus:border-tech-cyan outline-none" value={t.price} onChange={(e) => { const nt = [...tiers]; nt[index].price = e.target.value; setTiers(nt); }}/> : t.price}
                                    </td>
                                    <td className="px-3 py-2 font-mono text-[#475569]">
                                      {drawerMode !== 'view' ? <input className="w-24 bg-[#111622] rounded px-2 py-1 text-xs border border-[#1E293B] focus:border-tech-cyan outline-none" value={t.limit} onChange={(e) => { const nt = [...tiers]; nt[index].limit = e.target.value; setTiers(nt); }}/> : t.limit}
                                    </td>
                                    {drawerMode !== 'view' && (
                                       <td className="px-3 py-2 text-right">
                                         <div className="flex items-center justify-end gap-1">
                                            <button onClick={() => setTiers(tiers.filter(ti => ti.id !== t.id))} className="p-1 text-[#64748B] hover:text-red-400 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                                         </div>
                                       </td>
                                    )}
                                 </tr>
                               ))}
                            </tbody>
                          </table>
                        </div>
                        {drawerMode !== 'view' && (
                          <button onClick={handleAddTier} className="mt-3 text-xs text-tech-cyan hover:underline flex items-center gap-1"><Plus className="w-3 h-3"/>添加阶梯</button>
                        )}
                      </div>

                      {/* 上浮 */}
                      <div className="bg-[#111622] border border-[#1E293B] rounded p-4">
                        <div className="flex items-center justify-between mb-3">
                           <h5 className="text-xs text-white font-bold">上浮赔额配置</h5>
                           <label className="flex items-center gap-2 cursor-pointer">
                              <span className="text-[10px] text-[#64748B]">启用上浮</span>
                              <input type="checkbox" className="accent-tech-cyan" defaultChecked disabled={drawerMode === 'view'} />
                           </label>
                        </div>
                        <div className="flex flex-col text-xs">
                             <table className="w-full text-left bg-[#0F172A] border border-[#1E293B] rounded mt-2">
                                <thead>
                                  <tr className="text-[10px] text-[#64748B] border-b border-[#1E293B]">
                                    <th className="px-3 py-2 font-medium">临时淹没时长档位</th>
                                    <th className="px-3 py-2 font-medium">赔付系数</th>
                                    <th className="px-3 py-2 font-medium">增量上浮比例</th>
                                    {drawerMode !== 'view' && <th className="px-3 py-2 font-medium text-right">操作</th>}
                                  </tr>
                                </thead>
                                <tbody className="text-xs text-white divide-y divide-[#1E293B]">
                                   {floats.map((f, index) => (
                                      <tr key={f.id}>
                                        <td className="px-3 py-2">
                                          {drawerMode !== 'view' ? <input className="w-24 bg-[#111622] rounded px-2 py-1 text-xs border border-[#1E293B] focus:border-tech-cyan outline-none" value={f.duration} onChange={(e) => { const nf = [...floats]; nf[index].duration = e.target.value; setFloats(nf); }}/> : f.duration}
                                        </td>
                                        <td className={cn("px-3 py-2 font-mono", f.color)}>
                                          {drawerMode !== 'view' ? <input className="w-20 bg-[#111622] rounded px-2 py-1 text-xs border border-[#1E293B] focus:border-tech-cyan outline-none text-white" value={f.ratio} onChange={(e) => { const nf = [...floats]; nf[index].ratio = e.target.value; setFloats(nf); }}/> : f.ratio}
                                        </td>
                                        <td className={cn("px-3 py-2 font-mono", f.color)}>
                                          {drawerMode !== 'view' ? <input className="w-20 bg-[#111622] rounded px-2 py-1 text-xs border border-[#1E293B] focus:border-tech-cyan outline-none text-white" value={f.increment} onChange={(e) => { const nf = [...floats]; nf[index].increment = e.target.value; setFloats(nf); }}/> : f.increment}
                                        </td>
                                        {drawerMode !== 'view' && (
                                           <td className="px-3 py-2 text-right">
                                             <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => setFloats(floats.filter(fl => fl.id !== f.id))} className="p-1 text-[#64748B] hover:text-red-400 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                                             </div>
                                           </td>
                                        )}
                                      </tr>
                                   ))}
                                </tbody>
                             </table>
                             {drawerMode !== 'view' && (
                                <button onClick={handleAddFloat} className="mt-3 w-fit text-xs text-tech-cyan hover:underline flex items-center gap-1"><Plus className="w-3 h-3"/>添加上浮档位</button>
                             )}
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
                           <label className="text-xs text-[#94A3B8]">每人每次赔付金额 (元) <span className="text-red-500">*</span></label>
                           <input type="number" disabled={drawerMode === 'view'} defaultValue="200" className="w-full bg-[#0F172A] border border-[#1E293B] font-mono rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                         </div>
                         <div className="space-y-1.5">
                           <label className="text-xs text-[#94A3B8]">每次赔付限额 (元) <span className="text-red-500">*</span></label>
                           <input type="number" disabled={drawerMode === 'view'} defaultValue="500000" className="w-full bg-[#0F172A] border border-[#1E293B] font-mono rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                         </div>
                         <div className="space-y-1.5">
                           <label className="text-xs text-[#94A3B8]">年累计赔付限额 (元) <span className="text-red-500">*</span></label>
                           <input type="number" disabled={drawerMode === 'view'} defaultValue="2000000" className="w-full bg-[#0F172A] border border-[#1E293B] font-mono rounded px-3 py-2 text-xs text-blue-400 outline-none disabled:opacity-60" />
                         </div>
                      </div>
                    </section>
                    <section>
                      <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">人身伤亡规则</h4>
                      <div className="space-y-3">
                         <div className="space-y-1.5">
                           <label className="text-xs text-[#94A3B8]">每人每次赔付金额 (元) <span className="text-red-500">*</span></label>
                           <input type="number" disabled={drawerMode === 'view'} defaultValue="150000" className="w-full bg-[#0F172A] border border-[#1E293B] font-mono rounded px-3 py-2 text-xs text-white outline-none disabled:opacity-60" />
                         </div>
                         <div className="space-y-1.5">
                           <label className="text-xs text-[#94A3B8]">年累计赔付限额 (元) <span className="text-red-500">*</span></label>
                           <input type="number" disabled={drawerMode === 'view'} defaultValue="5000000" className="w-full bg-[#0F172A] border border-[#1E293B] font-mono rounded px-3 py-2 text-xs text-blue-400 outline-none disabled:opacity-60" />
                         </div>
                      </div>
                    </section>
                 </div>
              </div>

              <div className="p-4 border-t border-[#1E293B] bg-[#0F172A] flex justify-end gap-3 shrink-0">
                 <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 rounded text-xs font-medium text-[#94A3B8] border border-[#1E293B] hover:bg-[#1E293B] transition-colors">
                    取消
                 </button>
                 {drawerMode !== 'view' ? (
                   <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 rounded text-xs font-bold bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 transition-colors shadow-[0_0_10px_rgba(0,242,255,0.3)]">
                      保存配置
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

    </div>
  );
}
