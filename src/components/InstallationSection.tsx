import React, { useState } from "react";
import { Sliders, HelpCircle, CheckCircle2, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InstallationSectionProps {
  activeTab: string;
}

export const InstallationSection: React.FC<InstallationSectionProps> = ({ activeTab }) => {
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false]);

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const completedCount = completedSteps.filter(Boolean).length;
  const percentCompleted = Math.round((completedCount / 4) * 100);

  return (
    <motion.section 
      id="installation" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-[#fbfaf3] border border-[#d1ccc7] rounded-3xl p-8 md:p-12 shadow-md"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT INFO */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <span className="text-[10px] font-mono tracking-widest font-bold text-zinc-700 bg-[#e8e2da]/70 border border-zinc-200 rounded-full px-3 py-1 w-fit uppercase select-none">
            📦 INITIAL STATE INITIALIZATION
          </span>
          <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-400 to-zinc-200 leading-none select-none">
            00
          </span>
          <h3 className="font-sans font-semibold text-2xl text-black tracking-tight mt-2">
            Setup Terminal &amp; System Installation
          </h3>
          <p className="text-xs text-zinc-550 font-light leading-relaxed">
            Register the extension manual toolset into Adobe After Effects by saving the payload and configuring system preferences. Complete the checklist to verify compatibility.
          </p>

          {/* Interactive Stats Tracker */}
          <div className="mt-4 p-4 bg-white/40 border border-[#e3d5bc] rounded-2xl flex flex-col gap-2.5">
            <span className="text-[9.5px] font-mono font-bold text-zinc-650 uppercase tracking-widest">
              Setup Milestones:
            </span>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#c8a96e]"
                  animate={{ width: `${percentCompleted}%` }}
                  transition={{ type: "spring", damping: 15, stiffness: 80 }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-zinc-800 shrink-0 select-none">
                {completedCount}/4
              </span>
            </div>
            <AnimatePresence mode="wait">
              {percentCompleted === 100 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#10B981]/15 text-[#10B981] text-[10.5px] py-2 px-3 border border-[#10B981]/25 rounded-xl font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 size={13} />
                  <span>Configured Successfully</span>
                </motion.div>
              ) : (
                <span className="text-[10px] text-zinc-500 font-light tracking-wide italic">
                  Click on step cards to toggle completion.
                </span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT STEPS */}
        <div className="lg:col-span-8 bg-white/40 border border-[#e3d5bc] rounded-2xl overflow-hidden shadow-xs">
          <div className="border-b border-zinc-200/70 bg-[#ede5d8]/60 px-6 py-4 flex items-center justify-between select-none text-[10px] font-bold uppercase tracking-widest text-zinc-700 font-mono">
            <div className="flex items-center gap-3">
              <Sliders size={14} />
              <span>CORE INTEGRITY ACTION ITEMS</span>
            </div>
            <span className="text-[#c8a96e] bg-[#c8a96e]/10 border border-[#c8a96e]/20 px-2 py-0.5 rounded-md font-mono text-[9px]">
              {percentCompleted}% Done
            </span>
          </div>

          <div className="divide-y divide-zinc-200/50 font-sans">
            
            {/* Step 1 */}
            <div 
              onClick={() => toggleStep(0)}
              className={`p-6 md:p-8 flex gap-6 hover:bg-[#e8e2da]/25 transition-all cursor-pointer select-none ${completedSteps[0] ? 'bg-[#c8a96e]/4' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full border text-xs font-semibold flex items-center justify-center shrink-0 shadow-xs transition-all ${
                completedSteps[0] 
                  ? 'bg-[#c8a96e] border-[#c8a96e] text-white' 
                  : 'bg-[#e8e2da]/80 border-[#d1ccc7] text-zinc-700'
              }`}>
                {completedSteps[0] ? <Check size={14} strokeWidth={3} /> : "1"}
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold text-sm transition-colors ${completedSteps[0] ? 'text-zinc-500 line-through' : 'text-zinc-800'}`}>
                  Save script target payload
                </h4>
                <p className={`text-xs transition-colors ${completedSteps[0] ? 'text-zinc-400' : 'text-zinc-650'} font-light leading-relaxed`}>
                  Download the primary toolkit file and save it specifically as <code className="bg-[#e8e2da]/50 text-zinc-850 px-1.5 py-0.5 rounded font-mono border border-zinc-200 text-[10.5px]">AU Toolkit.jsx</code>. Avoid modifying extension endings.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => toggleStep(1)}
              className={`p-6 md:p-8 flex gap-6 hover:bg-[#e8e2da]/25 transition-all cursor-pointer select-none ${completedSteps[1] ? 'bg-[#c8a96e]/4' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full border text-xs font-semibold flex items-center justify-center shrink-0 shadow-xs transition-all ${
                completedSteps[1] 
                  ? 'bg-[#c8a96e] border-[#c8a96e] text-white' 
                  : 'bg-[#e8e2da]/80 border-[#d1ccc7] text-zinc-700'
              }`}>
                {completedSteps[1] ? <Check size={14} strokeWidth={3} /> : "2"}
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold text-sm transition-colors ${completedSteps[1] ? 'text-zinc-500 line-through' : 'text-zinc-800'}`}>
                  Copy files directly to System UI Directories
                </h4>
                <p className={`text-xs transition-colors ${completedSteps[1] ? 'text-zinc-400' : 'text-zinc-650'} font-light leading-relaxed mb-4`}>
                  Move the saved payload manually into the respective dockable folder dependent on your computer architecture:
                </p>
                
                <div className="space-y-3.5" onClick={(e) => e.stopPropagation()}>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] font-semibold tracking-wider text-zinc-650 bg-[#e8e2da]/45 border border-zinc-300 px-2 py-0.5 rounded-full uppercase">Windows Platform</span>
                    </div>
                    <pre className="p-3 bg-[#ede5d8] border border-[#e3d5bc] rounded-xl text-[10.5px] font-mono text-charcoal whitespace-pre-wrap word-break-break-all select-all leading-normal">
                      C:\Program Files\Adobe\Adobe After Effects [version]\Support Files\Scripts\ScriptUI Panels
                    </pre>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] font-semibold tracking-wider text-[#5c564f] bg-[#e8e2da]/45 border border-zinc-300 px-2 py-0.5 rounded-full uppercase">macOS Platform</span>
                    </div>
                    <pre className="p-3 bg-[#ede5d8] border border-[#e3d5bc] rounded-xl text-[10.5px] font-mono text-charcoal whitespace-pre-wrap word-break-break-all select-all leading-normal">
                      /Applications/Adobe After Effects [version]/Scripts/ScriptUI Panels
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => toggleStep(2)}
              className={`p-6 md:p-8 flex gap-6 hover:bg-[#e8e2da]/25 transition-all cursor-pointer select-none ${completedSteps[2] ? 'bg-[#c8a96e]/4' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full border text-xs font-semibold flex items-center justify-center shrink-0 shadow-xs transition-all ${
                completedSteps[2] 
                  ? 'bg-[#c8a96e] border-[#c8a96e] text-white' 
                  : 'bg-[#e8e2da]/80 border-[#d1ccc7] text-zinc-700'
              }`}>
                {completedSteps[2] ? <Check size={14} strokeWidth={3} /> : "3"}
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold text-sm transition-colors ${completedSteps[2] ? 'text-zinc-500 line-through' : 'text-zinc-800'}`}>
                  Re-launch After Effects
                </h4>
                <p className={`text-xs transition-colors ${completedSteps[2] ? 'text-zinc-400' : 'text-zinc-550'} font-light leading-relaxed`}>
                  Close and restart Adobe After Effects completely to force system folder scans to register new elements.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div 
              onClick={() => toggleStep(3)}
              className={`p-6 md:p-8 flex gap-6 hover:bg-[#e8e2da]/25 transition-all cursor-pointer select-none ${completedSteps[3] ? 'bg-[#c8a96e]/4' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full border text-xs font-semibold flex items-center justify-center shrink-0 shadow-xs transition-all ${
                completedSteps[3] 
                  ? 'bg-[#c8a96e] border-[#c8a96e] text-white' 
                  : 'bg-[#e8e2da]/80 border-[#d1ccc7] text-zinc-700'
              }`}>
                {completedSteps[3] ? <Check size={14} strokeWidth={3} /> : "4"}
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold text-sm transition-colors ${completedSteps[3] ? 'text-zinc-500 line-through' : 'text-zinc-800'}`}>
                  Activate dockable widget frame
                </h4>
                <p className={`text-xs transition-colors ${completedSteps[3] ? 'text-zinc-400' : 'text-zinc-550'} font-light leading-relaxed`}>
                  Navigate in the core taskbar to <strong className="text-zinc-800 font-semibold uppercase">Window &rarr; AU Toolkit</strong>. Shift and dock the panel layout wherever it fits your workspace design patterns.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-yellow-50/50 border border-[#e3d5bc] rounded-2xl p-6 mt-8 flex gap-4 text-xs font-sans text-zinc-650 leading-relaxed font-light">
        <HelpCircle size={18} className="text-yellow-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-yellow-850 block mb-1">🔐 Directory Sandboxing Warning:</span>
          If file dialog operations, subtitle parses, or script runner compilations trigger security issues, ensure you navigate in After Effects preferences to <strong className="font-medium text-yellow-900 uppercase">Edit → Preferences → Scripting & Expressions</strong> and enable <strong className="font-medium text-yellow-900 uppercase">Allow Scripts to Write Files and Access Network</strong>.
        </div>
      </div>
    </motion.section>
  );
};
