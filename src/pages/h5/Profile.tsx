import { User, Shield, ChevronRight, Lock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full fade-in pb-8">
      {/* Header Profile Info */}
      <div className="bg-[#111622] pt-8 pb-6 px-6 border-b border-[#1E293B] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-tech-cyan/5 rounded-full blur-[40px] -mr-10 -mt-10"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-full bg-[#1E293B] border-2 border-[#334155] flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
             <User className="w-8 h-8 text-[#64748B]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white mb-1">张三</h1>
            <p className="text-sm text-[#94A3B8] flex items-center gap-2 mb-1.5">
               温州市水利局
            </p>
            <div className="inline-flex items-center gap-1 bg-[#1E293B] px-2 py-1 rounded text-xs text-tech-cyan border border-tech-cyan/20 cursor-default">
              <Shield className="w-5 h-5" /> 监管方人员
            </div>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="p-4 space-y-3">
        <div className="bg-[#111622] border border-[#1E293B] rounded-xl overflow-hidden shadow-sm">

          <button className="w-full flex items-center justify-between p-4 bg-transparent hover:bg-[#1E293B]/50 transition-colors active:bg-[#1E293B]">
             <div className="flex items-center gap-3">
               <div className="w-7 h-7 rounded bg-orange-500/20 flex items-center justify-center">
                 <Lock className="w-5 h-5 text-orange-500" />
               </div>
               <span className="text-base text-white font-medium">修改密码</span>
             </div>
             <ChevronRight className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>

        <div className="bg-[#111622] border border-[#1E293B] rounded-xl overflow-hidden shadow-sm mt-4">
          <button onClick={() => navigate('/h5/login')} className="w-full flex items-center justify-center p-4 bg-transparent hover:bg-red-500/10 text-red-500 transition-colors active:bg-red-500/20 gap-2">
            <LogOut className="w-5 h-5" />
            <span className="text-base font-medium">退出登录</span>
          </button>
        </div>
      </div>

    </div>
  );
}
