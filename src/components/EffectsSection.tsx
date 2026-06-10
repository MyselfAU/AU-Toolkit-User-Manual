import React from "react";
import { motion } from "motion/react";

interface EffectsSectionProps {
  gradientType: "ramp" | "radial";
  setGradientType: (t: "ramp" | "radial") => void;
  gradientColors: string[];
  ccLightSweepActive: boolean;
  setCcLightSweepActive: React.Dispatch<React.SetStateAction<boolean>>;
  rotationActive: boolean;
  setRotationActive: React.Dispatch<React.SetStateAction<boolean>>;
  isAnimatingColors: boolean;
  handleRandomizeColors: () => void;
  handleAnimateColors: () => void;
  handleGenerateCode: (toolId: string, category: string) => void;
}

export const EffectsSection: React.FC<EffectsSectionProps> = ({
  gradientType,
  setGradientType,
  gradientColors,
  ccLightSweepActive,
  setCcLightSweepActive,
  rotationActive,
  setRotationActive,
  isAnimatingColors,
  handleRandomizeColors,
  handleAnimateColors,
  handleGenerateCode
}) => {
  return (
    <motion.section 
      id="section-1" 
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
            🎨 EFFECTS &amp; GRADIENTS
          </span>
          <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-100 leading-none select-none">
            01
          </span>
          <h3 className="font-sans font-semibold text-3xl text-zinc-900 tracking-tight mt-2">
            Effects Tab &amp; Dynamic Gradients
          </h3>
          <p className="text-xs text-zinc-600 font-light leading-relaxed font-sans">
            Build smart responsive gradients and sweep coordinates that anchor using custom bounding expressions.
          </p>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* STAGGERED FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Ramp Gradient", desc: "Creates a smooth linear gradient on any layer" },
              { name: "4-Color Gradient", desc: "Applies a 4-point color gradient effect" },
              { name: "Randomize Colors", desc: "Randomizes existing gradient colors" },
              { name: "Animate Colors", desc: "Animates gradient colors over a set duration" },
              { name: "CC Light Sweep", desc: "Adds a cinematic light sweep effect" },
              { name: "Grab Effects", desc: "Copies all effects from a selected layer" },
              { name: "Apply Effects", desc: "Pastes grabbed effects onto one or more layers" },
              { name: "Attach Null to Trim End", desc: "Creates a null object linked to the end of a Trim Paths shape layer" }
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

          {/* VISUAL GRADIENT COMPANION PREVIEW SIMULATOR */}
          <div className="border-t border-zinc-200 my-4 pt-6 flex flex-col gap-4 font-sans text-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
              <span className="text-[10px] font-sans font-bold text-zinc-700 tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c8a96e] animate-pulse"></span>
                VISUAL RAMP &amp; SWEEP SANDBOX
              </span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase">Interactive simulation workspace</span>
            </div>

            <div className="w-full h-[155px] rounded-2xl relative overflow-hidden shadow-inner border border-[#d1ccc7]/80 flex items-center justify-center transition-all duration-1000"
              style={{
                background: gradientType === "ramp" 
                  ? `linear-gradient(180deg, ${gradientColors[0]}, ${gradientColors[1]})` 
                  : `radial-gradient(circle, ${gradientColors[0]} 0%, ${gradientColors[1]} 50%, ${gradientColors[2]} 100%)`
              }}
            >
              {/* CC Light Sweep overlay animation mock */}
              {ccLightSweepActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[30%] -skew-x-20 rotate-45 transform translate-x-[-150%] animate-light-sweep text-white/10" />
              )}

              {/* Vector guide line representing ramp anchor bounds */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none select-none" viewBox="0 0 400 155" preserveAspectRatio="none">
                <line x1="200" y1="20" x2="200" y2="135" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeDasharray="4 3" />
                <circle cx="200" cy="20" r="4.5" fill="white" className="shining-dot" />
                <circle cx="200" cy="135" r="4.5" fill="white" className="shining-dot" />
                
                {rotationActive && (
                  <circle cx="200" cy="77" r="40" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="3 2" className="animate-spin-slow origin-center" style={{ transformOrigin: '200px 77px' }} />
                )}
              </svg>

              <div className="relative z-10 bg-black/45 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full text-[9px] font-mono tracking-wider text-white select-none flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-pulse"></span>
                COMP: {gradientType === 'ramp' ? "LINEAR_RAMP" : "4_COLOR_RADIAL"} // {ccLightSweepActive ? "SWEEP_ON" : "SWEEP_STANDBY"}
              </div>
            </div>

            {/* Settings and generator buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Dynamic state inputs */}
              <div className="space-y-3 p-4 bg-[#ede5d8]/45 border border-[#e3d5bc] rounded-2xl text-xs text-zinc-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-550 uppercase tracking-widest text-[8px] font-mono">METHOD TARGET:</span>
                  <div className="flex bg-[#e8e2da] border border-zinc-200/80 rounded-lg p-0.5 select-none text-[9px] font-mono">
                    <button 
                      onClick={() => setGradientType("ramp")}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${gradientType === 'ramp' ? 'bg-white text-zinc-800 font-bold shadow-xs' : 'text-zinc-500 hover:text-zinc-800'}`}
                    >
                      Linear
                    </button>
                    <button 
                      onClick={() => setGradientType("radial")}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${gradientType === 'radial' ? 'bg-white text-zinc-800 font-bold shadow-xs' : 'text-zinc-500 hover:text-zinc-800'}`}
                    >
                      Radial
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-550 uppercase tracking-widest text-[8px] font-mono">CC LIGHT SWEEP:</span>
                  <button 
                    onClick={() => setCcLightSweepActive(prev => !prev)}
                    className={`font-mono text-[9px] font-bold uppercase tracking-wider py-1 px-3 border rounded-lg cursor-pointer transition-all ${ccLightSweepActive ? 'bg-[#c8a96e]/15 text-[#8a6f3a] border-[#c8a96e]/40' : 'bg-[#e8e2da] text-zinc-500 border-zinc-350/50'}`}
                  >
                    {ccLightSweepActive ? "Active" : "Disabled"}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-550 uppercase tracking-widest text-[8px] font-mono">ROTATE WITH TRIM:</span>
                  <button 
                    onClick={() => setRotationActive(prev => !prev)}
                    className={`font-mono text-[9px] font-bold uppercase tracking-wider py-1 px-3 border rounded-lg cursor-pointer transition-all ${rotationActive ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30' : 'bg-[#e8e2da] text-zinc-500 border-zinc-350/50'}`}
                  >
                    {rotationActive ? "Bound" : "Unbound"}
                  </button>
                </div>
              </div>

              {/* Gradient actions triggers */}
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-2">
                  <button 
                    onClick={handleRandomizeColors}
                    className="flex-1 bg-white hover:bg-zinc-50 text-zinc-800 border border-[#d1ccc7] py-3 px-3 rounded-full uppercase font-mono tracking-widest font-bold text-[9px] cursor-pointer shadow-xs"
                  >
                    🎲 Randomize Gradient
                  </button>
                  <button 
                    onClick={handleAnimateColors}
                    disabled={isAnimatingColors}
                    className="flex-1 bg-white hover:bg-zinc-50 text-zinc-800 border border-[#d1ccc7] py-3 px-3 rounded-full uppercase font-mono tracking-widest font-bold text-[9px] cursor-pointer shadow-xs disabled:opacity-40"
                  >
                    🧬 {isAnimatingColors ? "Animating..." : "Animate Ramp"}
                  </button>
                </div>
                <button 
                  onClick={() => handleGenerateCode("Ramp_Gradient", "effects")}
                  className="w-full bg-black text-white hover:bg-[#c8a96e] hover:border-[#c8a96e] border border-black py-3 rounded-full uppercase font-mono tracking-widest font-bold text-[10px] cursor-pointer transition-all duration-200 shadow-sm"
                >
                  ⚡ Generate Extendscript Gradient Rig
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </motion.section>
  );
};
