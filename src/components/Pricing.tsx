import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export type PlanValue = 'starter' | 'growth' | 'pro';

const plans = [
  {
    name: 'Starter',
    value: 'starter' as PlanValue,
    price: '$399',
    tagline: 'Never miss a lead again',
    features: [
      'Captures inbound calls 24/7',
      'Sends caller details instantly',
      'Basic message summary',
      'Email notifications',
    ],
    outcome: 'You’ll always know who called — but your team still does the work',
    cardClass: 'bg-white border border-zinc-200 text-zinc-900',
    taglineClass: 'text-zinc-500',
    featureTextClass: 'text-zinc-600',
    checkClass: 'text-zinc-800',
    buttonClass: 'bg-black text-white hover:bg-zinc-800',
    outcomeClass: 'text-zinc-700',
  },
  {
    name: 'Growth',
    value: 'growth' as PlanValue,
    price: '$599',
    tagline: 'Organized, structured, ready to act',
    badge: 'Most Popular',
    features: [
      'Everything in Starter',
      'Structured intake summaries',
      'Matter type + urgency detection',
      'Key details extracted automatically',
      'Staff-ready formatted emails',
    ],
    outcome: 'Your team doesn’t just see the lead — they understand it immediately',
    cardClass:
      'bg-black text-white border border-black shadow-[0_24px_70px_-20px_rgba(0,0,0,0.45)] ring-2 ring-emerald-300/70 scale-[1.02] md:scale-105',
    taglineClass: 'text-zinc-300',
    featureTextClass: 'text-zinc-200',
    checkClass: 'text-emerald-300',
    buttonClass: 'bg-white text-black hover:bg-zinc-200',
    outcomeClass: 'text-emerald-200',
  },
  {
    name: 'Pro',
    value: 'pro' as PlanValue,
    price: '$899',
    tagline: 'Intake that thinks for your team',
    features: [
      'Everything in Growth',
      'Lead prioritization & scoring',
      'Recommended next steps',
      'Staff guidance / response direction',
      'High-value lead identification',
    ],
    outcome: 'Your team responds faster, smarter, and with better outcomes',
    cardClass: 'bg-zinc-900 text-white border border-zinc-700 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.5)]',
    taglineClass: 'text-zinc-300',
    featureTextClass: 'text-zinc-200',
    checkClass: 'text-amber-300',
    buttonClass: 'bg-amber-300 text-zinc-900 hover:bg-amber-200',
    outcomeClass: 'text-amber-100',
  },
];

type PricingProps = {
  onSelectPlan: (plan: PlanValue) => void;
};

export default function Pricing({ onSelectPlan }: PricingProps) {
  return (
    <section className="py-24 px-6 bg-[#FAFAFA]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-[34px] md:text-[48px] font-bold text-black tracking-[-0.03em] mb-4">
            Choose How You Handle Your Intake
          </h2>
          <p className="text-[18px] text-slate-500 font-light max-w-[760px] mx-auto">
            From simple lead capture to fully structured, staff-ready intake — scale as your firm grows.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[32px] p-8 md:p-9 relative flex flex-col ${plan.cardClass}`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-300 text-black text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-[28px] font-bold tracking-tight">{plan.name}</h3>
                <p className={`text-[15px] mt-2 ${plan.taglineClass}`}>{plan.tagline}</p>
              </div>

              <div className="flex items-end gap-2 mb-7">
                <div className="text-[54px] font-bold leading-none tracking-tight">{plan.price}</div>
                <div className={`font-medium pb-1.5 text-[16px] ${plan.taglineClass}`}>/ mo</div>
              </div>

              <ul className="space-y-3.5 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex gap-3 items-start text-[15px] leading-relaxed ${plan.featureTextClass}`}>
                    <Check className={`w-4.5 h-4.5 flex-shrink-0 mt-1 ${plan.checkClass}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <p className={`text-[15px] leading-relaxed font-medium mt-auto mb-8 pt-5 border-t border-white/10 ${plan.outcomeClass}`}>
                {plan.outcome}
              </p>

              <a
                href="#book"
                onClick={() => onSelectPlan(plan.value)}
                className={`block text-center w-full py-3.5 rounded-full font-semibold text-[15px] transition-colors shadow-sm hover:shadow-md ${plan.buttonClass}`}
              >
                Start 3-Day Free Trial
              </a>
            </article>
          ))}
        </motion.div>

        <p className="text-center text-sm text-zinc-500 mt-9">
          All plans include a 3-day free trial. No setup fees. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
