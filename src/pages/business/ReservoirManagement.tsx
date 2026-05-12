import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MapPin, AlertTriangle, ShieldCheck, FileText, X, Edit, Eye, ChevronRight } from 'lucide-react';
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
        <button 
          onClick={() => openDrawer('create')}
          className="bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 font-bold px-4 py-2 rounded flex items-center gap-2 text-sm transition-colors shadow-[0_0_10px_rgba(0,242,255,0.3)]"
        >
          <Plus className="w-4 h-4" />
          新建水库
        </button>
      </header>

      {/* Filter Section */}
      <div className="bg-[#111622] border border-[#1E293B] rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">水库名称</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-[#475569]" />
              <input type="text" placeholder="输入名称查询" className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded pl-8 pr-3 py-1.5 text-xs text-white outline-none transition-colors placeholder:text-[#475569]" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">所属地区</label>
            <select className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1.5 text-xs text-white outline-none appearance-none cursor-pointer">
              <option value="">全部地区 (省/市/区县)</option>
              <option value="zj-wz">浙江省 - 温州市</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">承保状态</label>
            <select className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1.5 text-xs text-white outline-none appearance-none cursor-pointer">
              <option value="">全部状态</option>
              <option value="未承保">未承保</option>
              <option value="未生效">未生效</option>
              <option value="保障中">保障中</option>
              <option value="已过保">已过保</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">预警状态</label>
            <select className="w-full bg-[#0F172A] border border-[#1E293B] rounded px-3 py-1.5 text-xs text-white outline-none appearance-none cursor-pointer">
              <option value="">全部分级</option>
              <option value="正常">正常</option>
              <option value="黄色">黄色预警</option>
              <option value="橙色">橙色预警</option>
              <option value="红色">红色预警</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest">监管单位</label>
            <input type="text" placeholder="输入监管单位" className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-tech-cyan rounded px-3 py-1.5 text-xs text-white outline-none transition-colors placeholder:text-[#475569]" />
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0 gap-4 mt-2">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
            {MOCK_LIST.map((row) => (
              <div key={row.id} className="bg-[#111622] border border-[#1E293B] rounded-lg overflow-hidden flex flex-col hover:border-[#334155] transition-colors relative group">
                <div className="p-4 flex-1">
                   <div className="flex justify-between items-start mb-3">
                      <div>
                         <h3 className="text-base font-bold text-white mb-1 group-hover:text-tech-cyan transition-colors">{row.name}</h3>
                         <div className="flex items-center text-xs text-[#64748B] gap-1">
                           <MapPin className="w-3 h-3" />
                           <span className="truncate max-w-[180px]" title={row.location}>{row.location}</span>
                         </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                         <span className={cn("px-2 py-0.5 rounded border text-[10px] whitespace-nowrap", getStatusColor(row.insuranceStatus))}>
                           {row.insuranceStatus}
                         </span>
                         <button 
                            onClick={() => row.warningStatus !== '正常' && navigate(`/risk/warning?reservoirId=${row.id}`)}
                            className={cn("px-2 py-0.5 rounded border text-[10px] whitespace-nowrap inline-flex items-center gap-1", 
                              getStatusColor(row.warningStatus),
                              row.warningStatus !== '正常' && "hover:brightness-125 cursor-pointer"
                            )}
                         >
                           {row.warningStatus !== '正常' && <AlertTriangle className="w-3 h-3" />}
                           {row.warningStatus}
                         </button>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-[#0F172A] border border-[#1E293B] rounded p-2 flex flex-col justify-center">
                         <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest mb-1">当前水位</div>
                         {row.currentLevel ? (
                            <button 
                              onClick={() => navigate(`/monitoring/realtime?reservoirId=${row.id}`)}
                              className="font-mono text-tech-cyan hover:underline flex items-baseline text-lg text-left"
                            >
                              {row.currentLevel.toFixed(2)}<span className="text-[10px] text-[#64748B] ml-0.5">m</span>
                            </button>
                          ) : (
                            <span className="text-[#475569] text-xs h-[28px] flex items-center">暂无数据</span>
                          )}
                      </div>
                      <div className="bg-[#0F172A] border border-[#1E293B] rounded p-2 flex flex-col justify-center">
                         <div className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest mb-1">最近监测时间</div>
                         {row.lastMonitorTime ? (
                            <button 
                              onClick={() => navigate(`/monitoring/realtime?reservoirId=${row.id}`)}
                              className="font-mono text-[#94A3B8] hover:text-tech-cyan hover:underline text-xs text-left"
                            >
                              {row.lastMonitorTime.split(' ')[0]}<br/>
                              {row.lastMonitorTime.split(' ')[1]}
                            </button>
                          ) : (
                            <span className="text-[#475569] text-xs h-[28px] flex items-center">--</span>
                          )}
                      </div>
                   </div>
                </div>
                
                <div className="p-3 border-t border-[#1E293B] bg-[#0F172A] flex items-center justify-between">
                   <button 
                     onClick={() => {}}
                     className={cn("flex items-center justify-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs font-medium w-fit", row.insuranceStatus === '保障中' ? "bg-tech-cyan/10 text-tech-cyan border border-tech-cyan/20 hover:bg-tech-cyan/20" : "bg-[#1E293B] text-[#475569] cursor-not-allowed")} 
                     disabled={row.insuranceStatus !== '保障中'}
                   >
                     <ShieldCheck className="w-3.5 h-3.5" />
                     保险方案
                   </button>
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

    </div>
  );
}
