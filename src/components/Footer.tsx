import { Scale } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 px-6 bg-white border-t border-black/5 text-center flex flex-col items-center">
      <div className="flex justify-center items-center gap-2 mb-6 grayscale opacity-80">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <Scale className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-[16px] tracking-tight text-black">WDS.</span>
      </div>
      <p className="text-[14px] text-zinc-400 font-light max-w-[400px]">
        © {new Date().getFullYear()} Worldwide Digital Service.<br /> All rights reserved.
      </p>
    </footer>
  );
}
