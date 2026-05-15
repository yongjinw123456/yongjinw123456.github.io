import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ShieldCheck, Mail, ArrowRight, ShieldAlert, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

export default function H5Login() {
  const [loginMethod, setLoginMethod] = useState<'sms' | 'password'>('sms');
  const [identifier, setIdentifier] = useState('');
  const [credential, setCredential] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier && credential) {
      navigate('/h5/stats');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[50%] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-20%] w-[60%] h-[40%] bg-tech-cyan/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center mb-4">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">水库管护平台</h1>
          <p className="text-sm text-[#64748B]">随时随地，掌握水库动态</p>
        </div>

        {/* Login Form Container */}
        <div className="bg-[#111622]/80 backdrop-blur-xl border border-[#1E293B] rounded-3xl p-6 shadow-xl">
          
          {/* Method Switcher */}
          <div className="flex p-1 bg-[#0F172A] rounded-xl mb-6">
            <button
              onClick={() => { setLoginMethod('sms'); setIdentifier(''); setCredential(''); }}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
                loginMethod === 'sms' ? "bg-[#1E293B] text-white shadow" : "text-[#64748B]"
              )}
            >
              验证码登录
            </button>
            <button
              onClick={() => { setLoginMethod('password'); setIdentifier(''); setCredential(''); }}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
                loginMethod === 'password' ? "bg-[#1E293B] text-white shadow" : "text-[#64748B]"
              )}
            >
              密码登录
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <AnimatePresence mode="wait">
              {loginMethod === 'sms' ? (
                <motion.div
                  key="sms"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input 
                      type="tel" 
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="请输入手机号"
                      required
                      className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="relative flex gap-3">
                    <div className="relative flex-1">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                      <input 
                        type="text" 
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        placeholder="请输入验证码"
                        required
                        className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                    <button type="button" className="shrink-0 px-4 py-3.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] rounded-xl text-sm font-medium text-blue-400 transition-colors whitespace-nowrap">
                      获取验证码
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="password"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input 
                      type="text" 
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="请输入手机号/账号"
                      required
                      className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <input 
                      type="password" 
                      value={credential}
                      onChange={(e) => setCredential(e.target.value)}
                      placeholder="请输入密码"
                      required
                      className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-500 active:from-blue-700 active:to-blue-600 text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
            >
              登录 <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-[#64748B]">
            <a href="#" className="hover:text-blue-400">联系系统管理员</a>
            <span className="w-px h-3 bg-[#1E293B]"></span>
            <button onClick={() => navigate('/login')} className="hover:text-cyan-400">访问管理后台</button>
          </div>

        </div>
      </div>
      
      {/* Footer text */}
      <div className="pb-8 text-center text-[10px] text-[#475569] z-10">
        <p>提供技术支持 © 水库资产保险管控平台</p>
      </div>
    </div>
  );
}
