import React from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";

interface ScriptsSectionProps {
  runnerButtons: { name: string; type: string; code: string; folder: string }[];
  runnerLogs: string[];
  runCodeSim: (name: string, type: string, code: string) => void;
  setShowAddModal: (v: boolean) => void;
  setRunnerLogs: React.Dispatch<React.SetStateAction<string[]>>;
  handleGenerateCode: (toolId: string, category: string) => void;
}

export const ScriptsSection: React.FC<ScriptsSectionProps> = ({
  runnerButtons,
  runnerLogs,
  runCodeSim,
  setShowAddModal,
  setRunnerLogs,
  handleGenerateCode
}) => {
  return (
    <motion.section 
      id="section-4" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full rounded-3xl bg-[#fbfaf3] text-[#1A1A1A] overflow-hidden border border-[#d1ccc7] p-8 md:p-12 min-h-[600px] flex flex-col gap-8 shadow-md"
    >
      {/* Corner Soft Glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20 bg-[#c8a96e]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start">
        
        {/* LEFT */}
        <div className="lg:col-span-4 flex flex-col gap-4 font-sans">
          <span className="text-[10px] font-mono tracking-widest font-bold text-[#c8a96e] bg-[#c8a96e]/10 border border-[#c8a96e]/30 rounded-full px-3 py-1 w-fit select-none uppercase">
             CODE RUNNER Byamp; Jake In Motion
          </span>
          <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-100 leading-none select-none">
            04
          </span>
          <h3 className="font-sans font-semibold text-3xl text-zinc-900 tracking-tight mt-2">
            Scripts &amp; Action Layouts
          </h3>
          <p className="text-xs text-zinc-650 font-light leading-relaxed font-sans">
            Transform custom ExtendScript snippets, presets, and expressions into quick-run click buttons with dynamic shortcuts.
          </p>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* STAGGERED FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Add Button", desc: "Right-click folder to add Script / Expression / Preset button" },
              { name: "Run Button", desc: "Click any button to run it instantly" },
              { name: "Alt + Click", desc: "Opens button for editing without entering Edit Mode" },
              { name: "Edit Mode", desc: "Rearrange, rename, reorder, duplicate, move, delete buttons" },
              { name: "Import/Export", desc: "Share your entire script collection as .json file" }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-white/60 border border-[#d1ccc7]/65 hover:bg-white hover:border-[#c8a96e]/60 transition-all duration-300 shadow-sm group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
                  <h4 className="font-sans font-bold text-xs text-zinc-800 uppercase tracking-wider group-hover:text-[#c8a95e] transition-colors">
                    {card.name}
                  </h4>
                </div>
                <p className="text-xs text-zinc-550 font-light leading-relaxed font-sans">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* COMPANION WORKSTATION PREVIEW */}
          <div className="border-t border-zinc-200 my-4 pt-6 flex flex-col gap-5 font-sans text-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
              <span className="text-[10px] font-sans font-bold text-zinc-700 tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c8a96e] animate-pulse"></span>
                CODE INTEGRATION SHORTCUT WORKSTATION
              </span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase">Interactive simulation workspace</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              {/* Shortcuts grid box */}
              <div className="flex flex-col gap-3.5 bg-white/70 border border-[#d1ccc7]/80 p-4.5 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between text-[8px] font-mono tracking-widest text-zinc-400 block border-b border-zinc-200 pb-2 mb-1 uppercase">
                  <span>COMPOSITION: ACTIVE_SHORTCUTS</span>
                  <span>GRID RENDERER V1.1</span>
                </div>

                {/* Visual buttons shortcuts */}
                <div className="grid grid-cols-2 gap-2 text-left font-sans select-none">
                  {runnerButtons.map((btn, i) => (
                    <button
                      key={i}
                      onClick={() => runCodeSim(btn.name, btn.type, btn.code)}
                      className="p-3 bg-[#ede5d8]/30 hover:bg-[#ede5d8]/65 hover:border-[#c8a96e]/60 border border-[#e3d5bc] rounded-xl text-left flex flex-col gap-1 transition-all group cursor-pointer"
                    >
                      <span className="text-[7.5px] font-mono uppercase bg-white group-hover:bg-zinc-150 text-zinc-650 border border-[#d1ccc7] px-1.5 py-0.5 rounded-full inline-block tracking-wider w-fit">
                        {btn.type === 'Script' ? "📜 Jsx" : "⚡ Expr"}
                      </span>
                      <span className="text-[10px] font-semibold text-zinc-800 truncate">{btn.name}</span>
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="p-2.5 bg-transparent hover:bg-[#ede5d8]/20 border border-dashed border-[#e3d5bc] rounded-xl text-zinc-500 hover:text-black flex flex-col items-center justify-center gap-1 cursor-pointer transition-all h-full min-h-[58px]"
                  >
                    <Plus size={14} />
                    <span className="text-[8px] font-sans font-bold tracking-wider uppercase">Add Action</span>
                  </button>
                </div>
              </div>

              {/* console output display pane */}
              <div className="flex flex-col gap-3.5 bg-white/70 border border-[#d1ccc7]/80 rounded-2xl p-4.5 shadow-xs">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2 select-none text-[8.5px] uppercase tracking-widest text-zinc-400 font-bold leading-none font-mono">
                  <span>SYSTEM DEPLOYMENT CONSOLE</span>
                  <span className="text-emerald-700 font-semibold animate-pulse">● DETECTOR LIVE</span>
                </div>
                
                <div className="space-y-1.5 max-h-[110px] overflow-y-auto leading-relaxed font-mono text-[9px] text-zinc-700">
                  {runnerLogs.map((log, i) => (
                    <div key={i} className={`border-l pl-2 ${log.includes("[ERR]") ? "text-rose-700 border-rose-500/20" : log.includes("[SUCCESS]") ? "text-emerald-750 border-emerald-500/20" : "text-sky-750 border-sky-500/10"}`}>
                      {log}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setRunnerLogs(["[SYS] Database history scrubbed cleanly.", "[SYS] Standing by UI panels triggers."])}
                  className="text-[8.5px] font-bold text-zinc-500 hover:text-black uppercase tracking-wider text-left underline cursor-pointer leading-none mt-1"
                >
                  Clear Console Output
                </button>
              </div>

            </div>

            <button 
              onClick={() => handleGenerateCode("Action_Shortcut_Manager", "scripts")}
              className="w-full bg-black hover:bg-[#c8a96e] hover:border-[#c8a96e] border border-black text-white py-3 rounded-full uppercase font-mono tracking-widest font-bold text-[10.5px] cursor-pointer transition-all duration-200 shadow-sm mt-2"
            >
               GENERATE EDITABLE EXTENDSCRIPT CODE RUNNER PANEL
            </button>
          </div>

        </div>

      </div>
    </motion.section>
  );
};
