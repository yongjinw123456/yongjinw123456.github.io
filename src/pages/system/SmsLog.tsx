import { useState } from 'react';
import { 
  MessageSquare, Search, Download, Eye, X, RotateCcw, Link2, CheckSquare, Square
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface SmsRecord {
  id: string;
  sendTime: string;
  triggerType: string;
  eventId: string;
  reservoirName: string;
  warningLevel: string;
  contactInfo: string;
  content: string;
  status: '成功' | '失败' | '待重试';
  failReason?: string;
}

const mockData: SmsRecord[] = [
  {
    id: 'SMS-20240501-001',
    sendTime: '2024-05-01 14:00:00',
    triggerType: '生成预警时',
    eventId: 'EVT-001',
    reservoirName: '珊溪水库',
    warningLevel: '橙色预警',
    contactInfo: '张三 (138****1234)',
    content: '【预警提醒】珊溪水库触发橙色预警，当前水位145.2m，请及时处理。',
    status: '成功'
  },
  {
    id: 'SMS-20240501-002',
    sendTime: '2024-05-01 18:35:10',
    triggerType: '预警超过12小时未处理',
    eventId: 'EVT-001',
    reservoirName: '桥墩水库',
    warningLevel: '红色预警',
    contactInfo: '李四 (139****5678)',
    content: '【催办提醒】桥墩水库红色预警已超时12小时未处理，请立即关注。',
    status: '失败',
    failReason: '由于网关超时导致发送失败'
  }
];

export default function SmsLog() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeRecord, setActiveRecord] = useState<SmsRecord | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedIds.length === mockData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockData.map(d => d.id));
    }
  };

  const hasFailedSelected = selectedIds.some(id => mockData.find(d => d.id === id)?.status === '失败');

  return (
    <div className="h-full flex flex-col fade-in relative">
      <header className="px-6 py-4 border-b border-[#1E293B] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-500/20 rounded-lg">
            <MessageSquare className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">短信记录</h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono uppercase tracking-wider">System / SMS Logs</p>
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <div className="p-6 shrink-0 flex flex-col gap-4 border-b border-[#1E293B] bg-[#0B0F17]/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-500 outline-none">
            <option value="">所有触发条件</option>
            <option value="生成预警时">生成预警时</option>
            <option value="预警超过12小时未处理">预警超过 12 小时未处理</option>
            <option value="预警超过24小时未处理">预警超过 24 小时未处理</option>
            <option value="预警超过48小时未处理">预警超过 48 小时未处理</option>
            <option value="预警超过72小时未处理">预警超过 72 小时未处理</option>
          </select>
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-500 outline-none">
            <option value="">所有水库名称</option>
            <option value="珊溪水库">珊溪水库</option>
            <option value="桥墩水库">桥墩水库</option>
            <option value="赵山渡水库">赵山渡水库</option>
          </select>
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-500 outline-none">
            <option value="">所有预警等级</option>
            <option value="黄色预警">黄色预警</option>
            <option value="橙色预警">橙色预警</option>
            <option value="红色预警">红色预警</option>
          </select>
          <input type="text" placeholder="通知对象 (姓名或手机号)" className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-500 outline-none" />
          <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-500 outline-none">
            <option value="">全部发送状态</option>
            <option value="成功">发送成功</option>
            <option value="失败">发送失败</option>
            <option value="待重试">待重试</option>
          </select>
          <div className="flex items-center gap-2">
            <input type="date" className="flex-1 min-w-0 bg-[#111622] border border-[#1E293B] rounded-lg px-2 py-2 text-xs text-[#94A3B8] focus:border-slate-500 outline-none" />
            <span className="text-[#64748B]">-</span>
            <input type="date" className="flex-1 min-w-0 bg-[#111622] border border-[#1E293B] rounded-lg px-2 py-2 text-xs text-[#94A3B8] focus:border-slate-500 outline-none" />
          </div>
        </div>

        {/* Function Area */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#111622] hover:bg-[#1E293B] border border-[#1E293B] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              <Download className="w-4 h-4" /> 导出
            </button>
            {hasFailedSelected && (
              <button 
                onClick={() => {
                   const failedRecords = selectedIds.map(id => mockData.find(d => d.id === id)).filter(d => d?.status === '失败');
                   if (failedRecords.length > 0) {
                     setActiveRecord(failedRecords[0] || null); // Note: Simple implementation handles one edit modal at a time
                     setIsResendModalOpen(true);
                   }
                }}
                className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" /> 重发短信
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-[#64748B] hover:text-white transition-colors">
              重置筛选
            </button>
            <button className="flex items-center gap-2 bg-tech-cyan hover:bg-tech-cyan/90 text-[#0B0F17] px-5 py-2 rounded-lg transition-colors text-sm font-bold shadow-[0_0_10px_rgba(0,242,255,0.3)]">
              <Search className="w-4 h-4" /> 查询
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col p-6">
        <div className="bg-[#111622] border border-[#1E293B] rounded-lg w-full flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead className="bg-[#0F172A] border-b border-[#1E293B] sticky top-0">
                <tr>
                  <th className="px-4 py-3 w-10 text-center">
                    <button onClick={toggleAll} className="text-[#64748B] hover:text-white transition-colors">
                      {selectedIds.length === mockData.length ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">发送时间</th>
                  <th className="px-4 py-3 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">触发条件</th>
                  <th className="px-4 py-3 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">关联事件 ID</th>
                  <th className="px-4 py-3 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">水库名称</th>
                  <th className="px-4 py-3 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">预警等级</th>
                  <th className="px-4 py-3 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">通知对象</th>
                  <th className="px-4 py-3 text-xs font-bold text-[#64748B] uppercase w-1/4">短信内容摘要</th>
                  <th className="px-4 py-3 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">发送状态</th>
                  <th className="px-4 py-3 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap">失败原因</th>
                  <th className="px-4 py-3 text-xs font-bold text-[#64748B] uppercase whitespace-nowrap text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                {mockData.map(record => (
                  <tr key={record.id} className="hover:bg-[#1E293B]/30 transition-colors">
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleSelect(record.id)} className={cn("transition-colors", selectedIds.includes(record.id) ? "text-tech-cyan" : "text-[#64748B] hover:text-white")}>
                        {selectedIds.includes(record.id) ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-[#94A3B8] whitespace-nowrap">{record.sendTime}</td>
                    <td className="px-4 py-3 text-sm text-white whitespace-nowrap">{record.triggerType}</td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                       {record.eventId ? (
                         <button onClick={() => navigate('/risk/warning')} className="text-tech-cyan font-mono hover:underline flex items-center gap-1">
                           <Link2 className="w-3 h-3" /> {record.eventId}
                         </button>
                       ) : <span className="text-[#64748B]">-</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-white whitespace-nowrap">{record.reservoirName}</td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                       <span className={cn(
                          "px-2 py-0.5 rounded text-xs border font-medium",
                          record.warningLevel === '红色预警' ? 'bg-red-500/10 text-red-400 border-red-500/20' : '',
                          record.warningLevel === '橙色预警' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : '',
                          record.warningLevel === '黄色预警' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : ''
                       )}>{record.warningLevel}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-white whitespace-nowrap">{record.contactInfo}</td>
                    <td className="px-4 py-3 text-sm text-[#94A3B8] truncate max-w-xs" title={record.content}>{record.content}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                       {record.status === '成功' && <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-xs border border-green-500/20">成功</span>}
                       {record.status === '失败' && <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded text-xs border border-red-500/20">失败</span>}
                       {record.status === '待重试' && <span className="text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded text-xs border border-orange-500/20">待重试</span>}
                    </td>
                    <td className="px-4 py-3 text-xs text-red-300 truncate max-w-xs">{record.failReason || '-'}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                       <div className="flex items-center justify-end gap-3">
                         <button onClick={() => { setActiveRecord(record); setIsDetailDrawerOpen(true); }} className="text-indigo-400 hover:text-indigo-300 text-xs font-medium flex items-center gap-1">
                           <Eye className="w-3.5 h-3.5" /> 详情
                         </button>
                         {record.eventId && (
                           <button onClick={() => navigate('/risk/warning')} className="text-tech-cyan hover:text-tech-cyan/80 text-xs font-medium flex items-center gap-1">
                             <Link2 className="w-3.5 h-3.5" /> 关联事件
                           </button>
                         )}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

       {/* Resend Modal */}
       <AnimatePresence>
        {isResendModalOpen && activeRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#0B0F17]/80 backdrop-blur-sm" onClick={() => setIsResendModalOpen(false)} />
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-[#111622] rounded-xl border border-[#1E293B] shadow-2xl w-full max-w-md flex flex-col">
                <div className="p-4 border-b border-[#1E293B] flex justify-between items-center bg-[#0F172A] rounded-t-xl">
                  <h3 className="font-bold text-white flex items-center gap-2 text-sm"><RotateCcw className="w-4 h-4 text-indigo-400" /> 重发短信</h3>
                  <button onClick={() => setIsResendModalOpen(false)} className="text-[#64748B] hover:text-white"><X className="w-4 h-4" /></button>
                </div>
                <div className="p-6 space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">短信记录 ID</label>
                       <input type="text" readOnly value={activeRecord.id} className="w-full bg-[#1E293B]/50 border border-[#1E293B] rounded px-3 py-2 text-xs font-mono text-[#64748B] outline-none" />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">通知对象</label>
                       <input type="text" readOnly value={activeRecord.contactInfo.split(' (')[0]} className="w-full bg-[#1E293B]/50 border border-[#1E293B] rounded px-3 py-2 text-xs text-[#64748B] outline-none" />
                     </div>
                   </div>
                   <div>
                     <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">手机号 <span className="text-red-500">*</span></label>
                     <input type="text" defaultValue={activeRecord.contactInfo.match(/\((.*?)\)/)?.[1] || ''} className="w-full bg-[#111622] border border-[#1E293B] focus:border-indigo-500 rounded px-3 py-2 text-sm text-white font-mono outline-none" />
                   </div>
                   <div>
                     <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">短信内容 <span className="text-red-500">*</span></label>
                     <textarea defaultValue={activeRecord.content} className="w-full bg-[#111622] border border-[#1E293B] focus:border-indigo-500 rounded px-3 py-2 text-sm text-white outline-none resize-none h-24" />
                   </div>
                   <div>
                     <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">重发原因</label>
                     <textarea placeholder="0-200字..." maxLength={200} className="w-full bg-[#111622] border border-[#1E293B] focus:border-indigo-500 rounded px-3 py-2 text-sm text-white outline-none resize-none h-16 placeholder:text-[#475569]" />
                   </div>
                </div>
                <div className="p-4 border-t border-[#1E293B] bg-[#0F172A] rounded-b-xl flex justify-end gap-3 shrink-0">
                  <button onClick={() => setIsResendModalOpen(false)} className="px-4 py-2 rounded text-sm font-medium text-[#94A3B8] hover:text-white transition-colors border border-[#1E293B] hover:bg-[#1E293B]">
                    取消
                  </button>
                  <button onClick={() => setIsResendModalOpen(false)} className="px-4 py-2 rounded text-sm font-bold bg-indigo-500 hover:bg-indigo-600 text-white transition-colors shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                    确认重发
                  </button>
                </div>
             </motion.div>
          </div>
        )}
       </AnimatePresence>

       {/* Detail Drawer */}
       <AnimatePresence>
        {isDetailDrawerOpen && activeRecord && (
          <div className="fixed inset-0 z-50 flex justify-end">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#0B0F17]/80 backdrop-blur-sm" onClick={() => setIsDetailDrawerOpen(false)} />
             <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative w-full max-w-md bg-[#111622] border-l border-[#1E293B] shadow-2xl flex flex-col h-full">
                <div className="p-4 border-b border-[#1E293B] bg-[#0F172A] flex justify-between items-center shrink-0">
                  <h3 className="font-bold text-white text-sm">短信记录详情</h3>
                  <button onClick={() => setIsDetailDrawerOpen(false)} className="text-[#64748B] hover:text-white bg-[#1E293B] rounded p-1"><X className="w-4 h-4"/></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                   <div className="space-y-4">
                     <div>
                       <div className="text-xs text-[#94A3B8] mb-1">记录 ID</div>
                       <div className="text-sm font-mono text-white">{activeRecord.id}</div>
                     </div>
                     <div>
                       <div className="text-xs text-[#94A3B8] mb-1">发送时间</div>
                       <div className="text-sm font-mono text-white">{activeRecord.sendTime}</div>
                     </div>
                     <div>
                       <div className="text-xs text-[#94A3B8] mb-1">发送状态</div>
                       <div className="mt-1">
                          {activeRecord.status === '成功' && <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-xs border border-green-500/20">成功</span>}
                          {activeRecord.status === '失败' && <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded text-xs border border-red-500/20">失败</span>}
                          {activeRecord.status === '待重试' && <span className="text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded text-xs border border-orange-500/20">待重试</span>}
                       </div>
                     </div>
                     {activeRecord.failReason && (
                       <div>
                         <div className="text-xs text-[#94A3B8] mb-1">失败原因</div>
                         <div className="text-sm text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">{activeRecord.failReason}</div>
                       </div>
                     )}
                   </div>

                   <div className="h-px bg-[#1E293B] w-full" />

                   <div className="space-y-4">
                     <div>
                       <div className="text-xs text-[#94A3B8] mb-1">触发条件</div>
                       <div className="text-sm text-white">{activeRecord.triggerType}</div>
                     </div>
                     <div>
                       <div className="text-xs text-[#94A3B8] mb-1">关联事件 ID</div>
                       {activeRecord.eventId ? (
                          <div className="text-sm font-mono text-tech-cyan cursor-pointer hover:underline">{activeRecord.eventId}</div>
                       ) : <div className="text-sm text-[#64748B]">-</div>}
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <div className="text-xs text-[#94A3B8] mb-1">水库名称</div>
                         <div className="text-sm text-white">{activeRecord.reservoirName}</div>
                       </div>
                       <div>
                         <div className="text-xs text-[#94A3B8] mb-1">预警等级</div>
                         <div className="text-sm text-white">{activeRecord.warningLevel}</div>
                       </div>
                     </div>
                   </div>

                   <div className="h-px bg-[#1E293B] w-full" />

                   <div className="space-y-4">
                     <div>
                       <div className="text-xs text-[#94A3B8] mb-1">通知对象</div>
                       <div className="text-sm text-white font-mono">{activeRecord.contactInfo}</div>
                     </div>
                     <div>
                       <div className="text-xs text-[#94A3B8] mb-1">短信内容</div>
                       <div className="text-sm text-[#E2E8F0] bg-[#0F172A] p-3 rounded-lg border border-[#1E293B] leading-relaxed">
                         {activeRecord.content}
                       </div>
                     </div>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
       </AnimatePresence>
    </div>
  );
}

