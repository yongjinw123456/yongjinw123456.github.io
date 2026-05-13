import { useState } from 'react';
import { 
  Search, Plus, Cpu, Activity, AlertTriangle, 
  Settings, Trash2, X, FileText, CheckCircle, Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const MOCK_DEVICES = [
  { id: 'WL-001A', name: '珊溪水库主坝水位计', type: '水位监测', status: '正常', reservoir: '珊溪水库', createdAt: '2025-10-12 10:00' },
  { id: 'WL-002B', name: '桥墩水库副坝水位计', type: '水位监测', status: '正常', reservoir: '桥墩水库', createdAt: '2025-11-05 14:30' },
  { id: 'WL-003C', name: '赵山渡水库库位测点', type: '水位监测', status: '故障', reservoir: '赵山渡水库', createdAt: '2026-01-20 09:15' },
  { id: 'WL-004D', name: '珊溪水库溢洪道测点', type: '水位监测', status: '停用', reservoir: '珊溪水库', createdAt: '2025-12-01 16:45' },
];

export default function Devices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [reservoirFilter, setReservoirFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  const filteredData = MOCK_DEVICES.filter(d => 
    (!searchTerm || d.name.includes(searchTerm) || d.id.includes(searchTerm)) &&
    (!statusFilter || d.status === statusFilter) &&
    (!reservoirFilter || d.reservoir === reservoirFilter)
  );

  return (
    <div className="h-full flex flex-col fade-in">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#1E293B] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#8b5cf6]/20 rounded-lg">
            <Cpu className="w-5 h-5 text-[#8b5cf6]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">设备管理</h1>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono uppercase tracking-wider">Ops / Device Management</p>
          </div>
        </div>
      </header>

      {/* Filters & Actions */}
      <div className="p-6 shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="搜索设备名称或ID..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#111622] border border-[#1E293B] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#64748B] focus:border-[#8b5cf6] outline-none"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-[#8b5cf6] outline-none"
          >
            <option value="">全部状态</option>
            <option value="正常">正常</option>
            <option value="故障">故障</option>
            <option value="停用">停用</option>
          </select>

          <select 
            value={reservoirFilter}
            onChange={e => setReservoirFilter(e.target.value)}
            className="bg-[#111622] border border-[#1E293B] rounded-lg px-4 py-2 text-sm text-white focus:border-[#8b5cf6] outline-none"
          >
            <option value="">全部水库</option>
            <option value="珊溪水库">珊溪水库</option>
            <option value="桥墩水库">桥墩水库</option>
            <option value="赵山渡水库">赵山渡水库</option>
          </select>
        </div>

        <button 
          onClick={() => { setSelectedDevice(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          新增设备
        </button>
      </div>

      {/* Table */}
      <div className="px-6 pb-6 flex-1 overflow-hidden flex flex-col">
        <div className="bg-[#111622] border border-[#1E293B] rounded-lg flex-1 flex flex-col overflow-hidden">
          <div className="overflow-x-auto min-w-[800px] flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0F172A] border-b border-[#1E293B] sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">设备 ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">设备名称</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">设备类型</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">设备状态</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">关联水库</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">创建时间</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B] overflow-y-auto">
                {filteredData.map(row => (
                  <tr key={row.id} className="hover:bg-[#1E293B]/30 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-[#94A3B8]">{row.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white font-medium">{row.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-[#94A3B8]">{row.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                        row.status === '正常' && "bg-green-500/10 text-green-400 border-green-500/20",
                        row.status === '故障' && "bg-red-500/10 text-red-400 border-red-500/20",
                        row.status === '停用' && "bg-[#1E293B] text-[#94A3B8] border-[#334155]"
                      )}>
                        {row.status === '正常' && <Activity className="w-3 h-3" />}
                        {row.status === '故障' && <AlertTriangle className="w-3 h-3" />}
                        {row.status === '停用' && <div className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></div>}
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#94A3B8]">
                      {row.reservoir}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#64748B] font-mono">
                      {row.createdAt}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => { setSelectedDevice(row); setIsDrawerOpen(true); }}
                          className="p-1.5 text-tech-cyan hover:bg-tech-cyan/20 rounded transition-colors"
                          title="查看详情"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => { setSelectedDevice(row); setIsModalOpen(true); }}
                          className="p-1.5 text-[#8b5cf6] hover:bg-[#8b5cf6]/20 rounded transition-colors"
                          title="编辑配置"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl w-full max-w-lg shadow-2xl flex flex-col">
            <div className="p-6 border-b border-[#1E293B] flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {selectedDevice ? <Settings className="w-5 h-5 text-[#8b5cf6]" /> : <Plus className="w-5 h-5 text-[#8b5cf6]" />}
                {selectedDevice ? '编辑设备' : '新增设备'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-[#64748B] hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-[#94A3B8]">设备 ID <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  defaultValue={selectedDevice?.id}
                  className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#8b5cf6] outline-none" 
                  placeholder="例如: WL-005E" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-[#94A3B8]">设备名称 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  defaultValue={selectedDevice?.name}
                  className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#8b5cf6] outline-none" 
                  placeholder="例如: 北侧附坝水位计" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-[#94A3B8]">设备类型 <span className="text-red-500">*</span></label>
                <select className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#8b5cf6] outline-none">
                  <option value="水位监测">水位监测</option>
                  <option value="雨量监测">雨量监测</option>
                  <option value="位移监测">位移监测</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-[#94A3B8]">设备关联水库 <span className="text-red-500">*</span></label>
                <select 
                  defaultValue={selectedDevice?.reservoir}
                  className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#8b5cf6] outline-none"
                >
                  <option value="">请选择水库</option>
                  <option value="珊溪水库">珊溪水库</option>
                  <option value="桥墩水库">桥墩水库</option>
                  <option value="赵山渡水库">赵山渡水库</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-[#94A3B8]">设备状态 <span className="text-red-500">*</span></label>
                <select 
                  defaultValue={selectedDevice?.status}
                  className="bg-[#111622] border border-[#1E293B] rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#8b5cf6] outline-none"
                >
                  <option value="正常">正常</option>
                  <option value="故障">故障</option>
                  <option value="停用">停用</option>
                </select>
              </div>
            </div>
            <div className="p-6 pt-4 border-t border-[#1E293B] flex justify-end gap-3 bg-[#111622]/50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[#8b5cf6] hover:bg-[#7c3aed] text-white flex items-center gap-2 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                保存配置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer */}
      {isDrawerOpen && selectedDevice && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0F172A] border-l border-[#1E293B] shadow-2xl z-50 flex flex-col transform transition-transform">
            <div className="p-6 border-b border-[#1E293B] flex items-center justify-between bg-[#111622]">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#8b5cf6]" />
                  设备详情
                </h2>
                <div className="text-xs text-[#64748B] mt-1 font-mono">{selectedDevice.id}</div>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div className="space-y-4">
                 <h3 className="text-xs font-bold text-[#8b5cf6] uppercase tracking-wider">基础信息</h3>
                 <div className="bg-[#111622] rounded-lg border border-[#1E293B] p-4 space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-[#1E293B] border-dashed">
                      <span className="text-[#64748B] text-sm">设备名称</span>
                      <span className="text-white font-medium">{selectedDevice.name}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-[#1E293B] border-dashed">
                      <span className="text-[#64748B] text-sm">设备类型</span>
                      <span className="text-white">{selectedDevice.type}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-[#1E293B] border-dashed">
                      <span className="text-[#64748B] text-sm">设备状态</span>
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded border",
                        selectedDevice.status === '正常' && "bg-green-500/10 text-green-400 border-green-500/20",
                        selectedDevice.status === '故障' && "bg-red-500/10 text-red-400 border-red-500/20",
                        selectedDevice.status === '停用' && "bg-[#1E293B] text-[#94A3B8] border-[#334155]"
                      )}>
                        {selectedDevice.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-[#1E293B] border-dashed">
                      <span className="text-[#64748B] text-sm">关联水库</span>
                      <a href="#" className="text-tech-cyan hover:underline">{selectedDevice.reservoir}</a>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#64748B] text-sm">创建时间</span>
                      <span className="font-mono text-sm text-[#94A3B8]">{selectedDevice.createdAt}</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-xs font-bold text-[#8b5cf6] uppercase tracking-wider">最近上报</h3>
                 <div className="bg-[#111622] rounded-lg border border-[#1E293B] p-4 flex flex-col items-center justify-center min-h-[120px]">
                    <Activity className="w-8 h-8 text-[#1E293B] mb-2" />
                    <span className="text-[#64748B] text-sm">该设备暂无上报事件或详细诊断信息</span>
                 </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
