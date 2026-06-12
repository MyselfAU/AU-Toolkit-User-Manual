import React from "react";
import { motion } from "motion/react";
import { Search, Terminal } from "lucide-react";

interface LauncherSectionProps {
  scanFilter: string;
  setScanFilter: (v: string) => void;
  launchFiles: { name: string; path: string; size: string; date: string }[];
  setLaunchFiles: React.Dispatch<React.SetStateAction<{ name: string; path: string; size: string; date: string }[]>>;
  setRunnerLogs: React.Dispatch<React.SetStateAction<string[]>>;
  handleGenerateCode: (toolId: string, category: string) => void;
}

export const LauncherSection: React.FC<LauncherSectionProps> = ({
  scanFilter,
  setScanFilter,
  launchFiles,
  setLaunchFiles,
  setRunnerLogs,
  handleGenerateCode
}) => {
  return (
    <motion.section 
      id="section-5" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full rounded-3xl bg-[#fbfaf3] text-[#1A1A1A] overflow-hidden border border-[#d1ccc7] p-8 md:p-12 min-h-[600px] flex flex-col gap-8 shadow-md font-sans"
    >
      {/* Corner Soft Glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20 bg-[#c8a96e]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start">
        
        {/* LEFT */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <span className="text-[10px] font-mono tracking-widest font-bold text-[#c8a96e] bg-[#c8a96e]/10 border border-[#c8a96e]/30 rounded-full px-3 py-1 w-fit select-none uppercase">
             LOCAL DIRECTORY SCANNERS
          </span>
          <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-100 leading-none select-none">
            05
          </span>
          <h3 className="font-sans font-semibold text-3xl text-zinc-900 tracking-tight mt-2">
            Launcher &amp; System Scanners
          </h3>
          <p className="text-xs text-zinc-650 font-light leading-relaxed font-sans">
            Auto-scan and filter local script directories to execute dockable JSX files efficiently in After Effects.
          </p>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* STAGGERED FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Auto-Scan", desc: "Automatically finds all .jsx scripts in AE Scripts folders" },
              { name: "Search Bar", desc: "Type to instantly filter scripts by name" },
              { name: "Run Script", desc: "Double-click any script to run it in After Effects" },
              { name: "Refresh", desc: "Re-scans folders after installing new scripts" },
              { name: "Add Folder", desc: "Add custom or cloud folders to scan" }
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

          {/* LAUNCHER INTEGRATIVE SCANNER SIMULATOR */}
          <div className="border-t border-zinc-200 my-4 pt-6 flex flex-col gap-4 font-sans text-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
              <span className="text-[10px] font-sans font-bold text-zinc-700 tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c8a96e] animate-pulse"></span>
                JSX FOLDERS INTEGRATION SCANNERS
              </span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase">Interactive simulation workspace</span>
            </div>

            <div className="bg-white/70 border border-[#d1ccc7]/80 rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-4.5 bg-[#ede5d8]/30 border-b border-[#e3d5bc] flex items-center gap-3">
                <Search size={14} className="text-zinc-500" />
                <input 
                  type="text"
                  placeholder="Search workspace directories..."
                  value={scanFilter}
                  onChange={(e) => setScanFilter(e.target.value)}
                  className="flex-1 bg-transparent border-none text-[11px] font-mono text-zinc-800 placeholder-zinc-400 outline-none focus:ring-0 leading-none"
                />
              </div>

              <div className="p-2 border-b border-[#e3d5bc]/60 bg-[#ede5d8]/20 font-mono text-[8px] uppercase tracking-wider text-zinc-500 select-none flex items-center gap-2 animate-fade-in">
                <span className="font-bold">🖥️ Folders found:</span>
                <span className="text-[#8a6f3a] font-bold bg-[#c8a96e]/10 px-1.5 py-0.5 rounded border border-[#c8a96e]/30">/Support Files/Scripts</span>
              </div>

              <div className="p-3 max-h-[188px] overflow-y-auto divide-y divide-[#e3d5bc]/30">
                {launchFiles.filter(item => item.name.toLowerCase().includes(scanFilter.toLowerCase())).map((file, i) => (
                  <div 
                    key={i}
                    onDoubleClick={() => {
                      setRunnerLogs(prev => [
                        ...prev,
                        `[SUCCESS] Compiling: ${file.name} directly inside current session. Run completed.`
                      ]);
                      alert(` Script Execution Triggered!\n\nRunning: ${file.name}\nPath: ${file.path}/${file.name}\n\nExtendScript compiler validation: SUCCESS`);
                    }}
                    className="py-2.5 px-3 flex items-center justify-between hover:bg-[#ede5d8]/35 transition-all rounded-lg scroll-trigger group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Terminal size={12} className="text-[#c8a96e] group-hover:scale-105 transition-all" />
                      <div className="truncate flex flex-col text-[10px]">
                        <span className="text-zinc-800 font-bold font-mono text-left">{file.name}</span>
                        <span className="text-[8px] text-zinc-500 normal-case tracking-normal">{file.path}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 font-mono text-[8.5px] text-zinc-500 select-none">
                      <span>{file.size}</span>
                      <span>{file.date}</span>
                    </div>
                  </div>
                ))}

                {launchFiles.filter(item => item.name.toLowerCase().includes(scanFilter.toLowerCase())).length === 0 && (
                  <div className="p-6 text-center text-xs text-zinc-500 font-light font-sans">
                    No JSX scripts match search filter parameter.
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-[#e3d5bc] bg-[#ede5d8]/25 flex justify-between items-center text-[8px] font-mono text-zinc-500 uppercase select-none tracking-wider">
                <span>Scanner Root: Default Dir</span>
                <button 
                  onClick={() => {
                    setLaunchFiles(prev => [
                      ...prev,
                      { name: "My_Custom_Runner_Tool.jsx", path: "/Scripts/Shared Cloud", size: "142kb", date: "2026-06-07" }
                    ]);
                    alert("➕ Custom cloud directory path mounted! Mounted: '/Scripts/Shared Cloud'. Re-scan completed.");
                  }}
                  className="text-zinc-700 hover:text-black font-semibold border border-[#d1ccc7] rounded-full px-2.5 py-1 bg-[#fbfaf3] hover:bg-[#ede5d8] shadow-xs cursor-pointer transition-colors text-[8.5px]"
                >
                  + Add Cloud Dir
                </button>
              </div>
            </div>

            <div className="text-[9.5px] text-zinc-500 leading-normal font-light italic font-sans">
              <strong>Trigger Hint:</strong> Double click on file nodes above to verify compilations. The companion scanner simulates After Effects launching.
            </div>
          </div>

        </div>

      </div>
    </motion.section>
  );
};
