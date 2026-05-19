import { useState } from 'react';
import { Search, Filter, AlertTriangle, ChevronRight, FileText, Plus, X, Save, Edit, CheckCircle, Calculator, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Events() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'warning' | 'claims'>('warning');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>(''); 
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const openModal = (type: string, item: any = null) => {
    setModalType(type);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const [processType, setProcessType] = useState('预警归因');

  const renderModalContent = () => {
    switch (modalType) {
      case 'view_warning':
        return (
          <div className="space-y-4">
             {[1, 2].map((i) => (
               <div key={i} className="bg-[#111622] p-3 rounded border border-[#1E293B]">
                 <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#1E293B]">
                   <span className="font-bold text-white text-base">预警记录 {i}</span>
                   <span className={cn("text-xs px-2 py-1 rounded", i === 1 ? "bg-orange-500/20 text-orange-400" : "bg-[#1E293B] text-[#94A3B8]")}>
                     {i === 1 ? '待处理' : '已归因'}
                   </span>
                 </div>
                 <div className="grid grid-cols-2 gap-y-3 text-sm">
                   <div><span className="text-[#64748B] block mb-0.5">预警时间</span><span className="text-white font-mono">{i === 1 ? '05-12 14:00' : '05-12 13:00'}</span></div>
                   <div><span className="text-[#64748B] block mb-0.5">预警等级</span><span className="text-orange-400">橙色预警</span></div>
                   <div><span className="text-[#64748B] block mb-0.5">阈值来源</span><span className="text-white">预警线</span></div>
                   <div><span className="text-[#64748B] block mb-0.5">预警类型</span><span className="text-white">水位超汛限</span></div>
                   <div><span className="text-[#64748B] block mb-0.5">水位线(m)</span><span className="text-white font-mono">132.50</span></div>
                   <div><span className="text-[#64748B] block mb-0.5">数据来源</span><span className="text-white">物联设备</span></div>
                 </div>
               </div>
             ))}
          </div>
        );
      case 'process_warning':
        return (
          <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest">处理方式 <span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                   <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="processMode" className="accent-tech-cyan" checked={processType === '预警归因'} onChange={() => setProcessType('预警归因')} />
                      <span className="text-base text-white">预警归因</span>
                   </label>
                   <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="processMode" className="accent-tech-cyan" checked={processType === '解除'} onChange={() => setProcessType('解除')} />
                      <span className="text-base text-white">解除预警</span>
                   </label>
                </div>
             </div>

             {processType === '预警归因' && (
               <div className="space-y-2">
                  <label className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest">预警归因 <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                     <label className="flex items-center gap-2 px-3 py-2.5 rounded bg-[#111622] border border-[#1E293B] cursor-pointer">
                        <input type="checkbox" className="accent-tech-cyan" />
                        <span className="text-sm text-white">台风</span>
                     </label>
                     <label className="flex items-center gap-2 px-3 py-2.5 rounded bg-[#111622] border border-[#1E293B] cursor-pointer">
                        <input type="checkbox" className="accent-tech-cyan" />
                        <span className="text-sm text-white">暴雨</span>
                     </label>
                     <label className="flex items-center gap-2 px-3 py-2.5 rounded bg-[#111622] border border-[#1E293B] cursor-pointer">
                        <input type="checkbox" className="accent-tech-cyan" />
                        <span className="text-sm text-white">洪水</span>
                     </label>
                  </div>
               </div>
             )}

             <div>
               <label className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest mb-1.5 block">处理说明</label>
               <textarea className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-base text-white outline-none h-24 resize-none" placeholder="输入说明文字..."></textarea>
             </div>
             
             <div>
               <label className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest mb-1.5 block">处理附件</label>
               <div className="border border-dashed border-[#1E293B] rounded-lg p-6 flex flex-col items-center justify-center text-[#64748B] hover:text-[#f59e0b] transition-colors cursor-pointer bg-[#111622]">
                 <UploadCloud className="w-8 h-8 mb-2" />
                 <span className="text-sm">点击或拖拽上传附件</span>
               </div>
             </div>
          </div>
        );
      case 'create_claim':
      case 'process_claim':
        return (
          <div className="space-y-5">
             {modalType === 'process_claim' && (
               <div className="bg-[#111622] border border-orange-500/20 bg-orange-500/5 px-3 py-2 rounded flex items-center gap-2">
                 <AlertTriangle className="w-5 h-5 text-orange-400" />
                 <span className="text-sm text-orange-400">待审核确认，请核对理赔参数。</span>
               </div>
             )}

             <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#94A3B8] uppercase tracking-widest">理赔类型</label>
                  <select disabled className="w-full bg-[#111622] border border-[#1E293B] rounded px-2 py-2.5 text-sm text-white outline-none">
                     <option>防洪理赔</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#94A3B8] uppercase tracking-widest">理赔对象</label>
                  <select defaultValue={selectedItem?.name ? 'shanxi' : ''} className="w-full bg-[#111622] border border-[#1E293B] rounded px-2 py-2.5 text-sm text-white outline-none" disabled={modalType === 'process_claim'}>
                     <option value="">选择水库</option>
                     <option value="shanxi">珊溪水库</option>
                     <option value="qiaodun">桥墩水库</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#94A3B8] uppercase tracking-widest">关联保单</label>
                  <select disabled className="w-full bg-[#111622] border border-[#1E293B] rounded px-2 py-2.5 text-sm text-tech-cyan outline-none">
                     <option>POL-20240510-001</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#94A3B8] uppercase tracking-widest">预警事件</label>
                  <select className="w-full bg-[#111622] border border-[#1E293B] rounded px-2 py-2.5 text-sm text-orange-400 outline-none" disabled={modalType === 'process_claim'}>
                     <option value="">(无关联)</option>
                     <option value="EVT-001">EVT-001</option>
                  </select>
                </div>
             </div>

             <div className="space-y-3 bg-[#111622] p-3 rounded-lg border border-[#1E293B]">
                <h4 className="text-sm text-tech-cyan font-bold border-b border-[#1E293B] pb-2">理赔核算详情</h4>
                <div className="flex justify-between items-center bg-[#0B0F17] p-2 rounded border border-[#1E293B]">
                  <span className="text-xs text-[#94A3B8]">基础赔付</span>
                  <input type="number" defaultValue={5480000} disabled={modalType === 'process_claim'} className="w-24 bg-transparent text-right text-sm text-white font-mono outline-none" />
                </div>
                
                <div className="flex items-center gap-2">
                   <div className="flex flex-col bg-[#0B0F17] p-2 rounded border border-[#1E293B] flex-1">
                      <span className="text-xs text-[#94A3B8] mb-1">转移安置人数</span>
                      <input type="number" defaultValue={0} disabled={modalType === 'process_claim'} className="w-full bg-transparent text-sm text-white font-mono outline-none" />
                   </div>
                   <div className="flex flex-col bg-[#0B0F17] p-2 rounded border border-[#1E293B] flex-1">
                      <span className="text-xs text-[#94A3B8] mb-1">对应赔付金额</span>
                      <input type="number" defaultValue={0} disabled={modalType === 'process_claim'} className="w-full bg-transparent text-sm text-white font-mono outline-none" />
                   </div>
                </div>

                <div className="flex items-center gap-2">
                   <div className="flex flex-col bg-[#0B0F17] p-2 rounded border border-[#1E293B] flex-1">
                      <span className="text-xs text-[#94A3B8] mb-1">伤亡赔付人数</span>
                      <input type="number" defaultValue={0} disabled={modalType === 'process_claim'} className="w-full bg-transparent text-sm text-white font-mono outline-none" />
                   </div>
                   <div className="flex flex-col bg-[#0B0F17] p-2 rounded border border-[#1E293B] flex-1">
                      <span className="text-xs text-[#94A3B8] mb-1">对应赔付金额</span>
                      <input type="number" defaultValue={0} disabled={modalType === 'process_claim'} className="w-full bg-transparent text-sm text-white font-mono outline-none" />
                   </div>
                </div>
                
                <div className="border-t border-[#1E293B] pt-2 flex justify-between items-center mt-2">
                   <span className="text-sm font-bold text-white block">汇总金额</span>
                   <span className="text-xl font-mono text-tech-cyan font-bold drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]">
                     ¥5,480,000
                   </span>
                </div>
             </div>
             
             {modalType === 'process_claim' && (
                <div className="space-y-1.5">
                  <label className="text-xs text-[#94A3B8] uppercase tracking-widest">审核意见</label>
                  <textarea className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white outline-none h-16 resize-none" placeholder="输入审核意见(选填)..."></textarea>
                </div>
             )}
          </div>
        );
      case 'create_patrol':
        return (
          <div className="space-y-4">
             <div>
               <label className="block text-sm text-[#94A3B8] mb-1.5">巡查名称</label>
               <input type="text" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-base text-white outline-none" placeholder="专项巡查等" />
             </div>
             <div>
               <label className="block text-sm text-[#94A3B8] mb-1.5">巡查水库</label>
               <select className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-base text-white outline-none">
                 <option>请选择水库</option>
                 <option>桥墩水库</option>
               </select>
             </div>
             <div>
               <label className="block text-sm text-[#94A3B8] mb-1.5">巡查结果描述</label>
               <textarea className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-base text-white outline-none h-24 resize-none" placeholder="输入结果描述..."></textarea>
             </div>
          </div>
        );
        return null;
    }
  };

  const getModalTitle = () => {
    const titles: Record<string, string> = {
      'view_warning': '预警详情',
      'process_warning': '预警处理',
      'create_claim': '发起理赔',
      'process_claim': '确认理赔',
    };
    return titles[modalType] || '处理';
  };

  return (
    <div className="flex flex-col min-h-full fade-in pb-16">
      {/* Header Tabs */}
      <div className="bg-[#111622] sticky top-0 z-10 border-b border-[#1E293B] pt-4">
        <div className="flex justify-between items-center px-4 mb-3">
           <h1 className="text-2xl font-bold text-white">事件中心</h1>
        </div>
        <div className="flex px-2 overflow-x-auto no-scrollbar pb-2 min-w-full">
          {[
            { id: 'warning', label: '预警事件', icon: AlertTriangle },
            { id: 'claims', label: '理赔事件', icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 min-w-[80px] flex flex-col items-center gap-2 py-2 px-1 relative shrink-0",
                activeTab === tab.id ? "text-tech-cyan" : "text-[#64748B] hover:text-[#94A3B8]"
              )}
            >
              <tab.icon className="w-5 h-5 mx-auto" />
              <span className="text-sm font-medium whitespace-nowrap">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-tech-cyan rounded-t-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar & Add Buttons */}
      <div className="bg-[#0F172A] px-4 py-3 flex items-center justify-between gap-2 border-b border-[#1E293B] overflow-x-auto no-scrollbar">
        {activeTab === 'warning' && (
           <div className="flex gap-2 w-full">
              <select className="bg-[#111622] border border-[#1E293B] rounded-full px-3 py-2 text-sm text-white outline-none focus:border-tech-cyan min-w-[100px]">
                 <option value="">全部水库</option>
                 <option value="shanxi">珊溪水库</option>
                 <option value="qiaodun">桥墩水库</option>
              </select>
              <select className="bg-[#111622] border border-[#1E293B] rounded-full px-3 py-2 text-sm text-white outline-none focus:border-tech-cyan min-w-[100px]">
                 <option value="">预警状态</option>
                 <option value="待处理">待处理</option>
                 <option value="已处理">已处理</option>
              </select>
              <input type="date" className="bg-[#111622] border border-[#1E293B] rounded-full px-3 py-2 text-sm text-[#94A3B8] outline-none focus:border-tech-cyan [color-scheme:dark]" />
           </div>
        )}
        
        {activeTab === 'claims' && (
           <div className="flex gap-2 shrink-0 ml-auto w-full justify-end">
             <button onClick={() => navigate('/h5/claims/calculator')} className="px-3 py-2.5 bg-[#1E293B] border border-[#334155] rounded-full text-white shrink-0 flex items-center gap-1 relative text-sm font-medium">
               <Calculator className="w-4 h-4 text-tech-cyan" /> 理赔计算
             </button>
             <button onClick={() => openModal('create_claim')} className="px-3 py-2.5 bg-tech-cyan/10 border border-tech-cyan/20 rounded-full text-tech-cyan text-sm font-medium flex items-center gap-1 shrink-0">
               <Plus className="w-5 h-5" /> 发起理赔
             </button>
           </div>
        )}
      </div>

      {/* List Area */}
      <div className="flex-1 p-4 space-y-3">
        {activeTab === 'warning' && (
          <>
            <div className="bg-[#111622] border border-[#1E293B] rounded-xl p-4 active:scale-[0.98] transition-transform">
              <div className="flex justify-between items-start mb-2">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                   <span className="font-bold text-white text-base">珊溪水库</span>
                 </div>
                 <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-1 rounded">待处理</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 mt-3 pl-4 border-l-2 border-[#1E293B]">
                 <div>
                   <div className="text-xs text-[#64748B]">当前预警等级</div>
                   <div className="text-sm text-white mt-0.5 font-medium">橙色预警</div>
                 </div>
                 <div>
                   <div className="text-xs text-[#64748B]">最高水位线</div>
                   <div className="text-sm text-white mt-0.5 font-mono">135.20m</div>
                 </div>
                 <div>
                   <div className="text-xs text-[#64748B]">当前水位线</div>
                   <div className="text-sm text-white mt-0.5 font-mono">132.50m</div>
                 </div>
                 <div>
                   <div className="text-xs text-[#64748B]">最新预警时间</div>
                   <div className="text-xs text-white mt-0.5 font-mono">05-12 14:00</div>
                 </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1E293B] flex gap-2">
                <button onClick={() => openModal('view_warning', { name: '珊溪水库' })} className="flex-1 px-4 py-2.5 bg-[#1E293B] text-white hover:bg-[#334155] rounded text-sm font-bold transition-colors">
                   查看明细
                </button>
                <button onClick={() => openModal('process_warning')} className="flex-1 px-4 py-2.5 bg-tech-cyan text-[#0B0F17] rounded text-sm font-bold shadow-[0_0_8px_rgba(0,242,255,0.4)]">
                   去处理
                </button>
              </div>
            </div>

            <div className="bg-[#111622] border border-[#1E293B] rounded-xl p-4 opacity-70">
              <div className="flex justify-between items-start mb-2">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                   <span className="font-bold text-white text-base">桥墩水库</span>
                 </div>
                 <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded">已解除</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 mt-3 pl-4 border-l-2 border-[#1E293B]">
                 <div>
                   <div className="text-xs text-[#64748B]">最高水位线</div>
                   <div className="text-sm text-white mt-0.5 font-mono">128.10m</div>
                 </div>
                 <div>
                   <div className="text-xs text-[#64748B]">最新预警时间</div>
                   <div className="text-xs text-white mt-0.5 font-mono">05-10 09:00</div>
                 </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1E293B]">
                <button onClick={() => openModal('view_warning', { name: '桥墩水库' })} className="w-full px-4 py-2.5 bg-[#1E293B] text-white hover:bg-[#334155] rounded text-sm font-bold transition-colors">
                   查看明细
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'claims' && (
           <div className="bg-[#111622] border border-[#1E293B] rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                 <div className="font-bold text-white text-base flex items-center gap-2">
                   <FileText className="w-5 h-5 text-blue-500" />
                   珊溪水库
                 </div>
                 <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-1 rounded">待审核确认</span>
              </div>
              <div className="mt-3 bg-[#0F172A] p-3 rounded-lg border border-[#1E293B] flex items-end justify-between">
                 <div>
                   <div className="text-xs text-[#64748B] mb-1">总赔付金额</div>
                   <div className="text-xl font-bold text-white font-mono flex items-baseline gap-1">
                     <span className="text-sm text-[#94A3B8]">¥</span>150,000.00
                   </div>
                 </div>
                 <div className="text-xs text-[#64748B] text-right">
                    结构: 10w / 转移: 5w
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-y-2 mt-3">
                 <div>
                   <div className="text-xs text-[#64748B]">发起时间</div>
                   <div className="text-xs text-white mt-0.5 font-mono">05-11 10:30</div>
                 </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1E293B] flex gap-2">
                <button onClick={() => openModal('view_claim', { name: '珊溪水库' })} className="flex-1 py-2 bg-[#1E293B] text-white hover:bg-[#334155] rounded text-sm font-bold transition-colors text-center">
                   查看详情
                </button>
                <button onClick={() => openModal('reject_claim', { name: '珊溪水库' })} className="py-2 px-4 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded text-sm font-bold transition-colors text-center">
                   驳回
                </button>
                <button onClick={() => openModal('process_claim', { name: '珊溪水库' })} className="flex-1 py-2 bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 rounded text-sm font-bold transition-colors shadow-[0_0_8px_rgba(0,242,255,0.4)] text-center">
                   确认理赔
                </button>
              </div>
           </div>
        )}

      </div>

      {/* Action Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 z-50 p-4 pb-8 pointer-events-none">
              <motion.div 
                 initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }}
                 className="bg-[#0F172A] border border-[#1E293B] rounded-2xl w-full shadow-2xl flex flex-col pointer-events-auto max-h-[85vh] overflow-hidden"
              >
                <div className="p-4 border-b border-[#1E293B] flex items-center justify-between shrink-0 bg-[#111622]">
                  <h3 className="text-base font-bold text-white">
                    {getModalTitle()}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-white bg-[#1E293B] p-1.5 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-5 flex-1 overflow-y-auto no-scrollbar bg-[#0B0F17]">
                   {renderModalContent()}
                </div>
                
                <div className="p-4 border-t border-[#1E293B] flex justify-between gap-3 bg-[#111622] shrink-0">
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 rounded-lg text-base font-medium text-[#94A3B8] border border-[#1E293B] hover:bg-[#1E293B] transition-colors">
                    取消
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 rounded-lg text-base font-medium bg-tech-cyan text-[#0B0F17] hover:bg-tech-cyan/90 transition-colors shadow-[0_0_10px_rgba(0,242,255,0.3)]">
                    提交保存
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

