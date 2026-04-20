import { motion, AnimatePresence } from 'motion/react';
import { PhoneCall, Loader2, ClipboardCheck, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';

export default function DemoSection() {
  const [step, setStep] = useState<'intro' | 'simulating' | 'result'>('intro');
  const [formData, setFormData] = useState({
    name: 'Sarah Jenkins',
    phone: '(555) 123-4567',
    issue: 'Caller was served with a custody modification request and is concerned about an upcoming hearing this week.',
  });
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
          <h2 className="text-[36px] md:text-[48px] font-bold text-black tracking-[-0.03em] mb-4">Example Incoming Inquiry</h2>
          <p className="text-[18px] text-slate-500 font-light max-w-[600px] mx-auto">
            This is an example of how an inbound family law inquiry can be captured and organized for staff follow-up.
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
                    <PhoneCall className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-[24px] font-semibold text-black tracking-tight">Example Incoming Call</h3>
                    <p className="text-slate-500 text-[14px]">A stressed caller shares details quickly. CaseCapture structures the inquiry so your staff can review and follow up.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="bg-slate-50 border border-black/10 rounded-2xl p-5 md:p-6">
                    <p className="text-[13px] font-medium text-slate-700 mb-3">Caller Notes (Example)</p>
                    <p className="text-[15px] text-slate-700 leading-relaxed">
                      “Hi, this is {formData.name}. I&apos;m calling because my ex filed to change custody and I just got served.
                      I&apos;m worried about a hearing this week and need to know my options. You can reach me at {formData.phone}.”
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <p className="text-[12px] uppercase tracking-wider text-slate-500">Matter Type</p>
                      <p className="text-[15px] text-slate-700">Custody Modification</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[12px] uppercase tracking-wider text-slate-500">Urgency Signal</p>
                      <p className="text-[15px] text-slate-700">Hearing this week / callback requested</p>
                    </div>
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
                        <span>Structuring inquiry for review...</span>
                      </>
                    ) : (
                      "See Intake Summary"
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
                <h3 className="text-[20px] font-semibold text-black mb-2 tracking-tight">Structuring Incoming Inquiry...</h3>
                <p className="text-slate-500 text-[14px]">Preparing a clear summary for staff follow-up.</p>
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
                      <h3 className="text-[20px] font-semibold text-black tracking-tight">Intake Summary Ready</h3>
                      <p className="text-slate-500 text-[13px] font-mono mt-0.5">ID: FL-INTAKE-{Math.floor(Math.random() * 10000)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setStep('intro');
                      setFormData({
                        name: 'Sarah Jenkins',
                        phone: '(555) 123-4567',
                        issue: 'Caller was served with a custody modification request and is concerned about an upcoming hearing this week.',
                      });
                    }}
                    className="flex items-center justify-center gap-2 text-[13px] font-medium text-slate-500 hover:text-black transition-colors bg-slate-50 px-4 py-2 rounded-lg border border-black/5 shrink-0"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                <div className="bg-[#1E1E1E] rounded-2xl p-6 md:p-8 text-[13px] leading-[1.6] overflow-x-auto shadow-inner border border-black/10">
                  <div className="text-emerald-400 mb-5 text-[12px] uppercase tracking-widest">Prepared for Staff Follow-Up</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-slate-200">
                    <div>
                      <p className="text-slate-400 text-[12px] uppercase tracking-wider">Caller Name</p>
                      <p className="text-[15px]">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[12px] uppercase tracking-wider">Phone</p>
                      <p className="text-[15px]">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[12px] uppercase tracking-wider">Matter Type</p>
                      <p className="text-[15px]">Custody Modification (Family Law)</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[12px] uppercase tracking-wider">Urgency</p>
                      <p className="text-[15px]">Hearing this week; callback requested today</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-slate-400 text-[12px] uppercase tracking-wider">Context</p>
                      <p className="text-[15px]">{formData.issue}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-slate-400 text-[12px] uppercase tracking-wider">Next Step</p>
                      <p className="text-[15px]">Route to intake staff for priority callback and consultation scheduling.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-black/5 pt-8">
                  <div className="flex items-center gap-2 text-slate-500 font-semibold text-[13px] uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-lg border border-black/5">
                    <ClipboardCheck className="w-4 h-4" /> Ready for Review
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
