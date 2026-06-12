import React from "react";
import { motion } from "motion/react";
import { Copy } from "lucide-react";

interface ExpressionsSectionProps {
  activeExpSim: "bounce" | "flicker" | "wiggle";
  setActiveExpSim: (s: "bounce" | "flicker" | "wiggle") => void;
  isBouncing: boolean;
  wiggleOffset: { x: number; y: number };
  flickerFreq: number;
  setFlickerFreq: (f: number) => void;
  flickerMin: number;
  setFlickerMin: (v: number) => void;
  flickerMax: number;
  setFlickerMax: (v: number) => void;
  bounceFreq: number;
  setBounceFreq: (f: number) => void;
  bounceDecay: number;
  setBounceDecay: (d: number) => void;
  triggerBounceDemo: () => void;
  wiggleFreq: number;
  setWiggleFreq: (f: number) => void;
  wiggleAmp: number;
  setWiggleAmp: (v: number) => void;
  copiedCode: string | null;
  copyToClipboard: (code: string, label: string) => void;
  handleGenerateCode: (toolId: string, category: string) => void;
}

export const ExpressionsSection: React.FC<ExpressionsSectionProps> = ({
  activeExpSim,
  setActiveExpSim,
  isBouncing,
  wiggleOffset,
  flickerFreq,
  setFlickerFreq,
  flickerMin,
  setFlickerMin,
  flickerMax, // We can assume flickerMax value is 100
  flickerMaxVal = 100,
  bounceFreq,
  setBounceFreq,
  bounceDecay,
  setBounceDecay,
  triggerBounceDemo,
  wiggleFreq,
  setWiggleFreq,
  wiggleAmp,
  setWiggleAmp,
  copiedCode,
  copyToClipboard,
  handleGenerateCode
}) => {
  return (
    <motion.section 
      id="section-2" 
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
             PHYSICS EXPRESSIONS
          </span>
          <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-100 leading-none select-none">
            02
          </span>
          <h3 className="font-sans font-semibold text-3xl text-zinc-900 tracking-tight mt-2">
            Expressions &amp; Motion Physics
          </h3>
          <p className="text-xs text-zinc-650 font-light leading-relaxed font-sans">
            Apply advanced physics behaviors directly to After Effects property keyframes with zero math scripting required.
          </p>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-8 flex flex-col gap-6 font-sans">
          
          {/* STAGGERED FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Overshoot / Bounce", desc: "Applies bounce expression to any keyframed property with frequency & decay controls" },
              { name: "Flicker", desc: "Adds random flicker to Opacity; set Frequency, Min Opacity, Max Opacity" },
              { name: "Wiggle", desc: "Applies wiggle() to any property with Frequency and Amplitude controls" },
              { name: "Loop Cycle", desc: "Applies loopOut(\"cycle\") — animation repeats forever" },
              { name: "Loop Ping-Pong", desc: "Applies loopOut(\"pingpong\") — animation plays forward then backward" }
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

          {/* PHYSICS EXPRESSION COMPANION PREVIEW SIMULATOR */}
          <div className="border-t border-zinc-200 my-4 pt-6 flex flex-col gap-4 font-sans text-zinc-805">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
              <span className="text-[10px] font-sans font-bold text-zinc-705 tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c8a96e] animate-pulse"></span>
                MOTION PHYSICS DYNAMIC SIMULATION
              </span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase">Interactive simulation workspace</span>
            </div>

            {/* Simulated Frame */}
            <div className="w-full h-[180px] bg-white/70 border border-[#d1ccc7]/80 rounded-3xl relative overflow-hidden flex flex-col justify-between p-4.5 group select-none shadow-sm">
              
              {/* Top-bar stats */}
              <div className="flex items-center justify-between text-[8px] font-mono text-zinc-400 tracking-wider uppercase border-b border-zinc-200/50 pb-2">
                <span>PROJECT_RENDER // AE COMP_ACTIVE</span>
                <span>FPS: 60.0 // LIVE RENDER DIRECTOR</span>
              </div>

              {/* Simulation Body rendering canvas */}
              <div className="flex-1 flex items-center justify-center relative">
                
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-grid-zinc-400/5 pointer-events-none opacity-40" />

                {/* Moving circle ball / flickering layer preview */}
                <motion.div 
                  animate={
                    activeExpSim === "bounce" 
                      ? { 
                          scale: isBouncing ? [1, 1.48, 0.82, 1.15, 0.94, 1.02, 1] : 1,
                          y: isBouncing ? [0, -15, 8, -4, 2, -1, 0] : 0,
                        }
                      : activeExpSim === "flicker"
                      ? {
                          opacity: [1, 0.35, 0.95, 0.15, 0.85, 0.45, 1],
                          scale: [1, 0.98, 1.01, 0.97, 1.02, 0.96, 1],
                        }
                      : { // wiggle
                          x: wiggleOffset.x,
                          y: wiggleOffset.y,
                        }
                  }
                  transition={
                    activeExpSim === "bounce" 
                      ? { duration: 1.25, ease: "easeOut" }
                      : activeExpSim === "flicker"
                      ? { repeat: Infinity, duration: 1.6 / flickerFreq, ease: "easeInOut" }
                      : { duration: 0.1, ease: "linear" }
                  }
                  className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-1 border shadow-md relative transition-all duration-150 ${
                    activeExpSim === 'bounce' 
                      ? 'bg-gradient-to-br from-white to-[#ede5d8] border-[#d1ccc7] text-black shadow-inner' 
                      : activeExpSim === 'flicker'
                      ? 'bg-[#c8a96e]/15 border-[#c8a96e]/40 text-[#c8a96e]'
                      : 'bg-black border-black text-white'
                  }`}
                >
                  <span className="text-[14px] leading-none mb-0.5">
                    {activeExpSim === "bounce" ? "🏀" : activeExpSim === "flicker" ? "💡" : "🌀"}
                  </span>
                  <span className="text-[7.5px] font-mono uppercase font-black tracking-wider leading-none">
                    {activeExpSim === "bounce" ? "BOUNCE" : activeExpSim === "flicker" ? "FLICKER" : "WIGGLE"}
                  </span>
                  
                  {/* Dynamic data value tag nested */}
                  <div className="absolute -bottom-6 bg-black/60 backdrop-blur-xs text-[6.5px] font-mono font-medium px-1.5 py-0.5 border border-zinc-800 rounded text-zinc-300 uppercase tracking-widest whitespace-nowrap">
                    {activeExpSim === 'bounce' ? `COEF_${bounceFreq}Hz` : activeExpSim === 'flicker' ? `FREQ_${flickerFreq}Hz` : `WIG_X: ${wiggleOffset.x.toFixed(1)}`}
                  </div>
                </motion.div>

              </div>

              {/* Simulation Picker buttons */}
              <div className="border-t border-zinc-200/50 pt-2 flex justify-between items-center bg-transparent px-2 rounded-xl">
                <span className="text-[7.5px] font-mono text-zinc-400 font-semibold tracking-wider">ACTIVE PHYSICS SIMULATOR:</span>
                <div className="flex gap-1.5 font-mono text-[8.5px] uppercase">
                  {(["bounce", "flicker", "wiggle"] as const).map((simType) => (
                    <button
                      key={simType}
                      onClick={() => setActiveExpSim(simType)}
                      className={`px-2.5 py-1 rounded border cursor-pointer font-bold uppercase transition-all ${
                        activeExpSim === simType 
                          ? "bg-[#c8a96e]/15 text-[#8a6f3a] border-[#c8a96e]/40" 
                          : "bg-transparent text-zinc-500 border-transparent hover:text-black"
                      }`}
                    >
                      {simType}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Physics controllers container */}
            <div id="sub-panel-controls-expressions" className="p-4 bg-[#ede5d8]/45 border border-[#e3d5bc] rounded-2xl space-y-3.5 text-xs text-black">
              
              {/* Selector 2: Bounce active controls */}
              {activeExpSim === "bounce" && (
                <div className="space-y-3 border-transparent">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-zinc-650 flex flex-col">
                      <span>Bounce Frequency:</span>
                      <span className="text-[9.5px] font-mono text-zinc-450 normal-case leading-tight">Controls speed of elastic decay cycles</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" min="1.0" max="6.0" step="0.2"
                        value={bounceFreq} onChange={(e) => setBounceFreq(parseFloat(e.target.value))}
                        className="w-24 accent-zinc-800"
                      />
                      <span className="font-mono text-charcoal font-bold w-10 text-right">{bounceFreq.toFixed(1)}Hz</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-zinc-650 flex flex-col">
                      <span>Bounce Decay Factor:</span>
                      <span className="text-[9.5px] font-mono text-zinc-450 normal-case leading-tight">Lower decay produces longer persistent wiggle bounces</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" min="2.0" max="10.0" step="0.5"
                        value={bounceDecay} onChange={(e) => setBounceDecay(parseFloat(e.target.value))}
                        className="w-24 accent-zinc-800"
                      />
                      <span className="font-mono text-charcoal font-bold w-10 text-right">{bounceDecay.toFixed(1)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={triggerBounceDemo}
                    className="w-full bg-[#fbfaf3] hover:bg-[#ede5d8] hover:text-black font-semibold rounded-xl text-[10.5px] py-2.5 border border-[#d1ccc7] font-mono tracking-widest text-[#5c564f] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    🏀 TRIGGER BALL DROP PREVIEW
                  </button>
                </div>
              )}

              {/* Selector 3: Flicker active controls */}
              {activeExpSim === "flicker" && (
                <div className="space-y-3 border-transparent">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-zinc-650 flex flex-col">
                      <span>Flicker Frequency Level:</span>
                      <span className="text-[9.5px] font-mono text-zinc-455 normal-case leading-tight">Speed intensity of transparency drops</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" min="2.0" max="15.0" step="1.0"
                        value={flickerFreq} onChange={(e) => setFlickerFreq(parseInt(e.target.value))}
                        className="w-24 accent-zinc-800"
                      />
                      <span className="font-mono text-charcoal font-bold w-10 text-right">{flickerFreq}Hz</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-zinc-650 flex flex-col">
                      <span>Minimum Opacity Cap:</span>
                      <span className="text-[9.5px] font-mono text-zinc-455 normal-case leading-tight">Ensures layer doesn't black out completely</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" min="0" max="60" step="5"
                        value={flickerMin} onChange={(e) => setFlickerMin(parseInt(e.target.value))}
                        className="w-24 accent-zinc-800"
                      />
                      <span className="font-mono text-charcoal font-bold w-10 text-right">{flickerMin}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Selector 4: Wiggle active controls */}
              {activeExpSim === "wiggle" && (
                <div className="space-y-3 border-transparent">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-zinc-650 flex flex-col">
                      <span>Wiggle Frequency Cycle:</span>
                      <span className="text-[9.5px] font-mono text-zinc-450 normal-case leading-tight">Cycles per second execution rate</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" min="1.0" max="10.0" step="0.5"
                        value={wiggleFreq} onChange={(e) => setWiggleFreq(parseFloat(e.target.value))}
                        className="w-24 accent-zinc-800"
                      />
                      <span className="font-mono text-charcoal font-bold w-10 text-right">{wiggleFreq.toFixed(1)}c/s</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-zinc-650 flex flex-col">
                      <span>Wiggle Amplitude Range:</span>
                      <span className="text-[9.5px] font-mono text-zinc-450 normal-case leading-tight">Pixel radius displacement boundary</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" min="10" max="100" step="5"
                        value={wiggleAmp} onChange={(e) => setWiggleAmp(parseInt(e.target.value))}
                        className="w-24 accent-zinc-800"
                      />
                      <span className="font-mono text-charcoal font-bold w-10 text-right">{wiggleAmp}px</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Code block output display for expressions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start font-sans">
              <div>
                <span className="text-[9.5px] font-mono uppercase tracking-widest font-bold text-zinc-500 block mb-1.5 leading-none">
                  🎬 COMPILED EXTENDSCRIPT PAYLOAD:
                </span>
                <pre className="p-4 bg-[#ede5d8]/40 border border-[#e3d5bc] rounded-2xl text-[10.5px] font-mono text-zinc-800 min-h-[148px] max-h-[180px] overflow-y-auto leading-normal whitespace-pre">
                  {activeExpSim === "bounce" 
                    ? `// Inertial bounce/overshoot rig\nfreq = ${bounceFreq};\ndecay = ${bounceDecay};\nn = 0;\nif (numKeys > 0){\nn = nearestKey(time).index;\nif (key(n).time > time){ n--; }\n}`
                    : activeExpSim === "flicker"
                    ? `// flicker expression script\nrandom( ${flickerMin}, ${flickerMaxVal} ) * \n( Math.sin( time * ${flickerFreq} * Math.PI ) + 1 ) / 2;`
                    : `// standard wiggle physics engine\nwiggle( ${wiggleFreq}, ${wiggleAmp} );`
                  }
                </pre>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => copyToClipboard(
                    activeExpSim === "bounce" 
                      ? `// Inertial bounce/overshoot rig\nfreq = ${bounceFreq};\ndecay = ${bounceDecay};\nn = 0;\nif (numKeys > 0){\nn = nearestKey(time).index;\nif (key(n).time > time){ n--; }\n}`
                      : activeExpSim === "flicker"
                      ? `// flicker expression script\nrandom( ${flickerMin}, ${flickerMaxVal} ) * \n( Math.sin( time * ${flickerFreq} * Math.PI ) + 1 ) / 2;`
                      : `// standard wiggle physics engine\nwiggle( ${wiggleFreq}, ${wiggleAmp} );`,
                    "Physics Expression Rigged"
                  )}
                  className="w-full bg-white hover:bg-zinc-100 text-zinc-800 font-semibold py-3 rounded-full text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#d1ccc7] shadow-xs"
                >
                  <Copy size={13} />
                  <span>Copy Physics Rig Expression</span>
                </button>

                <button 
                  onClick={() => handleGenerateCode(activeExpSim === "bounce" ? "Bounce_Inertia" : activeExpSim === "flicker" ? "Flicker_Opacity" : "Wiggle_Position", "expressions")}
                  className="w-full bg-black hover:bg-[#c8a96e] hover:border-[#c8a96e] border border-black text-white font-bold uppercase py-3 rounded-full text-[10.5px] font-mono tracking-widest cursor-pointer transition-all duration-200 shadow-sm"
                >
                  ⚡ LOCK EXPRESSION ASSET
                </button>

                {copiedCode === "Physics Expression Rigged" && (
                  <span className="text-[10px] text-emerald-700 font-mono text-center font-bold">
                     EXTRAS: Copied expression payload safely to clipboard!
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
};
