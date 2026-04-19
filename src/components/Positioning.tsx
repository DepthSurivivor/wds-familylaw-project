import { ShieldAlert } from 'lucide-react';

export default function Positioning() {
  return (
    <section className="py-10 bg-[#FAFAFA] flex justify-center px-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 bg-zinc-100 border border-zinc-200 py-4 px-6 md:px-8 rounded-[24px] md:rounded-full text-center md:text-left">
         <ShieldAlert className="w-5 h-5 text-zinc-400" />
         <span className="text-[13px] text-zinc-500 font-bold uppercase tracking-widest shrink-0">Ethical Notice</span>
         <div className="hidden md:block w-1 h-1 bg-zinc-300 rounded-full mx-2" />
         <span className="text-[13px] text-zinc-500 font-medium leading-relaxed max-w-[500px]">
           This system classifies operational and administrative information; it does <strong className="font-bold text-zinc-700">not</strong> provide direct legal advice or replace an attorney.
         </span>
      </div>
    </section>
  );
}
