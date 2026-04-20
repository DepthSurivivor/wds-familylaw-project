import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HowItWorks() {
  const steps = [
    { label: "01", title: "Call Comes In", desc: "A prospective client contacts your family law firm by phone." },
    { label: "02", title: "System Engages", desc: "CaseCapture helps answer the call and screen the inquiry based on your firm&apos;s intake criteria." },
    { label: "03", title: "Team Receives Context", desc: "Your staff receives documented details and next steps so they can review and follow up faster." }
  ];

  const [parsingState, setParsingState] = useState<'processing' | 'done'>('processing');

  useEffect(() => {
    const cycleAnimation = () => {
      setParsingState('processing');
      setTimeout(() => {
        setParsingState('done');
      }, 3000);
    };
    
    const initialDelay = setTimeout(cycleAnimation, 500);
    const interval = setInterval(cycleAnimation, 7000);
    
    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-24 px-6 md:px-10">
      <div className="bg-black text-white rounded-[40px] md:rounded-[60px] py-24 px-8 md:px-16 overflow-hidden relative max-w-[1400px] mx-auto shadow-2xl">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-20 items-center relative z-10">
          <div className="lg:w-1/2">
            <h2 className="text-[40px] md:text-[56px] font-bold tracking-[-0.03em] mb-6 leading-tight">
              Built to Support Intake Teams.
            </h2>
            <p className="text-[20px] text-zinc-400 font-light leading-relaxed mb-12 max-w-[500px]">
              Designed around real family law workflows to help answer, screen, and document inbound calls more consistently.
            </p>
            
            <div className="flex flex-col gap-10">
              {steps.map((step, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  key={i} 
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 text-[18px] font-medium text-zinc-600 w-8 pt-1">
                    {step.label}
                  </div>
                  <div>
                    <h3 className="text-[22px] font-semibold mb-2">{step.title}</h3>
                    <p className="text-zinc-400 font-light text-[16px] leading-relaxed max-w-[400px]">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ perspective: 1000 }}
              className="w-full aspect-[4/3] bg-zinc-900 rounded-[32px] border border-white/10 p-8 flex flex-col shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
                <div className="font-mono text-zinc-500 text-sm tracking-wider">INTAKE_FILE.json</div>
                <div className="flex items-center gap-2">
                  <div className={`text-[11px] font-mono uppercase tracking-widest transition-colors ${parsingState === 'processing' ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {parsingState === 'processing' ? 'Processing' : 'Completed'}
                  </div>
                  <div className={`w-2 h-2 rounded-full ${parsingState === 'processing' ? 'bg-amber-500 animate-[pulse_1.5s_ease-in-out_infinite]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'}`} />
                </div>
              </div>
              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  {parsingState === 'processing' ? (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6 absolute inset-0"
                    >
                      {[1, 2, 3, 4, 5].map((item, i) => (
                        <div key={i} className="flex gap-4 items-center">
                          <CheckCircle2 className="w-5 h-5 text-zinc-700" />
                          <div className={`h-2.5 bg-zinc-800 rounded-full w-full animate-[pulse_2s_ease-in-out_infinite]`} style={{ maxWidth: `${85 - (i * 12)}%`, animationDelay: `${i * 200}ms` }} />
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 font-mono text-[14px] md:text-[15px] leading-relaxed md:leading-[1.8]"
                    >
                      <div className="text-emerald-400 mb-4">{`// INTAKE_DOCUMENTED_SUCCESSFULLY`}</div>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                        <span className="text-purple-400">"case_type"</span>: <span className="text-amber-300">"Divorce"</span>,
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <span className="text-purple-400">"urgency"</span>: <span className="text-amber-300">"Priority Follow-Up"</span>,
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                        <span className="text-purple-400">"assets_involved"</span>: <span className="text-blue-300">true</span>,
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                        <span className="text-purple-400">"children"</span>: <span className="text-emerald-300">2</span>,
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                        <span className="text-purple-400">"next_step"</span>: <span className="text-amber-300">"Staff callback requested"</span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
