import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AdminLayout() {
  return (
    <div className="flex h-screen w-full bg-tech-bg text-[#E0E6ED] font-sans overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-tech-cyan/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 z-10 relative">
        <Header />
        <main className="flex-1 flex flex-col overflow-y-auto bg-transparent">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
