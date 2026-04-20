import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden flex flex-col items-center text-center">
      {/* Subtle elegant background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-200/50 via-white to-white -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/5 shadow-sm mb-10"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
        <span className="text-xs font-semibold text-slate-600 tracking-widest uppercase">
          Designed for Family Law Firms
        </span>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-[44px] md:text-[76px] lg:text-[88px] font-bold text-black tracking-[-0.04em] leading-[1.05] mb-8 max-w-[1000px]"
      >
        Don&apos;t Lose Family Law <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-900">Potential Clients to Missed Calls.</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[18px] md:text-[22px] text-slate-500 leading-relaxed font-light max-w-[700px] mb-12"
      >
        CaseCapture helps family law firms answer, screen, and document inbound calls when staff is unavailable, busy, or after hours.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
      >
        <a href="#book" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-zinc-800 transition-all shadow-xl hover:shadow-black/20 hover:-translate-y-1 text-[16px]">
          <Calendar className="w-5 h-5" />
          Book a Call
        </a>
        <a href="#demo" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white border border-black/10 text-black font-medium rounded-full hover:bg-slate-50 transition-all text-[16px]">
          See How It Works
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}
