import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import HowItWorks from './components/HowItWorks';
import DemoSection from './components/DemoSection';
import Positioning from './components/Positioning';
import Pricing, { type PlanValue } from './components/Pricing';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<PlanValue | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col w-full overflow-x-hidden selection:bg-black selection:text-white">
      <Navbar />
      <main className="flex-1 w-full pt-10">
        <Hero />
        <PainPoints />
        <HowItWorks />
        <DemoSection />
        <Pricing onSelectPlan={setSelectedPlan} />
        <FinalCTA selectedPlan={selectedPlan} />
        <Positioning />
      </main>
      <Footer />
    </div>
  );
}
