import { motion } from 'motion/react';
import { CalendarDays, CheckCircle, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ValidationError, useForm } from '@formspree/react';
import type { PlanValue } from './Pricing';

type FinalCTAProps = {
  selectedPlan: PlanValue | null;
};

const PLAN_LABELS: Record<PlanValue, string> = {
  starter: 'Starter',
  growth: 'Growth',
  pro: 'Pro',
};

export default function FinalCTA({ selectedPlan }: FinalCTAProps) {
  const [state, submitToFormspree] = useForm('xpqklydp');
  const [isSuccess, setIsSuccess] = useState(false);
  const selectedPlanLabel = selectedPlan ? PLAN_LABELS[selectedPlan] : null;
  const selectedPlanValue = selectedPlan ?? 'exploring_options';

  useEffect(() => {
    if (state.succeeded) {
      setIsSuccess(true);
    }
  }, [state.succeeded]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitToFormspree(e);
  };

  return (
    <section id="book" className="py-32 px-6 bg-white relative overflow-hidden isolate">
      <div className="absolute inset-0 bg-[#FAFAFA] -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10"></div>
      
      <div className="max-w-[800px] mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-black/10 shadow-2xl rounded-[40px] p-8 md:p-16 relative overflow-hidden text-left"
        >
          {/* Subtle top glare */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50 z-20" />
          
          {!isSuccess ? (
            <>
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-full mx-auto flex items-center justify-center mb-6 text-blue-600 shadow-sm relative z-10">
                  <CalendarDays className="w-8 h-8" />
                </div>
                
                <h2 className="text-[36px] md:text-[48px] font-bold text-black tracking-[-0.03em] mb-4 leading-tight relative z-10">
                  See CaseCapture in Action
                </h2>
                <p className="text-[16px] text-slate-500 font-light max-w-[500px] mx-auto relative z-10 leading-relaxed">
                  Book a short walkthrough to see how CaseCapture helps answer, screen, and document inbound family law calls based on your firm&apos;s intake criteria.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 max-w-[500px] mx-auto relative z-10">
                {selectedPlanLabel ? (
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-3">
                    <p className="text-[15px] font-medium text-slate-700">Interested in: {selectedPlanLabel}</p>
                    <p className="text-[12px] text-slate-500 mt-1">You can change this during the call</p>
                  </div>
                ) : null}

                <input type="hidden" name="selectedPlan" value={selectedPlanValue} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-slate-700">First Name</label>
                    <input required name="firstName" type="text" className="w-full px-4 py-3 rounded-xl border border-black/10 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-[15px]" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-slate-700">Last Name</label>
                    <input required name="lastName" type="text" className="w-full px-4 py-3 rounded-xl border border-black/10 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-[15px]" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-slate-700">Work Email</label>
                  <input required name="email" type="email" className="w-full px-4 py-3 rounded-xl border border-black/10 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-[15px]" placeholder="john@lawfirm.com" />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-[13px] text-red-600"
                  />
                </div>
                 <div className="space-y-2">
                  <label className="text-[13px] font-medium text-slate-700">Law Firm Name</label>
                  <input required name="lawFirmName" type="text" className="w-full px-4 py-3 rounded-xl border border-black/10 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-[15px]" placeholder="Doe Legal Group" />
                </div>
                {state.errors && state.errors.length > 0 && !state.submitting && !state.succeeded ? (
                  <p className="text-[13px] text-red-600 text-center">
                    Something went wrong while submitting your request. Please try again.
                  </p>
                ) : null}
                
                <button 
                  type="submit" 
                  disabled={state.submitting}
                  className="w-full bg-black text-white py-4 rounded-xl font-medium text-[16px] hover:bg-zinc-800 transition-all shadow-xl hover:shadow-black/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {state.submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Request Demo Walkthrough"}
                </button>
                <p className="text-[12px] text-center text-slate-400 mt-4">Built to support your team&apos;s workflow. CaseCapture does not provide legal advice.</p>
              </form>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-10"
            >
              <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-500">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-[36px] md:text-[40px] font-bold text-black tracking-[-0.03em] mb-4 leading-tight">
                Demo Requested
              </h2>
                <p className="text-[16px] text-slate-500 font-light max-w-[400px] mx-auto leading-relaxed mb-8">
                Your request has been received. Our team will follow up shortly to confirm a time and walk through your family law intake workflow.
              </p>
              <button 
                onClick={() => setIsSuccess(false)} 
                className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-black font-medium border border-black/5 rounded-full transition-colors text-[14px]"
              >
                Book Another Session
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
