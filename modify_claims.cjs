const fs = require('fs');

let code = fs.readFileSync('src/pages/risk/ClaimsRecords.tsx', 'utf8');

const insert = `
                 {(drawerMode === 'view' || drawerMode === 'edit') && (
                  <section>
                    <h4 className="text-[10px] text-tech-cyan uppercase font-bold tracking-widest border-b border-[#1E293B] pb-2 mb-4">操作记录</h4>
                    <div className="bg-[#111622] border border-[#1E293B] rounded flex flex-col overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-[#0F172A] text-[10px] text-[#64748B] uppercase tracking-widest border-b border-[#1E293B]">
                          <tr>
                            <th className="px-3 py-2 font-medium">操作时间</th>
                            <th className="px-3 py-2 font-medium">操作人</th>
                            <th className="px-3 py-2 font-medium">操作类型</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs text-white divide-y divide-[#1E293B]">
                          <tr className="hover:bg-[#1E293B]/20">
                            <td className="px-3 py-2 font-mono text-[#94A3B8]">2024-05-13 14:00</td>
                            <td className="px-3 py-2">系统理赔专员</td>
                            <td className="px-3 py-2 text-green-400">理赔确认</td>
                          </tr>
                          <tr className="hover:bg-[#1E293B]/20">
                            <td className="px-3 py-2 font-mono text-[#94A3B8]">2024-05-12 15:30</td>
                            <td className="px-3 py-2">管理员</td>
                            <td className="px-3 py-2 text-blue-400">新增理赔</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                 )}
`;

code = code.replace("                  </section>\n\n              </div>", "                  </section>\n" + insert + "\n              </div>");

fs.writeFileSync('src/pages/risk/ClaimsRecords.tsx', code, 'utf8');
