import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { adminMenu } from '@/config/menu';
import { ChevronDown, ChevronRight, PieChart, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Sidebar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = (title: string) => {
    if (isCollapsed) setIsCollapsed(false);
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
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 240 }}
      className="bg-tech-panel border-r border-tech-border flex flex-col z-20 shrink-0"
    >
      <div className="h-[72px] p-6 border-b border-tech-border flex items-center justify-between shrink-0 overflow-hidden">
        <div className="flex items-center gap-3 w-[150px] shrink-0">
          <div className="w-8 h-8 bg-tech-cyan rounded flex items-center justify-center shrink-0">
            <div className="w-4 h-4 border-2 border-tech-bg"></div>
          </div>
          <span className={cn("font-bold tracking-tight text-white transition-opacity duration-200", isCollapsed ? "opacity-0 invisible" : "opacity-100")}>
            云水卫士系统
          </span>
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("p-1.5 text-[#64748B] hover:text-white rounded shrink-0", isCollapsed ? "mx-auto" : "")}
        >
          {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>
      
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto no-scrollbar overflow-x-hidden">
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
                    "w-full flex items-center px-3 py-2 text-[#94A3B8] hover:bg-tech-border cursor-pointer rounded-md transition-colors",
                    active ? "bg-tech-border text-white" : "",
                    isCollapsed ? "justify-center" : "justify-between"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.title}</span>}
                  </div>
                  {!isCollapsed && (isMenuOpen ? <ChevronDown className="w-3 h-3 shrink-0" /> : <ChevronRight className="w-3 h-3 shrink-0" />)}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  title={isCollapsed ? item.title : undefined}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2 cursor-pointer rounded-md transition-colors",
                    isActive 
                      ? "bg-tech-border border-l-2 border-tech-cyan text-white" 
                      : "text-[#94A3B8] hover:bg-tech-border border-l-2 border-transparent",
                    isCollapsed ? "justify-center px-0 border-l-0" : ""
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.title}</span>}
                </NavLink>
              )}

              <AnimatePresence>
                {hasChildren && isMenuOpen && !isCollapsed && (
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
                            <div className="text-xs text-[#64748B] py-1 font-semibold whitespace-nowrap">
                              {child.title}
                            </div>
                            <div className="space-y-1 ml-2">
                              {child.children.map(sub => (
                                <NavLink
                                  key={sub.title}
                                  to={sub.path}
                                  className={({ isActive }) => cn(
                                    "flex items-center gap-3 py-1 cursor-pointer transition-colors text-sm whitespace-nowrap",
                                    isActive 
                                      ? "text-tech-cyan" 
                                      : "text-[#94A3B8] hover:text-white"
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
                              "flex items-center py-2 px-3 cursor-pointer rounded-md transition-colors text-sm whitespace-nowrap",
                              isActive 
                                ? "text-white bg-tech-border" 
                                : "text-[#94A3B8] hover:text-white hover:bg-tech-border/50"
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
        
        <div className="mt-8 pt-4 border-t border-tech-border flex justify-center">
           <NavLink
              to="/h5/stats"
              title={isCollapsed ? "H5页面" : undefined}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm text-[#94A3B8] hover:bg-tech-border w-full",
                isCollapsed ? "justify-center" : ""
              )}
            >
              <PieChart className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span className="whitespace-nowrap">进入H5页面入口</span>}
            </NavLink>
        </div>
      </nav>

      <div className={cn("p-4 bg-tech-panel-secondary border-t border-tech-border flex items-center gap-3 shrink-0 overflow-hidden", isCollapsed ? "justify-center" : "")}>
        <div className="w-8 h-8 rounded-full bg-tech-cyan/20 border border-tech-cyan/50 flex items-center justify-center shrink-0">
          <span className="text-[10px] text-tech-cyan font-bold">Admin</span>
        </div>
        {!isCollapsed && (
          <div className="flex-1 overflow-hidden min-w-0">
            <div className="text-xs font-semibold truncate text-white">系统管理员</div>
            <div className="text-[10px] text-[#64748B] truncate">超级管理权限</div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
