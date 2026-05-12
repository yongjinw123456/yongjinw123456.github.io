import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { adminMenu } from '@/config/menu';
import { ChevronDown, ChevronRight, PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Sidebar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-60 bg-tech-panel border-r border-tech-border flex flex-col z-20">
      <div className="p-6 border-b border-tech-border flex items-center gap-3">
        <div className="w-8 h-8 bg-tech-cyan rounded flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-tech-bg"></div>
        </div>
        <span className="font-bold tracking-tight text-white">云水卫士系统</span>
      </div>
      
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto no-scrollbar">
        {adminMenu.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isMenuOpen = openMenus.includes(item.title);
          const active = isActive(item.path);

          return (
            <div key={item.title}>
              {hasChildren ? (
                <button
                  onClick={() => toggleMenu(item.title)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-[#94A3B8] hover:bg-tech-border cursor-pointer rounded-md transition-colors",
                    active ? "bg-tech-border text-white" : ""
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.title}</span>
                  </div>
                  {isMenuOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2 cursor-pointer rounded-md transition-colors",
                    isActive 
                      ? "bg-tech-border border-l-2 border-tech-cyan text-white" 
                      : "text-[#94A3B8] hover:bg-tech-border border-l-2 border-transparent"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.title}</span>
                </NavLink>
              )}

              <AnimatePresence>
                {hasChildren && isMenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-10 mt-1 space-y-1"
                  >
                    {item.children?.map(child => (
                      <div key={child.title}>
                        {child.children ? (
                          <div className="mb-1">
                            <div className="text-xs text-[#64748B] py-1 font-semibold">
                              {child.title}
                            </div>
                            <div className="space-y-1 ml-2">
                              {child.children.map(sub => (
                                <NavLink
                                  key={sub.title}
                                  to={sub.path}
                                  className={({ isActive }) => cn(
                                    "flex items-center gap-3 py-1 cursor-pointer transition-colors text-xs",
                                    isActive 
                                      ? "text-tech-cyan" 
                                      : "text-[#64748B] hover:text-tech-cyan"
                                  )}
                                >
                                  <span>{sub.title}</span>
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <NavLink
                            to={child.path}
                            className={({ isActive }) => cn(
                              "flex items-center py-1 cursor-pointer transition-colors text-xs",
                              isActive 
                                ? "text-tech-cyan" 
                                : "text-[#64748B] hover:text-tech-cyan"
                            )}
                          >
                            <span>{child.title}</span>
                          </NavLink>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        
        <div className="mt-8 pt-4 border-t border-tech-border">
           <NavLink
              to="/h5/stats"
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm text-[#94A3B8] hover:bg-tech-border group"
              )}
            >
              <PieChart className="w-4 h-4" />
              <span>进入H5页面入口</span>
            </NavLink>
        </div>
      </nav>

      <div className="p-4 bg-tech-panel-secondary border-t border-tech-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-tech-cyan/20 border border-tech-cyan/50 flex items-center justify-center">
            <span className="text-[10px] text-tech-cyan font-bold">Admin</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-xs font-semibold truncate text-white">系统管理员</div>
            <div className="text-[10px] text-[#64748B] truncate">超级管理权限</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
