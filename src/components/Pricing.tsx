import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section className="py-32 px-6 bg-[#FAFAFA]">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[36px] md:text-[48px] font-bold text-black tracking-[-0.03em] mb-4">Why Family Law Firms Use CaseCapture</h2>
          <p className="text-[18px] text-slate-500 font-light max-w-[500px] mx-auto">
            Improve intake coverage, documentation, and follow-up consistency without changing how your team practices law.
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[480px] mx-auto bg-black text-white rounded-[40px] p-10 md:p-12 relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] isolate"
        >
          {/* Subtle top glare inside the black box */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
          
          <div className="absolute top-0 right-10 bg-white text-black text-[11px] font-bold px-4 py-2 rounded-b-xl uppercase tracking-widest">
            3-Day Free Trial
          </div>
          
          <div className="text-zinc-400 text-[14px] font-semibold mb-6 uppercase tracking-widest mt-4">CaseCapture for Family Law</div>
          <div className="flex items-end gap-2 mb-10">
            <div className="text-[72px] font-bold leading-none tracking-tight">$599</div>
            <div className="text-zinc-400 font-medium pb-2 text-[18px]">/ month</div>
          </div>
          
          <ul className="space-y-5 mb-12">
            {[
              'More consistent intake coverage', 
              'Better documentation for staff handoff', 
              'Fewer missed opportunities from unanswered calls', 
              'Professional first response when staff cannot answer immediately'
            ].map((feature, i) => (
              <li key={i} className="flex gap-4 items-start text-zinc-300 font-light text-[16px] leading-relaxed">
                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                {feature}
              </li>
            ))}
          </ul>
          
          <a href="#book" className="block text-center w-full bg-white text-black py-4 rounded-full font-semibold text-[16px] hover:bg-zinc-200 transition-colors shadow-lg hover:shadow-xl">
            See How It Works
          </a>
        </motion.div>
      </div>
    </section>
  );
}
