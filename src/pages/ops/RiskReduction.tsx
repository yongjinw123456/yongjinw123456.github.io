import { useState } from 'react';
import { 
  Search, Plus, ShieldCheck, FileSearch, Target, 
  Settings, Trash2, X, FileText, CheckCircle, Save, Download, 
  AlertTriangle, UploadCloud, Edit, Eye, ShieldAlert,
  Link as LinkIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type TabType = 'patrol' | 'survey' | 'rectification';

export default function RiskReduction() {
  const [activeTab, setActiveTab] = useState<TabType>('patrol');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modalType, setModalType] = useState<TabType | 'rectification_from_patrol'>('patrol');
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [hasHiddenDangers, setHasHiddenDangers] = useState(false);
  const [rectStatus, setRectStatus] = useState('未整改');

  const handleOpenModal = (type: TabType | 'rectification_from_patrol', mode: 'create' | 'edit' = 'create') => {
    setModalType(type);
    setModalMode(mode);
    setIsModalOpen(true);
    setHasHiddenDangers(false); // reset
    setRectStatus('未整改');
  };

  return (
    <div className="h-full flex flex-col fade-in relative">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#1E293B] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#f59e0b]/20 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-[#f59e0b]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">风险减量管理</h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono uppercase tracking-wider">Ops / Risk Reduction</p>
          </div>
        </div>
        
        <div className="flex items-center p-1 bg-[#111622] border border-[#1E293B] rounded-lg">
          <button 
            onClick={() => setActiveTab('patrol')}
            className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-colors", activeTab === 'patrol' ? "bg-[#1E293B] text-white shadow-sm" : "text-[#64748B] hover:text-[#94A3B8]")}
          >
            安全巡查
          </button>
          <button 
            onClick={() => setActiveTab('survey')}
            className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-colors", activeTab === 'survey' ? "bg-[#1E293B] text-white shadow-sm" : "text-[#64748B] hover:text-[#94A3B8]")}
          >
            第三方资产调查
          </button>
          <button 
            onClick={() => setActiveTab('rectification')}
            className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-colors", activeTab === 'rectification' ? "bg-[#1E293B] text-white shadow-sm" : "text-[#64748B] hover:text-[#94A3B8]")}
          >
            隐患整改
          </button>
        </div>
      </header>

      {/* Filters & Actions */}
      <div className="p-6 shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-[#f59e0b] outline-none">
            <option value="">全部水库对象</option>
            <option value="1">珊溪水库</option>
            <option value="2">桥墩水库</option>
          </select>
          
          {activeTab === 'patrol' && (
            <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-[#f59e0b] outline-none">
              <option value="">是否存在隐患</option>
              <option value="yes">是</option>
              <option value="no">否</option>
            </select>
          )}

          {activeTab === 'patrol' && (
            <input type="date" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-[#94A3B8] focus:border-[#f59e0b] outline-none [color-scheme:dark]" />
          )}

          {activeTab === 'survey' && (
            <div className="flex items-center gap-2">
              <input type="date" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-[#94A3B8] focus:border-[#f59e0b] outline-none [color-scheme:dark]" placeholder="开始日期" />
              <span className="text-[#64748B]">-</span>
              <input type="date" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-[#94A3B8] focus:border-[#f59e0b] outline-none [color-scheme:dark]" placeholder="结束日期" />
            </div>
          )}
          
          {activeTab === 'rectification' && (
            <>
              <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-[#f59e0b] outline-none">
                 <option value="">隐患来源</option>
                 <option value="patrol">安全巡查</option>
                 <option value="survey">第三方资产调查</option>
              </select>
              <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-[#f59e0b] outline-none">
                <option value="">整改状态</option>
                <option value="未整改">未整改</option>
                <option value="整改中">整改中</option>
                <option value="已整改">已整改</option>
                <option value="已闭环">已闭环</option>
              </select>
            </>
          )}

          <div className="relative">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
             <input type="text" placeholder="关键字搜索..." className="bg-[#111622] border border-[#1E293B] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-[#f59e0b] outline-none" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          
          {activeTab === 'patrol' && (
            <button onClick={() => handleOpenModal('patrol', 'create')} className="flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Plus className="w-4 h-4" /> 新增巡查
            </button>
          )}
          {activeTab === 'survey' && (
            <button onClick={() => handleOpenModal('survey', 'create')} className="flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Plus className="w-4 h-4" /> 新增资产调查
            </button>
          )}
        </div>
      </div>

      {/* Table content placeholder */}
      <div className="px-6 pb-6 flex-1 overflow-hidden flex flex-col">
        <div className="bg-[#111622] border border-[#1E293B] rounded-lg w-full flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto no-scrollbar">
            {activeTab === 'patrol' && <PatrolTable handleOpenModal={handleOpenModal} setIsDrawerOpen={setIsDrawerOpen} />}
            {activeTab === 'survey' && <SurveyTable handleOpenModal={handleOpenModal} setIsDrawerOpen={setIsDrawerOpen} />}
            {activeTab === 'rectification' && <RectificationTable handleOpenModal={handleOpenModal} setIsDrawerOpen={setIsDrawerOpen} />}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
      {isModalOpen && (
        <>
          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          </motion.div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
               className="bg-[#0F172A] border border-[#1E293B] rounded-xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh] pointer-events-auto">
              <div className="p-6 border-b border-[#1E293B] flex items-center justify-between shrink-0 bg-[#111622] rounded-t-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {modalMode === 'create' ? <Plus className="w-5 h-5 text-[#f59e0b]" /> : <Edit className="w-5 h-5 text-[#f59e0b]" />}
                  {modalType === 'patrol' && (modalMode === 'create' ? '新增安全巡查' : '编辑安全巡查')}
                  {modalType === 'survey' && (modalMode === 'create' ? '新增第三方资产调查' : '编辑第三方资产调查')}
                  {(modalType === 'rectification' || modalType === 'rectification_from_patrol') && '隐患整改处理'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors p-1.5 flex items-center justify-center">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto space-y-6 no-scrollbar relative min-h-0">
                
                {/* Form specifically for Patrol */}
                {modalType === 'patrol' && (
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1.5">巡查名称 <span className="text-red-500">*</span></label>
                         <input type="text" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none transition-colors" placeholder="1-100 个字符" />
                       </div>
                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1.5">巡查对象 <span className="text-red-500">*</span></label>
                         <select className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none transition-colors">
                           <option value="">请选择水库</option>
                           <option value="1">珊溪水库</option>
                           <option value="2">桥墩水库</option>
                         </select>
                       </div>
                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1.5">巡查人员 <span className="text-red-500">*</span></label>
                         <input type="text" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none transition-colors" placeholder="1-50 个字符" />
                       </div>
                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1.5">巡查日期 <span className="text-red-500">*</span></label>
                         <input type="date" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none transition-colors [color-scheme:dark]" />
                       </div>
                     </div>
                     
                     <div>
                       <label className="block text-xs text-[#94A3B8] mb-1.5">具体巡查结果描述 <span className="text-red-500">*</span></label>
                       <textarea className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none h-24 resize-none transition-colors" placeholder="1-1000 个字符"></textarea>
                     </div>

                     <div className="flex items-center justify-between p-4 bg-[#111622] border border-[#1E293B] rounded-lg">
                       <div>
                         <div className="text-sm font-medium text-white mb-0.5">是否存在隐患</div>
                         <div className="text-xs text-[#64748B]">标记本次巡查是否发现需要整改的问题</div>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={hasHiddenDangers} onChange={(e) => setHasHiddenDangers(e.target.checked)} />
                          <div className="w-11 h-6 bg-[#1E293B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                       </label>
                     </div>

                     {hasHiddenDangers && (
                       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                         <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                           <h4 className="text-sm font-bold text-white">隐患列表</h4>
                           <button className="text-xs flex items-center gap-1 text-[#f59e0b] hover:text-[#d97706] hover:bg-[#f59e0b]/10 px-2 py-1 rounded transition-colors"><Plus className="w-3 h-3" /> 添加隐患</button>
                         </div>
                         <div className="space-y-4 p-4 border border-red-500/20 bg-red-500/5 rounded-lg relative group">
                           <button className="absolute top-2 right-2 text-[#94A3B8] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                           <div>
                             <label className="block text-xs text-[#94A3B8] mb-1.5">隐患描述 <span className="text-red-500">*</span></label>
                             <textarea className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none h-20 resize-none transition-colors" placeholder="描述隐患具体情况 1-1000个字符"></textarea>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                             <div>
                               <label className="block text-xs text-[#94A3B8] mb-1.5">隐患等级 <span className="text-red-500">*</span></label>
                               <select className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none transition-colors">
                                 <option value="">请选择级别</option>
                                 <option value="1">一般隐患</option>
                                 <option value="2">重大隐患</option>
                               </select>
                             </div>
                           </div>
                           <div>
                             <label className="block text-xs text-[#94A3B8] mb-1.5">隐患图片上传</label>
                             <div className="border border-dashed border-[#1E293B] hover:border-[#f59e0b]/50 rounded-lg p-4 flex flex-col items-center justify-center text-[#64748B] hover:text-[#f59e0b] transition-colors cursor-pointer bg-[#111622]">
                               <UploadCloud className="w-6 h-6 mb-2" />
                               <span className="text-xs">点击或拖拽上传图片</span>
                             </div>
                           </div>
                         </div>
                       </motion.div>
                     )}

                     <div>
                       <label className="block text-xs text-[#94A3B8] mb-1.5">相关资料上传</label>
                       <div className="border border-[#1E293B] rounded-lg p-4 flex flex-col items-center justify-center text-[#64748B] hover:text-[#f59e0b] hover:border-[#f59e0b]/50 transition-colors cursor-pointer bg-[#111622]">
                         <UploadCloud className="w-6 h-6 mb-2" />
                         <span className="text-xs">上传巡查报告或附件（支持 PDF, DOCX 等）</span>
                       </div>
                     </div>
                  </div>
                )}

                {/* Form specifically for Survey */}
                {modalType === 'survey' && (
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1.5">调查对象 <span className="text-red-500">*</span></label>
                         <select className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none transition-colors">
                           <option value="">请选择水库</option>
                           <option value="1">珊溪水库</option>
                           <option value="2">桥墩水库</option>
                         </select>
                       </div>
                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1.5">调查时间段 <span className="text-red-500">*</span></label>
                         <div className="flex items-center gap-2">
                           <input type="date" className="flex-1 w-0 bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none transition-colors [color-scheme:dark]" />
                           <span className="text-[#64748B]">-</span>
                           <input type="date" className="flex-1 w-0 bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none transition-colors [color-scheme:dark]" />
                         </div>
                       </div>
                     </div>
                     
                     <div>
                       <label className="block text-xs text-[#94A3B8] mb-1.5">调查结果概述 <span className="text-red-500">*</span></label>
                       <textarea className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none h-24 resize-none transition-colors" placeholder="调查结论摘要 1-1000 个字符"></textarea>
                     </div>
                     
                     <div>
                       <label className="block text-xs text-[#94A3B8] mb-1.5">报告上传 <span className="text-red-500">*</span></label>
                       <div className="border border-[#1E293B] rounded-lg p-4 flex flex-col items-center justify-center text-[#64748B] hover:text-[#f59e0b] hover:border-[#f59e0b]/50 transition-colors cursor-pointer bg-[#111622]">
                         <UploadCloud className="w-6 h-6 mb-2" />
                         <span className="text-xs">必须上传调查报告</span>
                       </div>
                     </div>
                  </div>
                )}

                {/* Form specifically for Rectification */}
                {(modalType === 'rectification' || modalType === 'rectification_from_patrol') && (
                  <div className="space-y-6">
                     <div className="grid grid-cols-2 gap-4 p-4 bg-[#111622] border border-[#1E293B] rounded-lg">
                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1">整改对象</label>
                         <div className="text-sm font-medium text-white">珊溪水库</div>
                       </div>
                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1">隐患来源</label>
                         <div className="text-sm font-medium text-[#f59e0b]">安全巡查</div>
                       </div>
                     </div>

                     <div className="space-y-4">
                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1.5">隐患描述 <span className="text-red-500">*</span></label>
                         <textarea className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none h-24 resize-none transition-colors" defaultValue={modalMode === 'edit' ? "大坝右侧边坡发现细微裂痕，疑似近期强降雨导致，需要进一步观测和加固。" : undefined}></textarea>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                           <label className="block text-xs text-[#94A3B8] mb-1.5">整改责任人 <span className="text-red-500">*</span></label>
                           <input type="text" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none transition-colors" defaultValue={modalMode === 'edit' ? "张工" : undefined} />
                         </div>
                         <div>
                           <label className="block text-xs text-[#94A3B8] mb-1.5">计划整改完成时间 <span className="text-red-500">*</span></label>
                           <input type="date" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none transition-colors [color-scheme:dark]" defaultValue={modalMode === 'edit' ? "2025-05-30" : undefined} />
                         </div>
                       </div>

                       <div>
                         <label className="block text-xs text-[#94A3B8] mb-1.5">整改状态 <span className="text-red-500">*</span></label>
                         <select value={rectStatus === '未整改' || rectStatus === '已闭环' ? '整改中' : rectStatus} onChange={(e) => setRectStatus(e.target.value)} className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none transition-colors">
                           <option value="整改中">整改中</option>
                           <option value="已整改">已整改</option>
                         </select>
                       </div>

                       <AnimatePresence>
                       {/* Show when status is >= 已整改 */}
                       {(rectStatus === '已整改') && (
                         <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                           <div className="pt-2">
                             <label className="block text-xs text-[#94A3B8] mb-1.5">实际整改时间 <span className="text-red-500">*</span></label>
                             <input type="date" className="w-full bg-[#111622] border border-[#1E293B] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] outline-none transition-colors [color-scheme:dark]" />
                           </div>
                           <div>
                             <label className="block text-xs text-[#94A3B8] mb-1.5">整改图片</label>
                             <div className="border border-dashed border-[#1E293B] rounded-lg p-4 flex flex-col items-center justify-center text-[#64748B] hover:text-[#f59e0b] transition-colors cursor-pointer bg-[#111622]">
                               <UploadCloud className="w-6 h-6 mb-2" />
                               <span className="text-xs">上传整改图片</span>
                             </div>
                           </div>
                         </motion.div>
                       )}
                       </AnimatePresence>

                     </div>
                  </div>
                )}
              </div>
              
              <div className="p-6 pt-4 border-t border-[#1E293B] flex justify-end gap-3 bg-[#111622] rounded-b-xl shrink-0">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors">
                  取消
                </button>
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#f59e0b] hover:bg-[#d97706] text-white flex items-center gap-2 transition-colors">
                  <Save className="w-4 h-4" /> 保存
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
      </AnimatePresence>

      <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}  className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></motion.div>
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 w-full max-w-lg bg-[#0F172A] border-l border-[#1E293B] shadow-2xl z-50 flex flex-col">
            <div className="p-4 border-b border-[#1E293B] flex items-center justify-between bg-[#111622]">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#f59e0b]" /> 记录详情
                </h2>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto w-full no-scrollbar px-6 py-6 pb-20">
              <div className="space-y-6">
                
                {/* 基础信息区 */}
                <div>
                   <h4 className="text-[10px] text-[#f59e0b] uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">基础信息</h4>
                   <div className="grid grid-cols-2 gap-y-4 text-sm">
                      <div><span className="text-[#64748B] block mb-1">对象水库</span><span className="text-white">珊溪水库</span></div>
                      <div><span className="text-[#64748B] block mb-1">来源模块</span><span className="text-white">安全巡查</span></div>
                      <div><span className="text-[#64748B] block mb-1">创建人</span><span className="text-white">系统管理员</span></div>
                      <div><span className="text-[#64748B] block mb-1">创建时间</span><span className="text-[#94A3B8] font-mono">2025-04-01 10:30</span></div>
                   </div>
                </div>

                {/* 结果描述区 */}
                <div>
                   <h4 className="text-[10px] text-[#f59e0b] uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">巡查/调查详情</h4>
                   <div className="space-y-4 text-sm">
                      <div>
                        <span className="text-[#64748B] block mb-1">巡查结果描述</span>
                        <div className="bg-[#111622] p-3 rounded border border-[#1E293B] text-white">4月度专项巡查中，各主要设施表现正常，但在大坝左岸发现少量渗水痕迹。</div>
                      </div>
                      <div className="flex justify-between items-center bg-[#111622] p-3 rounded border border-[#1E293B]">
                         <span className="text-[#64748B]">隐患发现状态:</span>
                         <span className="text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded text-xs">发现隐患 (一般隐患)</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block mb-1">隐患描述</span>
                        <div className="bg-red-500/5 p-3 rounded border border-red-500/20 text-white">大坝右侧边坡发现细微裂痕，疑似近期强降雨导致，需要进一步观测和加固。</div>
                      </div>
                   </div>
                </div>

                {/* 整改过程区 */}
                <div>
                   <h4 className="text-[10px] text-[#f59e0b] uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">整改跟踪</h4>
                   <div className="grid grid-cols-2 gap-y-4 text-sm mb-4">
                      <div><span className="text-[#64748B] block mb-1">整改责任人</span><span className="text-white">张工</span></div>
                      <div>
                        <span className="text-[#64748B] block mb-1">整改状态</span>
                        <span className="text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded text-xs w-fit">整改中</span>
                      </div>
                      <div><span className="text-[#64748B] block mb-1">计划整改时间</span><span className="text-[#94A3B8] font-mono">2025-05-30</span></div>
                      <div><span className="text-[#64748B] block mb-1">实际完成时间</span><span className="text-[#94A3B8] font-mono">-</span></div>
                   </div>
                   <div className="space-y-4 text-sm">
                      <div>
                        <span className="text-[#64748B] block mb-1">整改结果</span>
                        <div className="bg-[#111622] p-3 rounded border border-[#1E293B] text-[#94A3B8] italic">暂无</div>
                      </div>
                      <div>
                        <span className="text-[#64748B] block mb-1">闭环说明</span>
                        <div className="bg-[#111622] p-3 rounded border border-[#1E293B] text-[#94A3B8] italic">暂无</div>
                      </div>
                   </div>
                </div>

                {/* 附件操作记录 */}
                <div>
                   <h4 className="text-[10px] text-[#f59e0b] uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">附件与记录</h4>
                   <div className="flex gap-4">
                      <div className="w-16 h-16 bg-[#111622] border border-[#1E293B] rounded flex items-center justify-center text-[#64748B] hover:border-[#f59e0b] cursor-pointer transition-colors">
                        <span className="text-[10px]">隐患图.jpg</span>
                      </div>
                   </div>
                   <div className="mt-6 pt-4 border-t border-[#1E293B] border-dashed">
                      <div className="text-xs text-[#64748B] mb-2 font-bold">操作日志</div>
                      <div className="space-y-2 text-xs">
                         <div className="flex justify-between text-[#94A3B8] p-2 bg-[#111622] rounded"><span className="text-white">王建国 提交了巡查</span> <span className="font-mono text-[#64748B]">2025-04-01 10:30</span></div>
                         <div className="flex justify-between text-[#94A3B8] p-2 bg-[#111622] rounded"><span className="text-white">系统 自动发起了整改任务</span> <span className="font-mono text-[#64748B]">2025-04-01 10:30</span></div>
                      </div>
                   </div>
                </div>

              </div>
            </div>
            
            {/* Actions */}
            <div className="p-4 border-t border-[#1E293B] bg-[#111622] flex justify-between gap-3 shrink-0 absolute bottom-0 w-full left-0">
               <button className="px-4 py-2 text-sm text-[#f59e0b] hover:bg-[#f59e0b]/10 rounded border border-[#f59e0b]/50 transition-colors">删除记录</button>
               <button onClick={() => setIsDrawerOpen(false)} className="px-6 py-2 bg-[#f59e0b] text-white hover:bg-[#d97706] font-medium rounded shadow-[0_0_10px_rgba(245,158,11,0.3)] text-sm transition-colors">关闭详情</button>
            </div>
          </motion.div>
        </>
      )}
      </AnimatePresence>

    </div>
  );
}

// ----------------- Nested Tables -----------------

function PatrolTable({ handleOpenModal, setIsDrawerOpen }: any) {
  return (
    <div className="min-w-max w-full">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#0F172A] border-b border-[#1E293B] sticky top-0 z-10 transition-colors">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">巡查名称</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">巡查对象</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">巡查人员</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">巡查日期</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">发现隐患</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">隐患整改进度</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">创建人</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">创建时间</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase text-right whitespace-nowrap">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E293B]">
          <tr className="hover:bg-[#1E293B]/30 transition-colors group">
             <td className="px-6 py-4 text-sm text-white">2025年汛前专项巡查</td>
             <td className="px-6 py-4 text-sm text-tech-cyan cursor-pointer hover:underline">珊溪水库</td>
             <td className="px-6 py-4 text-sm text-[#94A3B8]">王雪平, 李四</td>
             <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2025-04-01</td>
             <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-xs text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded w-fit">
                   <ShieldAlert className="w-3 h-3" /> 是 (1)
                </div>
             </td>
             <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                   <div className="w-16 h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '0%' }}></div>
                   </div>
                   <span className="text-xs text-[#64748B] font-mono">0/1</span>
                </div>
             </td>
             <td className="px-6 py-4 text-xs text-[#94A3B8]">系统管理员</td>
             <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2025-04-01 10:30</td>
             <td className="px-6 py-4 text-right right-0 sticky bg-[#111622] group-hover:bg-[#151c2a] transition-colors border-l border-[#1E293B]/50 ml-auto w-[120px]">
                <div className="flex items-center justify-end gap-1.5">
                   <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="查看"><Eye className="w-3.5 h-3.5"/></button>
                   <button onClick={() => handleOpenModal('patrol', 'edit')} className="p-1.5 text-[#64748B] hover:text-[#f59e0b] hover:bg-[#1E293B] rounded transition-colors" title="编辑"><Edit className="w-3.5 h-3.5"/></button>
                   <button className="p-1.5 text-[#64748B] hover:text-red-400 hover:bg-[#1E293B] rounded transition-colors" title="删除"><Trash2 className="w-3.5 h-3.5"/></button>
                </div>
             </td>
          </tr>
          <tr className="hover:bg-[#1E293B]/30 transition-colors group">
             <td className="px-6 py-4 text-sm text-white">4月度大坝安全评估</td>
             <td className="px-6 py-4 text-sm text-tech-cyan cursor-pointer hover:underline">桥墩水库</td>
             <td className="px-6 py-4 text-sm text-[#94A3B8]">张工</td>
             <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2025-04-15</td>
             <td className="px-6 py-4">
                <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded text-xs flex items-center gap-1 w-fit">
                   否
                </span>
             </td>
             <td className="px-6 py-4 text-sm text-[#64748B]">-</td>
             <td className="px-6 py-4 text-xs text-[#94A3B8]">张工</td>
             <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2025-04-15 16:45</td>
             <td className="px-6 py-4 text-right right-0 sticky bg-[#111622] group-hover:bg-[#151c2a] transition-colors border-l border-[#1E293B]/50 ml-auto w-[120px]">
                <div className="flex items-center justify-end gap-1.5">
                   <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="查看"><Eye className="w-3.5 h-3.5"/></button>
                   <button onClick={() => handleOpenModal('patrol', 'edit')} className="p-1.5 text-[#64748B] hover:text-[#f59e0b] hover:bg-[#1E293B] rounded transition-colors" title="编辑"><Edit className="w-3.5 h-3.5"/></button>
                   <button className="p-1.5 text-[#64748B] hover:text-red-400 hover:bg-[#1E293B] rounded transition-colors" title="删除"><Trash2 className="w-3.5 h-3.5"/></button>
                </div>
             </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function SurveyTable({ handleOpenModal, setIsDrawerOpen }: any) {
  return (
    <div className="min-w-max w-full">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#0F172A] border-b border-[#1E293B] sticky top-0 z-10 transition-colors">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">调查对象</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">调查时间段</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">调查结果概述</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">报告上传</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">创建人</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">创建时间</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase text-right whitespace-nowrap">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E293B]">
          <tr className="hover:bg-[#1E293B]/30 transition-colors group">
             <td className="px-6 py-4 text-sm text-tech-cyan cursor-pointer hover:underline">珊溪水库</td>
             <td className="px-6 py-4 text-xs font-mono text-white">2025-01-01 ~ 2025-01-15</td>
             <td className="px-6 py-4 text-sm text-[#94A3B8] max-w-[200px] truncate" title="年度资产清查，涉及设备老化等问题排查。">年度资产清查，涉及设备老化等问题排查。</td>
             <td className="px-6 py-4">
                <button className="flex items-center gap-1.5 text-xs text-tech-cyan hover:underline bg-tech-cyan/10 border border-tech-cyan/20 px-2 py-1 rounded">
                   <LinkIcon className="w-3 h-3" /> 下载报告
                </button>
             </td>
             <td className="px-6 py-4 text-xs text-[#94A3B8]">第三方风控</td>
             <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2025-01-20 14:00</td>
             <td className="px-6 py-4 text-right right-0 sticky bg-[#111622] group-hover:bg-[#151c2a] transition-colors border-l border-[#1E293B]/50 ml-auto">
                <div className="flex items-center justify-end gap-1.5">
                   <button onClick={() => handleOpenModal('rectification_from_patrol')} className="text-xs mr-2 text-[#f59e0b] hover:text-[#d97706] hover:underline" title="发起整改">发起整改</button>
                   <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="查看"><Eye className="w-3.5 h-3.5"/></button>
                   <button onClick={() => handleOpenModal('survey', 'edit')} className="p-1.5 text-[#64748B] hover:text-[#f59e0b] hover:bg-[#1E293B] rounded transition-colors" title="编辑"><Edit className="w-3.5 h-3.5"/></button>
                   <button className="p-1.5 text-[#64748B] hover:text-red-400 hover:bg-[#1E293B] rounded transition-colors" title="删除"><Trash2 className="w-3.5 h-3.5"/></button>
                </div>
             </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function RectificationTable({ handleOpenModal, setIsDrawerOpen }: any) {
  return (
    <div className="min-w-max w-full">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#0F172A] border-b border-[#1E293B] sticky top-0 z-10 transition-colors">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">整改对象</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">隐患来源</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">隐患等级</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">整改责任人</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">整改状态</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">计划整改时间</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">实际整改时间</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">最新更新时间</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase text-right whitespace-nowrap">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E293B]">
          <tr className="hover:bg-[#1E293B]/30 transition-colors group">
             <td className="px-6 py-4 text-sm text-tech-cyan cursor-pointer hover:underline">珊溪水库</td>
             <td className="px-6 py-4 text-xs text-[#94A3B8]">安全巡查</td>
             <td className="px-6 py-4 text-sm text-orange-400">一般隐患</td>
             <td className="px-6 py-4 text-sm text-[#94A3B8]">张工</td>
             <td className="px-6 py-4">
                <span className="text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded text-xs">整改中</span>
             </td>
             <td className="px-6 py-4 text-xs font-mono text-white">2025-05-30</td>
             <td className="px-6 py-4 text-xs font-mono text-[#64748B]">-</td>
             <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2025-04-02 09:12</td>
             <td className="px-6 py-4 text-right right-0 sticky bg-[#111622] group-hover:bg-[#151c2a] transition-colors border-l border-[#1E293B]/50 ml-auto">
                <div className="flex items-center justify-end gap-1.5">
                   <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="查看"><Eye className="w-3.5 h-3.5"/></button>
                   <button onClick={() => handleOpenModal('rectification', 'edit')} className="p-1.5 text-[#64748B] hover:text-[#f59e0b] hover:bg-[#1E293B] rounded transition-colors" title="编辑整改/闭环处理"><Edit className="w-3.5 h-3.5"/></button>
                </div>
             </td>
          </tr>
          <tr className="hover:bg-[#1E293B]/30 transition-colors group">
             <td className="px-6 py-4 text-sm text-tech-cyan cursor-pointer hover:underline">桥墩水库</td>
             <td className="px-6 py-4 text-xs text-[#94A3B8]">第三方资产调查</td>
             <td className="px-6 py-4 text-sm text-[#64748B]">未定级</td>
             <td className="px-6 py-4 text-sm text-[#94A3B8]">王工程师</td>
             <td className="px-6 py-4">
                <span className="text-slate-400 bg-slate-500/10 border border-slate-500/20 px-2 py-0.5 rounded text-xs">未整改</span>
             </td>
             <td className="px-6 py-4 text-xs font-mono text-white">2025-06-15</td>
             <td className="px-6 py-4 text-xs font-mono text-[#64748B]">-</td>
             <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2025-01-20 14:00</td>
             <td className="px-6 py-4 text-right right-0 sticky bg-[#111622] group-hover:bg-[#151c2a] transition-colors border-l border-[#1E293B]/50 ml-auto">
                <div className="flex items-center justify-end gap-1.5">
                   <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="查看"><Eye className="w-3.5 h-3.5"/></button>
                   <button onClick={() => handleOpenModal('rectification', 'edit')} className="p-1.5 text-[#64748B] hover:text-[#f59e0b] hover:bg-[#1E293B] rounded transition-colors" title="编辑整改/闭环处理"><Edit className="w-3.5 h-3.5"/></button>
                </div>
             </td>
          </tr>
          <tr className="hover:bg-[#1E293B]/30 transition-colors group">
             <td className="px-6 py-4 text-sm text-tech-cyan cursor-pointer hover:underline">泽雅水库</td>
             <td className="px-6 py-4 text-xs text-[#94A3B8]">安全巡查</td>
             <td className="px-6 py-4 text-sm text-orange-400">一般隐患</td>
             <td className="px-6 py-4 text-sm text-[#94A3B8]">赵工</td>
             <td className="px-6 py-4">
                <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded text-xs flex w-fit items-center gap-1"><CheckCircle className="w-3 h-3"/> 已闭环</span>
             </td>
             <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2024-12-30</td>
             <td className="px-6 py-4 text-xs font-mono text-[#94A3B8]">2024-12-25</td>
             <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2024-12-28 11:45</td>
             <td className="px-6 py-4 text-right right-0 sticky bg-[#111622] group-hover:bg-[#151c2a] transition-colors border-l border-[#1E293B]/50 ml-auto">
                <div className="flex items-center justify-end gap-1.5">
                   <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded transition-colors" title="查看"><Eye className="w-3.5 h-3.5"/></button>
                   <button onClick={() => handleOpenModal('rectification', 'edit')} className="p-1.5 text-[#64748B] hover:text-[#f59e0b] hover:bg-[#1E293B] rounded transition-colors" title="编辑整改/闭环处理"><Edit className="w-3.5 h-3.5"/></button>
                </div>
             </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
