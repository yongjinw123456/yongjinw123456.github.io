const fs = require('fs');

let code = fs.readFileSync('src/pages/business/ReservoirManagement.tsx', 'utf8');

const regex = /<h2 className="text-xl font-bold text-white flex items-center gap-3">[\s\S]*?<div className="shrink-0 p-3 bg=\[#111622\] border border=\[#1E293B\] rounded-lg flex items-center justify-between text-xs text-\[#64748B\]">/;

const replacement = `<h2 className="text-xl font-bold text-white flex items-center gap-3">
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
        
        <div className="shrink-0 p-3 bg-[#111622] border border-[#1E293B] rounded-lg flex items-center justify-between text-xs text-[#64748B]">`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/pages/business/ReservoirManagement.tsx', code, 'utf8');
