import { Scale } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 inset-x-0 h-20 w-full border-b border-black/5 bg-white/70 backdrop-blur-2xl z-50 flex items-center justify-between px-6 md:px-12"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg">
          <Scale className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold text-[15px] text-black tracking-tight hidden sm:block">
          Worldwide Digital Service
        </span>
      </div>
      <div className="flex items-center gap-6">
        <a href="#demo" className="hidden md:block text-[14px] font-medium text-slate-500 hover:text-black transition-colors tracking-wide">
          Try Assistant
        </a>
        <a href="#book" className="bg-black hover:bg-zinc-800 text-white px-6 py-2.5 rounded-full font-medium text-[14px] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
          Book Demo
        </a>
      </div>
    </motion.nav>
  );
}
