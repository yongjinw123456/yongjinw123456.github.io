import { useState } from 'react';
import { 
  Search, Plus, ShieldCheck, FileSearch, Target, 
  Settings, Trash2, X, FileText, CheckCircle, Save, Download, 
  AlertTriangle, UploadCloud
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RiskReduction() {
  const [activeTab, setActiveTab] = useState<'patrol' | 'survey' | 'rectification'>('patrol');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modalType, setModalType] = useState<'patrol' | 'survey' | 'rectification'>('patrol');

  return (
    <div className="h-full flex flex-col fade-in">
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
            className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-colors", activeTab === 'patrol' ? "bg-[#1E293B] text-white" : "text-[#64748B] hover:text-[#94A3B8]")}
          >
            安全巡查
          </button>
          <button 
            onClick={() => setActiveTab('survey')}
            className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-colors", activeTab === 'survey' ? "bg-[#1E293B] text-white" : "text-[#64748B] hover:text-[#94A3B8]")}
          >
            第三方资产调查
          </button>
          <button 
            onClick={() => setActiveTab('rectification')}
            className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-colors", activeTab === 'rectification' ? "bg-[#1E293B] text-white" : "text-[#64748B] hover:text-[#94A3B8]")}
          >
            隐患整改
          </button>
        </div>
      </header>

      {/* Filters & Actions */}
      <div className="p-6 shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {activeTab === 'patrol' && (
            <>
              <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-[#f59e0b] outline-none">
                <option value="">全部水库对象</option>
              </select>
              <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-[#f59e0b] outline-none">
                <option value="">是否存在隐患</option>
                <option value="yes">是</option>
                <option value="no">否</option>
              </select>
              <input type="date" className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-[#94A3B8] focus:border-[#f59e0b] outline-none [color-scheme:dark]" />
            </>
          )}
          {activeTab === 'survey' && (
            <>
              <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-[#f59e0b] outline-none">
                <option value="">全部水库对象</option>
              </select>
              <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-[#f59e0b] outline-none">
                <option value="">是否存在隐患</option>
                <option value="yes">是</option>
                <option value="no">否</option>
              </select>
            </>
          )}
          {activeTab === 'rectification' && (
            <>
              <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-[#f59e0b] outline-none">
                <option value="">全部水库对象</option>
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
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-[#111622] hover:bg-[#1E293B] border border-[#1E293B] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            导出
          </button>
          
          {activeTab === 'patrol' && (
            <button onClick={() => { setModalType('patrol'); setIsModalOpen(true); }} className="flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" /> 新增巡查
            </button>
          )}
          {activeTab === 'survey' && (
            <button onClick={() => { setModalType('survey'); setIsModalOpen(true); }} className="flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" /> 新增资产调查
            </button>
          )}
        </div>
      </div>

      {/* Table content placeholder */}
      <div className="px-6 pb-6 flex-1 overflow-hidden flex flex-col">
        <div className="bg-[#111622] border border-[#1E293B] rounded-lg w-full flex-1 flex flex-col overflow-hidden">
          {activeTab === 'patrol' && <PatrolTable setIsModalOpen={setIsModalOpen} setModalType={setModalType} setIsDrawerOpen={setIsDrawerOpen} />}
          {activeTab === 'survey' && <SurveyTable setIsModalOpen={setIsModalOpen} setModalType={setModalType} setIsDrawerOpen={setIsDrawerOpen} />}
          {activeTab === 'rectification' && <RectificationTable setIsModalOpen={setIsModalOpen} setModalType={setModalType} setIsDrawerOpen={setIsDrawerOpen} />}
        </div>
      </div>

      {/* Basic Modals & Drawers */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#1E293B] flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#f59e0b]" />
                {modalType === 'patrol' && '新增安全巡查'}
                {modalType === 'survey' && '新增第三方资产调查'}
                {modalType === 'rectification' && '发起 / 处理整改'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-white transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              <span className="text-[#64748B] text-sm">（表单字段略，按照需求文档可展开）</span>
            </div>
            
            <div className="p-6 pt-4 border-t border-[#1E293B] flex justify-end gap-3 bg-[#111622]/50 shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors">
                取消
              </button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-[#f59e0b] hover:bg-[#d97706] text-white flex items-center gap-2 transition-colors">
                <Save className="w-4 h-4" /> 保存
              </button>
            </div>
          </div>
        </div>
      )}

      {isDrawerOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0F172A] border-l border-[#1E293B] shadow-2xl z-50 flex flex-col">
            <div className="p-6 border-b border-[#1E293B] flex items-center justify-between bg-[#111622]">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#f59e0b]" /> 记录详情
                </h2>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <span className="text-[#64748B] text-sm">（详情抽屉字段略）</span>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

// ----------------- Nested Tables -----------------

function PatrolTable({ setIsModalOpen, setModalType, setIsDrawerOpen }: any) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead className="bg-[#0F172A] border-b border-[#1E293B] sticky top-0 z-10">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">巡查名称</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">巡查对象</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">是否有隐患</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">隐患等级</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase">巡查时间</th>
            <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase text-right">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E293B]">
          <tr className="hover:bg-[#1E293B]/30 transition-colors">
             <td className="px-6 py-4 text-sm text-white">2025年汛前专项巡查</td>
             <td className="px-6 py-4 text-sm text-[#94A3B8]">珊溪水库</td>
             <td className="px-6 py-4">
                <span className="text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded text-xs">是</span>
             </td>
             <td className="px-6 py-4 text-sm text-orange-400">一般隐患</td>
             <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2025-04-01</td>
             <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                   <button onClick={() => { setModalType('rectification'); setIsModalOpen(true); }} className="text-xs text-[#f59e0b] hover:underline">发起整改</button>
                   <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-tech-cyan hover:bg-tech-cyan/20 rounded transition-colors"><FileText className="w-4 h-4"/></button>
                </div>
             </td>
          </tr>
          <tr className="hover:bg-[#1E293B]/30 transition-colors">
             <td className="px-6 py-4 text-sm text-white">4月度大坝安全评估</td>
             <td className="px-6 py-4 text-sm text-[#94A3B8]">桥墩水库</td>
             <td className="px-6 py-4">
                <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded text-xs">否</span>
             </td>
             <td className="px-6 py-4 text-sm text-[#64748B]">-</td>
             <td className="px-6 py-4 text-xs font-mono text-[#64748B]">2025-04-15</td>
             <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end">
                   <button onClick={() => setIsDrawerOpen(true)} className="p-1.5 text-tech-cyan hover:bg-tech-cyan/20 rounded transition-colors"><FileText className="w-4 h-4"/></button>
                </div>
             </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function SurveyTable({ setIsModalOpen, setModalType, setIsDrawerOpen }: any) {
  return (
    <div className="overflow-x-auto w-full flex-1">
      <div className="w-full text-left border-collapse flex items-center justify-center min-h-[300px] text-[#64748B] text-sm">
        （第三方资产调查记录）
      </div>
    </div>
  );
}

function RectificationTable({ setIsModalOpen, setModalType, setIsDrawerOpen }: any) {
  return (
    <div className="overflow-x-auto w-full">
      <div className="w-full text-left border-collapse flex items-center justify-center min-h-[300px] text-[#64748B] text-sm">
        （整改任务列表）
      </div>
    </div>
  );
}
