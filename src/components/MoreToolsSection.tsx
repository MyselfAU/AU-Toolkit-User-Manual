import React from "react";
import { motion } from "motion/react";
import { Folder, Undo } from "lucide-react";

interface MoreToolsSectionProps {
  projectFiles: { name: string; type: string; size: string; location: string }[];
  isOrganized: boolean;
  handleOrganizeProject: () => void;
  handleUndoOrganize: () => void;
  srtInput: string;
  setSrtInput: (v: string) => void;
  parsedSubtitles: { id: number; start: string; end: string; text: string }[];
  handleGenerateCode: (toolId: string, category: string) => void;
}

export const MoreToolsSection: React.FC<MoreToolsSectionProps> = ({
  projectFiles,
  isOrganized,
  handleOrganizeProject,
  handleUndoOrganize,
  srtInput,
  setSrtInput,
  parsedSubtitles,
  handleGenerateCode
}) => {
  return (
    <motion.section 
      id="section-3" 
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
        <div className="lg:col-span-4 flex flex-col gap-4">
          <span className="text-[10px] font-mono tracking-widest font-bold text-[#c8a96e] bg-[#c8a96e]/10 border border-[#c8a96e]/30 rounded-full px-3 py-1 w-fit select-none uppercase">
             MORE TOOLS &amp; PIPELINES
          </span>
          <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-100 leading-none select-none">
            03
          </span>
          <h3 className="font-sans font-semibold text-3xl text-zinc-900 tracking-tight mt-2">
            More Tools &amp; File Pipelines
          </h3>
          <p className="text-xs text-zinc-650 font-light leading-relaxed font-sans">
            Stagger layers, organize complex projects instantly, and auto-generate styled caption systems with Subtitle SRT integrations.
          </p>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* STAGGERED FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in font-sans">
            {[
              { name: "Stagger Layers", desc: "Offsets 2+ layers in time; set offset in frames, choose direction" },
              { name: "Organize Project", desc: "Auto-sorts all project items into folders by file type (Video, Images, Audio, Vectors, Pre-comps)" },
              { name: "Import SRT", desc: "Imports .SRT subtitle file, creates timed text layers automatically" },
              { name: "SRT Editor", desc: "In-panel subtitle editor for writing or editing captions" }
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

          {/* MORE TOOLS SIMULATOR SANDBOX */}
          <div className="border-t border-zinc-200 my-4 pt-6 flex flex-col gap-6 font-sans text-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
              <span className="text-[10px] font-sans font-bold text-zinc-700 tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c8a96e] animate-pulse"></span>
                FILES PIPELINE &amp; SUBTITLES PARSERS
              </span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase">Interactive simulation workspace</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              {/* Organize Assets simulator */}
              <div className="flex flex-col gap-3.5 bg-white/70 border border-[#d1ccc7]/80 p-4.5 rounded-2xl shadow-xs">
                <div>
                  <h4 className="font-semibold text-xs text-zinc-900 uppercase tracking-wider mb-1">
                     Project Assets Folder Sandbox
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-light leading-normal">
                    Trigger direct organization simulation and undo routines.
                  </p>
                </div>

                {/* Mock Folder Tree area */}
                <div className="bg-[#ede5d8]/40 border border-[#e3d5bc] rounded-xl p-3.5 font-mono text-[9.5px] flex flex-col gap-1.5 min-h-[148px] overflow-y-auto">
                  {projectFiles.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 border-b border-[#e3d5bc]/30 pb-1 hover:bg-[#ede5d8]/50 transition-colors">
                      <Folder size={11} className={isOrganized ? "text-[#c8a96e] animate-pulse-slow font-bold" : "text-zinc-400"} />
                      <span className="text-zinc-700 font-light truncate flex-1">{f.name}</span>
                      <span className="text-[7.5px] tracking-wide text-zinc-650 bg-white px-1.5 py-0.5 rounded border border-zinc-200 uppercase">
                        {f.location}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={handleOrganizeProject}
                    disabled={isOrganized}
                    className="flex-1 bg-white hover:bg-zinc-50 disabled:opacity-40 text-zinc-800 border border-[#d1ccc7] text-[9.5px] py-2.5 rounded-full uppercase font-mono tracking-widest font-bold cursor-pointer transition-all shadow-xs"
                  >
                    Organize Project
                  </button>
                  {isOrganized && (
                    <button 
                      onClick={handleUndoOrganize}
                      className="p-2.5 px-3 bg-[#fbfaf3] hover:bg-[#ede5d8]/40 border border-[#d1ccc7] rounded-full text-zinc-600 cursor-pointer flex items-center justify-center transition-all"
                      title="Undo organization"
                    >
                      <Undo size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* SRT subtitle editor list */}
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-semibold text-xs text-zinc-900 uppercase tracking-wider mb-1">
                     Subtitle Real-time Parser Simulator
                  </h4>
                  <textarea
                    value={srtInput}
                    onChange={(e) => setSrtInput(e.target.value)}
                    className="w-full text-[10.5px] font-mono leading-relaxed bg-[#ede5d8]/40 border border-[#e3d5bc] text-[#1A1A1A] rounded-xl p-3 focus:outline-none focus:border-zinc-400 h-[100px] resize-none overflow-y-auto font-light"
                    placeholder="Paste standard srt timecode blocks here..."
                  />
                </div>

                {/* SRT parsed lists timeline boxes */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-zinc-500 block border-b border-zinc-200 pb-1.5 leading-none">
                     COMPILED SUBTITLE LAYERS ({parsedSubtitles.length} lines)
                  </span>
                  <div className="max-h-[120px] overflow-y-auto space-y-1.5 pr-1 font-sans">
                    {parsedSubtitles.map((sub) => (
                      <div key={sub.id} className="text-[10px] bg-white/70 border border-[#d1ccc7]/80 rounded-lg p-2.5 flex flex-col gap-0.5 shadow-xs">
                        <div className="flex items-center justify-between text-[8px] text-zinc-400 font-mono font-medium">
                          <span>LAYER_{sub.id} // ACTIVE</span>
                          <span>{sub.start.split(",")[0]} {"→"} {sub.end.split(",")[0]}</span>
                        </div>
                        <span className="text-zinc-800 font-bold uppercase">{sub.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            <button 
              onClick={() => handleGenerateCode("Subtitle_Import", "more")}
              className="w-full bg-black hover:bg-[#c8a96e] hover:border-[#c8a96e] border border-black text-white py-3 rounded-full uppercase font-mono tracking-widest font-bold text-[10.5px] cursor-pointer transition-all duration-200 shadow-sm mt-2"
            >
              ⚡ GENERATE FULL WORKSPACE PIPELINE SCRIPT
            </button>
          </div>

        </div>

      </div>
    </motion.section>
  );
};
