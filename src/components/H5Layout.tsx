import { Outlet, NavLink } from 'react-router-dom';
import { h5Menu } from '@/config/menu';
import { cn } from '@/lib/utils';
import { Smartphone, Monitor } from 'lucide-react';

export default function H5Layout() {
  return (
    <div className="min-h-screen bg-black sm:bg-tech-bg relative flex items-center justify-center sm:py-6 sm:px-4">
      <div className="absolute top-4 right-4 items-center gap-2 px-3 py-2.5 bg-tech-panel border border-tech-border rounded-md shadow-lg z-10 hidden sm:flex">
         <Monitor className="w-5 h-5 text-tech-cyan" />
         <span className="text-xs text-[#64748B] uppercase font-bold tracking-wider">Device Preview Mode</span>
         <NavLink to="/dashboard" className="ml-4 text-xs text-tech-cyan hover:underline">Return to Admin</NavLink>
      </div>

      <div className="w-full h-[100dvh] sm:max-w-[400px] sm:h-[800px] sm:max-h-[90vh] bg-[#0B0F17] sm:rounded-[2rem] sm:border-[6px] sm:border-[#111622] sm:shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col shrink-0">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-tech-cyan/5 blur-[80px] pointer-events-none z-0"></div>
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50 pointer-events-none">
          <div className="w-24 h-5 bg-[#111622] rounded-b-2xl shadow-md hidden sm:block"></div>
        </div>

        <main className="flex-1 bg-transparent overflow-y-auto w-full relative z-0 pb-16">
           <Outlet />
        </main>

        <nav className="absolute bottom-0 w-full h-16 bg-[#111622] border-t border-[#1E293B] flex items-center justify-around z-20 pb-2 pt-1 px-2">
          {h5Menu.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) => cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-tech-cyan" : "text-[#475569] hover:text-[#94A3B8]"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs uppercase font-bold tracking-wider">{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
