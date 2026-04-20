import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, Loader2, FileJson, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';

export default function DemoSection() {
  const [step, setStep] = useState<'intro' | 'simulating' | 'result'>('intro');
  const [formData, setFormData] = useState({ name: '', phone: '', issue: '' });
  const [isInitializing, setIsInitializing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInitializing(true);
    setTimeout(() => {
      setStep('simulating');
      setIsInitializing(false);
      setTimeout(() => {
        setStep('result');
      }, 2400);
    }, 600);
  };

  return (
    <section id="demo" className="py-24 px-6 bg-[#FAFAFA]">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[36px] md:text-[48px] font-bold text-black tracking-[-0.03em] mb-4">Test the Family Law Intake Demo</h2>
          <p className="text-[18px] text-slate-500 font-light max-w-[600px] mx-auto">
            This simulates the demo-line experience. Enter a sample family law inquiry to see how CaseCapture documents intake details.
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-black/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[40px] p-8 md:p-14 relative overflow-hidden text-left min-h-[450px] flex flex-col justify-center"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
          
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-[#FAFAFA] border border-black/5 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <Keyboard className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-[24px] font-semibold text-black tracking-tight">Simulate a New Inquiry</h3>
                    <p className="text-slate-500 text-[14px]">Provide basic details to see how information is screened and documented for staff follow-up.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-slate-700">Caller Name</label>
                      <input 
                        required 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all text-[15px]" 
                        placeholder="Sarah Jenkins" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-slate-700">Phone Number</label>
                      <input 
                        required 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        type="tel" 
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all text-[15px]" 
                        placeholder="(555) 123-4567" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-slate-700">Brief Description of Issue</label>
                    <textarea 
                      required 
                      value={formData.issue}
                      onChange={e => setFormData({...formData, issue: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all text-[15px] min-h-[100px] resize-none" 
                      placeholder="I need help with a custody arrangement modification..." 
                    />
                  </div>

                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={isInitializing}
                    className="w-full px-10 py-4 mt-2 bg-black text-white font-medium rounded-xl transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:shadow-none disabled:opacity-100 disabled:cursor-wait hover:bg-zinc-800"
                  >
                    {isInitializing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-slate-500" /> 
                        <span>Submitting sample inquiry...</span>
                      </>
                    ) : (
                      "Generate Intake Summary"
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}

            {step === 'simulating' && (
              <motion.div
                key="simulating"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-10 h-[380px]"
              >
                <Loader2 className="w-12 h-12 text-black animate-spin mb-6" />
                <h3 className="text-[20px] font-semibold text-black mb-2 tracking-tight">Processing Simulated Intake...</h3>
                <p className="text-slate-500 text-[14px]">Organizing call details for your team&apos;s review.</p>
              </motion.div>
            )}

            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-black/5 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center shadow-sm text-emerald-600 shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-semibold text-black tracking-tight">Call Documented</h3>
                      <p className="text-slate-500 text-[13px] font-mono mt-0.5">ID: FL-INTAKE-{Math.floor(Math.random() * 10000)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setStep('intro'); setFormData({ name: '', phone: '', issue: '' }); }}
                    className="flex items-center justify-center gap-2 text-[13px] font-medium text-slate-500 hover:text-black transition-colors bg-slate-50 px-4 py-2 rounded-lg border border-black/5 shrink-0"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                <div className="bg-[#1E1E1E] rounded-2xl p-6 md:p-8 font-mono text-[13px] leading-[1.6] overflow-x-auto shadow-inner border border-black/10">
                  <div className="text-emerald-400 mb-4">{`// DOCUMENTED_INTAKE_DATA`}</div>
                  <div className="text-slate-300">
                    <span className="text-purple-400">"status"</span>: <span className="text-amber-300">"Ready for Review"</span>,<br/>
                    <span className="text-purple-400">"caller_name"</span>: <span className="text-green-300">"{formData.name}"</span>,<br/>
                    <span className="text-purple-400">"phone_number"</span>: <span className="text-green-300">"{formData.phone}"</span>,<br/>
                    <span className="text-purple-400">"case_category"</span>: <span className="text-green-300">"Family Law - Initial Intake"</span>,<br/>
                    <span className="text-purple-400">"client_sentiment"</span>: <span className="text-green-300">"Stressed / Needs guidance"</span>,<br/>
                    <span className="text-purple-400">"raw_description"</span>: <span className="text-green-300">"{formData.issue}"</span><br/>
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-black/5 pt-8">
                  <div className="flex items-center gap-2 text-slate-500 font-semibold text-[13px] uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-lg border border-black/5">
                    <FileJson className="w-4 h-4" /> Intake Summary Ready
                  </div>
                  <a href="#book" className="w-full sm:w-auto px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-zinc-800 transition-all duration-300 shadow-xl hover:shadow-black/30 hover:scale-105 text-[15px] flex items-center justify-center gap-2 group">
                    Book a Call
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300 ease-out" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
