import React from "react";
import { motion } from "motion/react";

export const QuickRefSection: React.FC = () => {
  return (
    <motion.section 
      id="quickref" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="w-full bg-[#fbfaf3] border border-[#d1ccc7] rounded-3xl p-8 md:p-12 shadow-sm font-sans"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* DIAGNOSTICS */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div>
            <h4 className="font-semibold text-sm text-black uppercase tracking-wider mb-1 flex items-center gap-2">
              🛡️ System Integrity Diagnostic Checklist
            </h4>
            <p className="text-[11px] text-zinc-505 font-light leading-normal">
              Verify background system configuration matching After Effects guidelines.
            </p>
          </div>

          <div className="bg-white/50 border border-zinc-200 rounded-2xl p-6 space-y-4 text-xs font-light text-zinc-650 shadow-xs">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
              <span className="font-semibold text-zinc-500">AE Compatibility:</span>
              <span className="font-mono text-black font-bold">AE 2022 - 2026+</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
              <span className="font-semibold text-zinc-500">ScriptUI Spec:</span>
              <span className="font-mono text-black font-bold">Dockable v2.1</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
              <span className="font-semibold text-zinc-500">Secure Sandboxing:</span>
              <span className="font-mono text-[#10B981] font-bold font-bold">Enabled (SSL)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-500">JSON DB Storage:</span>
              <span className="font-mono text-black font-bold font-bold">Offline-First</span>
            </div>
          </div>
        </div>

        {/* HANDBOOK */}
        <div className="lg:col-span-6 flex flex-col gap-4 justify-between h-full min-h-[160px]">
          <div className="bg-zinc-100/60 rounded-2xl p-6 border border-zinc-200">
            <span className="block font-semibold text-xs text-[#0f172a] uppercase mb-2 leading-none">📖 Quick Reference Overview:</span>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              This manual documents all active tools in the UI Extension panel. Simply follow the timeline selected checks on each tab for successful execution. Double-click on any script in the Launcher section to compile instantly.
            </p>
          </div>
          
          <div className="p-3 bg-white border border-zinc-150 rounded-xl flex items-center justify-between text-[11px] font-mono text-zinc-450 uppercase tracking-widest leading-none select-none">
            <span>AU_MANUAL // STOCKHOLM</span>
            <span>VER_4.95</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
