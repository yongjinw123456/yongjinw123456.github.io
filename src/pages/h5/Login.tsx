import React, { useState } from 'react';
import { Phone, ShieldAlert, KeyRound, ArrowRight, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function H5Login() {
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
    <div className="min-h-screen bg-black sm:bg-tech-bg relative flex items-center justify-center sm:py-6 sm:px-4">
      {/* Device preview mode hint if needed, or just identical container */}
      <div className="absolute top-4 right-4 items-center gap-2 px-3 py-2.5 bg-tech-panel border border-tech-border rounded-md shadow-lg z-10 hidden sm:flex">
         <Monitor className="w-5 h-5 text-tech-cyan" />
         <span className="text-xs text-[#64748B] uppercase font-bold tracking-wider">Device Preview Mode</span>
      </div>

      <div className="w-full h-[100dvh] sm:max-w-[400px] sm:h-[800px] sm:max-h-[90vh] bg-[#0F172A] relative overflow-hidden sm:rounded-[2rem] sm:border-[6px] sm:border-[#111622] sm:shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col shrink-0">
        {/* Background decoration */}
        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[50%] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-20%] w-[60%] h-[40%] bg-tech-cyan/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex-1 flex flex-col justify-center px-6 py-12 z-10 overflow-y-auto">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center mb-4">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">水库管护平台</h1>
            <p className="text-base text-[#64748B]">随时随地，掌握水库动态</p>
          </div>

          {/* Login Form Container */}
          <div className="bg-[#111622]/80 backdrop-blur-xl border border-[#1E293B] rounded-3xl p-6 shadow-xl">

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-4">
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
              </div>

              <button 
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-500 active:from-blue-700 active:to-blue-600 text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
              >
                登录 <ArrowRight className="w-5 h-5" />
              </button>
            </form>

          </div>
        </div>
        
        {/* Footer text */}
        <div className="pb-8 shrink-0 text-center text-xs text-[#475569] z-10">
          <p>提供技术支持 © 水库资产保险管控平台</p>
        </div>
      </div>
    </div>
  );
}
