import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    if (username && password) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 xl:p-0 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-tech-cyan/20 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-5xl bg-[#111622]/80 backdrop-blur-xl border border-[#1E293B] rounded-2xl shadow-2xl flex overflow-hidden z-10 relative">
        {/* Left Side: Branding / Graphic */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-900/50 to-[#0F172A] border-r border-[#1E293B] flex-col justify-between p-12 relative overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-500 rounded-xl shadow-lg shadow-blue-500/30">
                <ShieldAlert className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-tech-cyan bg-clip-text text-transparent">水库资产保险平台</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white leading-tight mb-6 mt-16">
              智能管控，<br/>风险减量。
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed max-w-md">
              全面掌控水库资产运行状况，预测预警潜在风险，结合保险机制与智能运维，打造安全、高效的水利基础设施管理闭环。
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="flex gap-4">
              <div className="bg-[#1E293B]/50 border border-[#334155] rounded-lg px-4 py-3 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                <div className="text-xs text-[#64748B]">系统可用性</div>
              </div>
              <div className="bg-[#1E293B]/50 border border-[#334155] rounded-lg px-4 py-3 backdrop-blur-sm">
                <div className="text-2xl font-bold text-tech-cyan mb-1">12,450+</div>
                <div className="text-xs text-[#64748B]">监测设备实时接入</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative">
          <div className="max-w-sm w-full mx-auto">
            
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="p-2 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/30">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-tech-cyan bg-clip-text text-transparent">水库资产保险平台</span>
            </div>

            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">欢迎回来</h2>
              <p className="text-sm text-[#64748B]">使用您的账号密码登录管理后台</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">登录账号</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl px-10 py-3 text-white focus:border-blue-500 outline-none transition-colors placeholder:text-[#475569]"
                    placeholder="请输入账号"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">密码</label>
                  <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">忘记密码？</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl px-10 py-3 text-white focus:border-blue-500 outline-none transition-colors placeholder:text-[#475569]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded border-[#1E293B] bg-[#0F172A] text-blue-500 focus:ring-offset-[#111622]" />
                <label htmlFor="remember" className="text-sm text-[#64748B] cursor-pointer">记住账号</label>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2 group"
              >
                登录 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-[#1E293B] text-center">
              <p className="text-xs text-[#64748B]">需要以管护员身份访问？</p>
              <button onClick={() => navigate('/h5/login')} className="mt-2 text-sm text-tech-cyan hover:text-cyan-400 transition-colors">
                切换至移动端登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
