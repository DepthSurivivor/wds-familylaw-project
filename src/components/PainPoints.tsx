import { motion } from 'motion/react';
import { PhoneMissed, Clock, TrendingDown } from 'lucide-react';

export default function PainPoints() {
  const pains = [
    {
      icon: <PhoneMissed className="w-6 h-6 text-red-500" />,
      title: "Time-Sensitive Calls",
      desc: "Family law prospects are often stressed, uncertain, and ready to talk now. If no one answers, many move on to the next firm."
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-500" />,
      title: "After-Hours Gaps",
      desc: "When staff is unavailable during evenings, weekends, or active matter hours, unanswered calls can become missed opportunities."
    },
    {
      icon: <TrendingDown className="w-6 h-6 text-zinc-500" />,
      title: "Inconsistent Follow-Up",
      desc: "Voicemail and manual note-taking create friction, and incomplete intake details can slow down review and follow-up."
    }
  ];

  return (
    <section className="py-24 px-6 bg-white relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:100%_4rem] opacity-20 pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-[36px] md:text-[48px] font-bold text-black tracking-[-0.03em] mb-4">Where Family Law Intake Breaks Down</h2>
          <p className="text-[18px] text-slate-500 font-light">CaseCapture helps your team capture more potential client inquiries when calls are missed.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pains.map((pain, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              key={i} 
              className="bg-[#FAFAFA] border border-black/5 p-10 rounded-[32px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-black/5 group-hover:scale-110 transition-transform duration-500">
                {pain.icon}
              </div>
              <h3 className="text-[20px] font-semibold text-black mb-3">{pain.title}</h3>
              <p className="text-slate-500 leading-relaxed font-light text-[16px]">
                {pain.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
